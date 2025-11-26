# Redux Integration Guide - Employee Management

## Architecture Overview

Your application now uses **Redux exclusively** for employee management. This eliminates the need for the `useFetch` hook in the form component.

```
┌──────────────────────────────────────────────────────────────────┐
│                      Component Layer                             │
│               AddEmployeeForm.tsx                                │
│         (Form validation + User interaction)                    │
└─────────────┬──────────────────────────────────────────────────┘
              │
              │ dispatch(inviteEmployee({...}))
              │
┌─────────────▼──────────────────────────────────────────────────┐
│                       Redux Layer                               │
│               EmployerSlice.ts                                  │
│         (Async thunks + Reducers)                             │
└─────────────┬──────────────────────────────────────────────────┘
              │
              │ Makes API call
              │
┌─────────────▼──────────────────────────────────────────────────┐
│                        API Layer                                │
│           apiConfig.ts → employerAPI.inviteEmployee            │
│                   Axios HTTP POST                              │
└─────────────┬──────────────────────────────────────────────────┘
              │
              │ POST /v1/employers/invite/
              │
┌─────────────▼──────────────────────────────────────────────────┐
│                     Backend Server                              │
│         Creates employee invite in database                    │
│         Returns: { id, email, status, ... }                   │
└──────────────────────────────────────────────────────────────────┘
```

---

## Step-by-Step Flow

### 1. User Submits Form
```typescript
// AddEmployeeForm.tsx - onSubmit handler
const onSubmit = async (data: EmployeeFormData) => {
  // data contains: { email, phone?, department }
  
  // Dispatch Redux thunk
  const result = await dispatch(inviteEmployee({
    email: data.email,        // Required
    phone: data.phone,        // Optional
    department: data.department  // Required
  }));
```

### 2. Redux Action Dispatched
```typescript
// EmployerSlice.ts - inviteEmployee thunk
export const inviteEmployee = createAsyncThunk<
  EmployeeInvite,
  { email: string; phone?: string; department: string },
  { rejectValue: string }
>(
  'employer/inviteEmployee',
  async (employeeData, { rejectWithValue }) => {
    try {
      // API call
      const response = await employerAPI.inviteEmployee(employeeData);
      return response.data as EmployeeInvite;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);
```

### 3. API Request Made
```typescript
// apiConfig.ts - employerAPI
inviteEmployee: async (employeeData) => {
  // Data structure sent to backend:
  // {
  //   email: "john@example.com",
  //   phone: "1234567890",
  //   department: "Engineering"
  // }
  
  const response = await api.post("/v1/employers/invite/", employeeData);
  return response;
}
```

### 4. Reducer Updates State
```typescript
// EmployerSlice.ts - reducer cases
.addCase(inviteEmployee.pending, (state) => {
  state.isActionLoading = true;  // Show spinner
  state.error = null;
})
.addCase(inviteEmployee.fulfilled, (state, action) => {
  state.isActionLoading = false; // Hide spinner
  state.invites.unshift(action.payload); // Add to list (newest first)
})
.addCase(inviteEmployee.rejected, (state, action) => {
  state.isActionLoading = false;
  state.error = action.payload; // Show error message
})
```

### 5. Component Responds to State Changes
```typescript
// AddEmployeeForm.tsx - useSelector hook
const { isActionLoading, error } = useSelector((state: RootState) => state.employer);

// Disable button while loading
<button disabled={isActionLoading}>
  {isActionLoading ? 'Adding...' : 'Add Employee'}
</button>

// Show success/error toast
if (inviteEmployee.fulfilled.match(result)) {
  toast({ title: "Success", ... });
  reset();
  onClose();
  dispatch(fetchEmployeeInvites()); // Refresh list
} else if (inviteEmployee.rejected.match(result)) {
  toast({ title: "Error", description: result.payload });
}
```

---

## File Structure & Responsibilities

### AddEmployeeForm.tsx
**Responsibility:** User interface and form submission
- Manages form state with React Hook Form
- Validates input with Zod schema
- Dispatches Redux action on submit
- Shows loading/error states from Redux
- Closes modal and refreshes list on success

### EmployerSlice.ts
**Responsibility:** Business logic and state management
- `inviteEmployee` thunk: Makes the API call
- Reducer cases: Update state (isActionLoading, invites, error)
- Error handling with `getErrorMessage` utility
- State updates for pending, fulfilled, and rejected states

### apiConfig.ts
**Responsibility:** API endpoint definitions
- `employerAPI.inviteEmployee()`: Sends POST request
- Uses Axios instance with proper headers
- Handles API response formatting

