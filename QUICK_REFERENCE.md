# Quick Reference Card - Redux Employee Management

## 🚀 Quick Start

### Using Redux to Add an Employee

```typescript
// 1. Import what you need
import { useDispatch, useSelector } from 'react-redux';
import { inviteEmployee, fetchEmployeeInvites } from '../store/slices/EmployerSlice';
import { RootState, AppDispatch } from '../store/store';

// 2. Inside your component
const dispatch = useDispatch<AppDispatch>();
const { isActionLoading, error, invites } = useSelector(
  (state: RootState) => state.employer
);

// 3. Dispatch the action
const result = await dispatch(inviteEmployee({
  email: 'john@example.com',
  phone: '1234567890',
  department: 'Engineering'
}));

// 4. Handle the result
if (inviteEmployee.fulfilled.match(result)) {
  // Success!
  dispatch(fetchEmployeeInvites()); // Refresh list
} else if (inviteEmployee.rejected.match(result)) {
  // Error: result.payload contains error message
  console.log(result.payload);
}
```

---

## 📋 Redux Thunk Cheat Sheet

### Available Async Thunks (EmployerSlice)

```typescript
// Create employee invitation
dispatch(inviteEmployee({
  email: string,
  phone?: string,
  department: string
}))

// Fetch all invites
dispatch(fetchEmployeeInvites())

// Fetch all employees
dispatch(fetchEmployees())

// Fetch current employer
dispatch(fetchCurrentEmployer())

// Fetch mood trends
dispatch(fetchMoodTrends())

// Fetch department distribution
dispatch(fetchDepartmentDistribution())

// Fetch wellness trend
dispatch(fetchWellnessTrend())

// Fetch dashboard summary
dispatch(fetchEmployerDashboardSummary())

// Fetch engagement data
dispatch(fetchEmployerEngagement())

// Fetch reports
dispatch(fetchEmployerReports())

// Fetch billing details
dispatch(fetchBillingDetails())
```

---

## 📊 Redux State Shape

```typescript
state.employer = {
  // Main data
  currentEmployer: EmployerUser | null,
  invites: EmployeeInvite[],
  employees: Employee[],
  billing: BillingDetails | null,
  engagement: EmployerEngagementData | null,
  reports: Report[],
  summary: DashboardSummary | null,
  departmentDistribution: [],
  wellnessTrend: [],
  moodTrends: MoodTrend[],

  // Loading & Error states
  isLoading: boolean,         // For GET requests
  isActionLoading: boolean,   // For POST/DELETE
  error: string | null        // Error message
}
```

---

## 🔄 Action Result Checking

```typescript
// Method 1: Using .match() (Recommended)
const result = await dispatch(inviteEmployee(data));

if (inviteEmployee.fulfilled.match(result)) {
  const payload: EmployeeInvite = result.payload;
  // Handle success
}

if (inviteEmployee.rejected.match(result)) {
  const errorMsg: string = result.payload;
  // Handle error
}

// Method 2: Check payload existence
if (result.payload && !result.error) {
  // Success
}
```

---

## 📌 Common Patterns

### Pattern 1: Show Loading State
```typescript
const { isActionLoading } = useSelector((state: RootState) => state.employer);

<button disabled={isActionLoading}>
  {isActionLoading ? 'Loading...' : 'Submit'}
</button>
```

### Pattern 2: Display Error
```typescript
const { error } = useSelector((state: RootState) => state.employer);

useEffect(() => {
  if (error) {
    toast({ title: "Error", description: error });
  }
}, [error, toast]);
```

### Pattern 3: List from Redux
```typescript
const { invites } = useSelector((state: RootState) => state.employer);

return (
  <ul>
    {invites.map(invite => (
      <li key={invite.id}>{invite.email}</li>
    ))}
  </ul>
);
```

### Pattern 4: Dispatch Multiple Actions
```typescript
const dispatch = useDispatch<AppDispatch>();

useEffect(() => {
  dispatch(fetchEmployeeInvites());
  dispatch(fetchEmployees());
  dispatch(fetchDepartmentDistribution());
}, [dispatch]);
```

### Pattern 5: Reset on Success
```typescript
if (inviteEmployee.fulfilled.match(result)) {
  reset(); // React Hook Form
  setShowModal(false);
  dispatch(clearEmployerError());
}
```

---

## 🎯 Type Safety Essentials

```typescript
// ✅ Always use AppDispatch for thunks
const dispatch = useDispatch<AppDispatch>();

// ✅ Always use RootState for selectors
const state = useSelector((state: RootState) => state.employer);

// ✅ Always check action results
if (inviteEmployee.fulfilled.match(result)) { }

// ❌ Don't use plain useDispatch
const dispatch = useDispatch(); // No typing!

// ❌ Don't assume action succeeded
await dispatch(inviteEmployee(data)); // Might have failed!
```