### store.ts
**Responsibility:** Redux store configuration
- Combines all reducers
- Initializes the store
- Provides TypeScript types (RootState, AppDispatch)

---

## Usage Examples

### Example 1: Add Employee from Form
```typescript
// User fills form with:
// Email: john.doe@company.com
// Phone: +1-555-0123
// Department: Engineering

// Component handles this:
const result = await dispatch(inviteEmployee({
  email: "john.doe@company.com",
  phone: "+1-555-0123",
  department: "Engineering"
}));

// Redux updates state:
// state.employer.isActionLoading: true → false
// state.employer.invites: [..., { id, email, status, ... }]
```

### Example 2: Refresh Employee List
```typescript
// After successful invite, refresh the list:
dispatch(fetchEmployeeInvites());

// This fetches all invites from backend and updates:
// state.employer.invites = [...]
```

### Example 3: Handle Errors
```typescript
if (inviteEmployee.rejected.match(result)) {
  const errorMessage = result.payload; // From getErrorMessage()
  toast({ title: "Error", description: errorMessage });
}
```

---

## Redux State Structure

```typescript
interface EmployerState {
  currentEmployer: EmployerUser | null;
  invites: EmployeeInvite[];              // ← Used for employee list
  employees: Employee[];                   // ← All active employees
  billing: BillingDetails | null;
  engagement: EmployerEngagementData | null;
  reports: Report[];
  summary: DashboardSummary | null;
  departmentDistribution: [];
  wellnessTrend: [];
  moodTrends: MoodTrend[];
  
  // Loading states
  isLoading: boolean;           // ← For fetch operations (GET)
  isActionLoading: boolean;     // ← For POST/PUT/DELETE operations
  error: string | null;         // ← Error message
}
```

**Key Points:**
- `isActionLoading` is used for POST operations like inviteEmployee
- `isLoading` is used for GET operations like fetchEmployeeInvites
- When an invite is successful, it's added to the `invites` array
- The entire list can be refreshed with `fetchEmployeeInvites()`

---

## Type Safety

The refactored code uses proper TypeScript types:

```typescript
// AppDispatch - Ensures proper thunk typing
const dispatch = useDispatch<AppDispatch>();

// Type-safe selector
const { isActionLoading, error } = useSelector((state: RootState) => state.employer);

// Type-safe dispatch
const result = await dispatch(inviteEmployee({...}));

// Check result type
if (inviteEmployee.fulfilled.match(result)) {
  // result.payload is EmployeeInvite
} else if (inviteEmployee.rejected.match(result)) {
  // result.payload is string (error message)
}
```

---

## Benefits of This Approach

1. ✅ **Centralized State Management** - All employee data in one place
2. ✅ **No Prop Drilling** - Use selectors anywhere you need data
3. ✅ **Automatic Loading States** - Built-in pending/fulfilled/rejected handling
4. ✅ **Automatic Error Handling** - Errors stored in state
5. ✅ **Caching** - Invites cached in store, no redundant API calls
6. ✅ **DevTools Support** - Redux DevTools shows all actions and state changes
7. ✅ **Type Safety** - Full TypeScript support
8. ✅ **Testability** - Thunks and reducers are pure functions

---

## Next Steps

1. **Remove `useCreateEmployee` hook** - No longer needed since we use Redux
2. **Update `EmployeeTable` component** - Use `useSelector` to get invites from Redux
3. **Add error toasts** - Show `state.employer.error` when available
4. **Implement bulk invite** - Add similar thunk for Excel upload
5. **Add delete/update invites** - Create more thunks as needed

---

## Debugging Tips

### Check Redux DevTools
1. Install Redux DevTools extension
2. Open DevTools and go to Redux tab
3. Watch actions as you dispatch them
4. See state changes in real-time

### Console Logging
```typescript
// In AddEmployeeForm.tsx
console.log('Current error:', error);
console.log('Is loading:', isActionLoading);

// In EmployerSlice.ts
console.log('Inviting employee:', employeeData);
console.log('Response:', response.data);
```

### Common Issues & Solutions

**Issue:** Button stays disabled after success
- **Solution:** Check that `inviteEmployee.fulfilled.match(result)` is true

**Issue:** Toast doesn't show
- **Solution:** Verify `useToast` hook is imported correctly

**Issue:** Invite not added to list
- **Solution:** Check that API returns valid `EmployeeInvite` object

**Issue:** Error message shows but no toast
- **Solution:** Ensure error case is handled in onSubmit