---

## 🔍 Debugging Tips

### View State in Console
```typescript
const state = useSelector((state: RootState) => state.employer);
console.log('Current state:', state);
```

### Log Action Dispatch
```typescript
const result = await dispatch(inviteEmployee(data));
console.log('Action result:', result);
console.log('Is fulfilled:', inviteEmployee.fulfilled.match(result));
console.log('Is rejected:', inviteEmployee.rejected.match(result));
```

### Watch Redux DevTools
1. Open browser DevTools → Redux tab
2. Filter by "employer" actions
3. See state changes in real-time
4. Time-travel debug to any action

### Common Issues

| Issue | Solution |
|-------|----------|
| Button stays disabled | Check `isActionLoading` not `isLoading` |
| Data doesn't update | Dispatch action after mutation |
| Error doesn't show | Use `result.payload` not `error` |
| Type errors | Use `AppDispatch` and `RootState` types |
| Invites don't update | Call `fetchEmployeeInvites()` after add |

---

## 📱 Integration Checklist

- [x] Import `useDispatch`, `useSelector`
- [x] Import `AppDispatch`, `RootState` types
- [x] Import Redux actions from `EmployerSlice`
- [x] Create typed dispatch: `useDispatch<AppDispatch>()`
- [x] Select state with typed selector: `useSelector((state: RootState) => ...)`
- [x] Dispatch async thunk: `await dispatch(action(...))`
- [x] Check result with `.match()`
- [x] Handle fulfilled case
- [x] Handle rejected case
- [x] Show loading state during request
- [x] Show error state if failed
- [x] Refresh data after mutations

---

## 🚨 Error Messages & Solutions

### Error: Cannot find module 'react-redux'
```
Solution: npm install react-redux
```

### Error: Cannot find name 'AppDispatch'
```
Solution: Add to top of file:
import { AppDispatch, RootState } from '../store/store';
```

### Error: State has wrong type
```
Solution: Check RootState definition in store.ts
```

### Error: inviteEmployee is not a function
```
Solution: Check import is from EmployerSlice, not elsewhere
```

### Error: result.payload is undefined after success
```
Solution: Check the thunk returns data, not response object
return response.data; // NOT return response;
```

---

## 🎓 Learning Resources

### Inside Your Code:
1. `src/store/slices/EmployerSlice.ts` - All thunk definitions
2. `src/api/apiConfig.ts` - API endpoints
3. `src/components/employercomponents/companyemployees/AddEmployeeForm.tsx` - Example usage
4. `src/store/store.ts` - Store configuration

### Key Files to Understand:
- **EmployerSlice.ts**: Where actions and reducers live
- **apiConfig.ts**: Where API calls are made
- **store.ts**: Where Redux is configured
- **AddEmployeeForm.tsx**: Real example implementation

---

## 🔗 Action → API → State Flow

```
dispatch(inviteEmployee({...}))
    ↓
inviteEmployee.pending
    state.isActionLoading = true
    ↓
employerAPI.inviteEmployee(data)
    ↓
    POST /v1/employers/invite/
    ↓
inviteEmployee.fulfilled
    state.isActionLoading = false
    state.invites.unshift(response.data)
    ↓
Component re-renders
    selector returns new state
    button enabled, toast shows success
```

---

## 💡 Pro Tips

1. **Always await dispatch** for async thunks
   ```typescript
   const result = await dispatch(inviteEmployee(...));
   ```

2. **Use .match() for type safety** instead of checking status
   ```typescript
   if (inviteEmployee.fulfilled.match(result)) { }  // ✅
   if (result.meta.requestStatus === 'fulfilled') { } // ❌
   ```

3. **Refresh data after mutations**
   ```typescript
   await dispatch(inviteEmployee(...));
   dispatch(fetchEmployeeInvites()); // Sync with backend
   ```

4. **Use different loading states**
   ```typescript
   isLoading:       // For fetching data (GET)
   isActionLoading: // For modifying data (POST/PUT/DELETE)
   ```

5. **Store complex data in Redux**
   ```typescript
   // Good for Redux
   - User authentication
   - Employee lists
   - Filter preferences
   - Billing data
   
   // OK for local state
   - Form input values
   - Modal open/close
   - Tab selection
   - Animation state
   ```

---

## 📞 Quick Links

**Check these files to understand:**
- Thunk definition: `EmployerSlice.ts` line 88-101
- Reducer handling: `EmployerSlice.ts` line 436-447
- API call: `apiConfig.ts` line 252-254
- Component usage: `AddEmployeeForm.tsx` line 24-69
- State shape: `types/employer.ts` (EmployerState interface)

