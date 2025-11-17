# Complete Redux Employee Management Flow - Visual Guide

## 1. Component Hierarchy & Data Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                    EmployerDashboard.tsx                            │
│                                                                     │
│  useDashboardData() hook                                          │
│   ├─ dispatch(fetchEmployees())                                   │
│   ├─ dispatch(fetchEmployeeInvites())                             │
│   └─ Returns: { stats, employeeData, ... }                        │
└─────────────────┬───────────────────────────────────────────────────┘
                  │
        ┌─────────┴──────────┐
        │                    │
        ▼                    ▼
    ┌─────────────────┐  ┌──────────────────────────┐
    │  EmployeeTable  │  │  StatsGrid, DashmentLegend
    │                 │  │  WellnessGraph, etc      │
    │ Shows: invites  │  │                          │
    │ from Redux      │  │  Show: stats from Redux  │
    └─────────────────┘  └──────────────────────────┘
        │
        │ Triggers modal
        │
        ▼
    ┌────────────────────────────┐
    │   AddEmployeeForm.tsx       │
    │                            │
    │ User enters:               │
    │  - Email                   │
    │  - Phone                   │
    │  - Department              │
    │                            │
    │ onClick: dispatch(         │
    │   inviteEmployee({...})    │
    │ )                          │
    └────────────┬───────────────┘
                 │
                 ▼
         [Redux Action Dispatched]
```

---

## 2. Redux State Management Flow

### State Structure
```typescript
state.employer = {
  // Data from API
  currentEmployer: EmployerUser | null,
  invites: EmployeeInvite[],           // ← New invites added here
  employees: Employee[],
  invites: [],
  
  // Loading states
  isLoading: false,        // For GET requests
  isActionLoading: false,  // ← For POST/DELETE (inviteEmployee uses this)
  error: null,
}
```

### Action Dispatch Sequence
```
1. User clicks "Add Employee"
   ↓
2. Form validates with Zod schema
   ↓
3. dispatch(inviteEmployee({email, phone, department}))
   ↓
4. inviteEmployee.pending is triggered
   state.isActionLoading = true
   state.error = null
   ↓
5. API call: POST /v1/employers/invite/
   ↓
6. Backend returns: { id, email, status, ... }
   ↓
7. inviteEmployee.fulfilled is triggered
   state.isActionLoading = false
   state.invites.unshift(action.payload)  ← Add to top of list
   ↓
8. Component re-renders with new state
   ↓
9. dispatch(fetchEmployeeInvites()) ← Refresh full list
   ↓
10. Component shows success toast & closes modal
```

---

## 3. Code Flow - Step by Step

### Step 1: Form Submit Handler (AddEmployeeForm.tsx)
```typescript
// User enters: john.doe@company.com, 1234567890, Engineering
// Clicks "Add Employee" button

const onSubmit = async (data: EmployeeFormData) => {
  // data = { email, phone, department }
  
  // Pass to Redux
  const result = await dispatch(inviteEmployee({
    email: data.email,           // "john.doe@company.com"
    phone: data.phone,           // "1234567890"
    department: data.department  // "Engineering"
  }));
```

### Step 2: Redux Thunk (EmployerSlice.ts)
```typescript
export const inviteEmployee = createAsyncThunk<
  EmployeeInvite,
  { email: string; phone?: string; department: string },
  { rejectValue: string }
>(
  'employer/inviteEmployee',
  async (employeeData, { rejectWithValue }) => {
    try {
      // employeeData = { email, phone, department }
      
      // Make API call through employerAPI
      const response = await employerAPI.inviteEmployee(employeeData);
      
      // Return the response data
      return response.data as EmployeeInvite;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);
```

### Step 3: API Call (apiConfig.ts)
```typescript
inviteEmployee: async (employeeData) => {
  // employeeData = { email, phone, department }
  
  // Make POST request to backend
  const response = await api.post(
    "/v1/employers/invite/",
    employeeData  // This is sent as request body
  );
  
  // Backend response:
  // {
  //   id: 123,
  //   email: "john.doe@company.com",
  //   status: "pending",
  //   invitedAt: "2025-11-17T10:30:00Z",
  //   ...
  // }
  
  return response;
}
```

### Step 4: Reducer Updates State (EmployerSlice.ts)
```typescript
// PENDING STATE (while API is loading)
.addCase(inviteEmployee.pending, (state) => {
  state.isActionLoading = true;  // Show spinner
  state.error = null;            // Clear previous errors
})

// FULFILLED STATE (API returned successfully)
.addCase(inviteEmployee.fulfilled, (state, action: PayloadAction<EmployeeInvite>) => {
  state.isActionLoading = false;           // Hide spinner
  
  // action.payload = { id: 123, email, status, ... }
  state.invites.unshift(action.payload);   // Add to beginning of array
  
  // Result:
  // state.invites = [
  //   { id: 123, email: "john.doe@company.com", status: "pending", ... },
  //   { id: 122, email: "jane@company.com", status: "accepted", ... },
  //   ...
  // ]
})

// REJECTED STATE (API returned error)
.addCase(inviteEmployee.rejected, (state, action) => {
  state.isActionLoading = false;          // Hide spinner
  state.error = action.payload;           // "Email already exists" or similar
})
```

### Step 5: Component Responds (AddEmployeeForm.tsx)
```typescript
// Check if action was successful
if (inviteEmployee.fulfilled.match(result)) {
  // Show success message
  toast({
    title: "Success",
    description: "Employee invitation sent!",
    message: "Employee invitation sent successfully!",
  });
  
  // Reset form
  reset();
  
  // Call parent callback
  onEmployeeAdded();
  
  // Close modal
  onClose();
  
  // Refresh the full list from backend
  dispatch(fetchEmployeeInvites());
}

// Check if action failed
else if (inviteEmployee.rejected.match(result)) {
  // result.payload = error message
  toast({
    title: "Error",
    description: result.payload,  // "Email already exists"
    message: "Failed to add employee.",
  });
  
  // Form stays open, user can retry
}
```

---

## 4. Real-World Example

### User Action
```
┌─────────────────────────────────────────┐
│  User Action in AddEmployeeForm         │
├─────────────────────────────────────────┤
│ Email input: john.doe@acme.com          │
│ Phone input: +1-555-0123                │
│ Department: Engineering                 │
│ Click: "Add Employee" button            │
└──────────────────┬──────────────────────┘
                   │
                   ▼
┌──────────────────────────────────────────┐
│  Form Validation (Zod)                   │
├──────────────────────────────────────────┤
│ ✓ Email is valid                         │
│ ✓ Phone has 10+ digits                   │
│ ✓ Department is selected                 │
│ → handleSubmit(onSubmit) executes        │
└──────────────────┬───────────────────────┘
                   │
                   ▼
┌──────────────────────────────────────────┐
│  Redux Dispatch                          │
├──────────────────────────────────────────┤
│ Action: inviteEmployee({                 │
│   email: "john.doe@acme.com",            │
│   phone: "+1-555-0123",                  │
│   department: "Engineering"              │
│ })                                       │
└──────────────────┬───────────────────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
        ▼                     ▼
┌──────────────────┐  ┌──────────────────┐
│ Pending State    │  │ API Call         │
├──────────────────┤  ├──────────────────┤
│ Button disabled  │  │ POST              │
│ "Adding..."      │  │ /v1/employers/   │
│ Spinner shown    │  │   invite/        │
│                  │  │                  │
│ isActionLoading: │  │ Body: {email,   │
│ true             │  │ phone, dept}     │
└──────────────────┘  └────────┬─────────┘
                                │
                    ┌───────────┴───────────┐
                    │ Backend Processing   │
                    ├─────────────────────┤
                    │ 1. Validate email   │
                    │ 2. Check if exists  │
                    │ 3. Create record    │
                    │ 4. Send email invite│
                    │ 5. Return response  │
                    └───────────┬─────────┘
                                │
        ┌───────────────────────┴───────────────────┐
        │                                           │
        ▼                                           ▼
┌─────────────────────────┐    ┌──────────────────────────┐
│ Success Response        │    │ Error Response           │
├─────────────────────────┤    ├──────────────────────────┤
│ Status: 201 Created     │    │ Status: 400 Bad Request  │
│ Body: {                 │    │ Body: {                  │
│   id: 456,              │    │   error: "Email already  │
│   email: "john...",     │    │   exists"                │
│   status: "pending",    │    │ }                        │
│   invitedAt: "..."      │    └──────────────┬───────────┘
│ }                       │                  │
└────────────┬────────────┘                  │
             │                              │
             ▼                              ▼
    ┌──────────────────┐        ┌───────────────────────┐
    │ Fulfilled State  │        │ Rejected State        │
    ├──────────────────┤        ├───────────────────────┤
    │ isActionLoading: │        │ isActionLoading: false│
    │ false            │        │ error: "Email already │
    │ invites: [       │        │ exists"               │
    │   {...new...},   │        │ invites: [] (unchanged)
    │   {...old...}    │        └───────────┬───────────┘
    │ ]                │                    │
    └────────┬─────────┘                    │
             │                              │
             ▼                              ▼
    ┌──────────────────┐        ┌───────────────────────┐
    │ Component Update │        │ Component Update      │
    ├──────────────────┤        ├───────────────────────┤
    │ Re-render        │        │ Re-render            │
    │ Button enabled   │        │ Button enabled       │
    │ Toast: Success   │        │ Toast: Error         │
    │ Close modal      │        │ Modal stays open      │
    │ Reset form       │        │ Error message shown   │
    └──────────────────┘        └───────────────────────┘
```

---

## 5. Data Flow Diagram

```
┌─────────────────────────────────────┐
│       Component State               │
│    (Form inputs & UI state)         │
│                                     │
│  email: "john@acme.com"             │
│  phone: "+1-555-0123"               │
│  department: "Engineering"          │
│  showModal: true                    │
└────────────────┬────────────────────┘
                 │
                 │ user clicks submit
                 │
                 ▼
┌─────────────────────────────────────┐
│     React Hook Form validates       │
│                                     │
│  ✓ Valid email format               │
│  ✓ Phone 10-15 chars                │
│  ✓ Department selected              │
└────────────────┬────────────────────┘
                 │
                 │ triggers onSubmit
                 │
                 ▼
┌─────────────────────────────────────┐
│     Redux Store (Before)            │
│                                     │
│  employer: {                        │
│    isActionLoading: false,          │
│    error: null,                     │
│    invites: [existing...]           │
│  }                                  │
└────────────────┬────────────────────┘
                 │
                 │ dispatch(inviteEmployee(...))
                 │
                 ▼
┌─────────────────────────────────────┐
│     Redux Store (Pending)           │
│                                     │
│  employer: {                        │
│    isActionLoading: true,  ◄─ Button disabled
│    error: null,                     │
│    invites: [existing...]           │
│  }                                  │
└────────────────┬────────────────────┘
                 │
                 │ API Call to backend
                 │
                 ▼
┌─────────────────────────────────────┐
│     Backend API                     │
│                                     │
│  POST /v1/employers/invite/         │
│  {                                  │
│    email: "john@acme.com",          │
│    phone: "+1-555-0123",            │
│    department: "Engineering"        │
│  }                                  │
└────────────────┬────────────────────┘
                 │
                 │ response received
                 │
                 ▼
┌─────────────────────────────────────┐
│     Redux Store (Fulfilled)         │
│                                     │
│  employer: {                        │
│    isActionLoading: false,          │
│    error: null,                     │
│    invites: [                       │
│      {id:456, email:..., ...},◄─ NEW
│      {id:455, ...},                 │
│      ...                            │
│    ]                                │
│  }                                  │
└────────────────┬────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────┐
│     Component Re-render             │
│                                     │
│  - useSelector hook runs            │
│  - Gets new state values            │
│  - Button re-enables                │
│  - Toast shows "Success"            │
│  - Modal closes                     │
│  - List refreshes                   │
└─────────────────────────────────────┘
```

---

## 6. Error Handling Flow

```
┌──────────────────────────┐
│  User submits form       │
│  (with invalid data)     │
└────────────┬─────────────┘
             │
             ▼
    ┌────────────────┐
    │ Client-side    │  (Zod validation)
    │ validation     │
    │ fails          │
    └────────┬───────┘
             │
         NO DISPATCH
             │
             ▼
    ┌────────────────┐
    │ Error message  │
    │ shown below    │
    │ form field     │
    └────────────────┘

OR (if passes client validation)

┌──────────────────────────┐
│  dispatch(inviteEmployee)│
└────────────┬─────────────┘
             │
             ▼
    ┌────────────────┐
    │ API call made  │
    │ PENDING state  │
    │ Button disabled│
    └────────────┬───────┘
                 │
                 ▼
    ┌────────────────────────┐
    │ Backend error response │
    │ Status: 400, 409, etc  │
    │ Body: { error: "..." } │
    └────────────┬───────────┘
                 │
                 ▼
    ┌────────────────────────┐
    │ inviteEmployee.rejected│
    │ triggered              │
    │                        │
    │ state.error = response │
    │ isActionLoading = false│
    └────────────┬───────────┘
                 │
                 ▼
    ┌────────────────────────┐
    │ Component receives new │
    │ state via useSelector  │
    │                        │
    │ Toast shows error      │
    │ Message: result.payload│
    │ Button re-enabled      │
    │ Modal stays open       │
    └────────────────────────┘
```

---

## 7. Complete Sequence Diagram

```
User              Form              Redux              API              Backend
 │                │                 │                  │                 │
 ├─ fills form ──>│                 │                  │                 │
 │                │                 │                  │                 │
 ├─ clicks Add ──>│                 │                  │                 │
 │                │                 │                  │                 │
 │                ├─ validates ────>│                  │                 │
 │                │                 │                  │                 │
 │                ├─ dispatch ─────>│                  │                 │
 │                │                 │                  │                 │
 │                │                 ├─ pending ──────>│ (set loading)   │
 │                │                 │                  │                 │
 │  (sees spinner)│<──── loading ────│                 │                 │
 │                │   (button off)   │                 │                 │
 │                │                 │                  │                 │
 │                │                 ├─ API call ─────────────────────>│
 │                │                 │                  │      POST       │
 │                │                 │                  │    /invite/     │
 │                │                 │                  │                 │
 │                │                 │                  │ (create record) │
 │                │                 │                  │<───────────────│
 │                │                 │                  │   response      │
 │                │                 │<────── response ─│                 │
 │                │                 │                  │                 │
 │                │                 ├─ fulfilled ─────>│                 │
 │                │                 │ (add to list)    │                 │
 │                │                 │                  │                 │
 │  (spinner gone)│<─── success ─────│                 │                 │
 │  (sees toast)  │   (button on)    │                 │                 │
 │                │                 │                 │                 │
 │                ├─ refresh ──────>│                 │                 │
 │                │  (new list)      │                 │                 │
 │                │                 ├─ fetch all ────────────────────>│
 │                │                 │                  │    GET         │
 │                │                 │                  │  /invites/     │
 │                │                 │                  │<───────────────│
 │                │                 │<──── all data ───│                 │
 │                │                 │                  │                 │
 │ (sees update)  │<───── data ──────│                 │                 │
 │ (modal closes) │                 │                 │                 │
 │                │                 │                 │                 │
```

---

## 8. Component Communication Map

```
Redux Store (Single Source of Truth)
│
├─ employer.isActionLoading      (boolean)
├─ employer.error                (string | null)
├─ employer.invites              (EmployeeInvite[])
├─ employer.employees            (Employee[])
├─ employer.isLoading            (boolean)
└─ [other employer state]

    ↑                    ↑                    ↑
    │                    │                    │
    │ dispatch           │ dispatch           │ useSelector
    │ actions            │ actions            │ (read state)
    │                    │                    │
┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│ AddEmployeeForm  │ │ EmployeeTable    │ │ StatsGrid        │
│                  │ │                  │ │                  │
│ dispatch(invite  │ │ Shows invites    │ │ Shows employee   │
│ Employee)        │ │ from store       │ │ count from store │
│                  │ │                  │ │                  │
│ dispatch(fetch   │ │ Can delete/resend│ │ Shows stats from │
│ EmployeeInvites) │ │ invites          │ │ store            │
│                  │ │                  │ │                  │
│ useSelector for  │ │ useSelector for  │ │ useSelector for  │
│ loading state    │ │ invite data      │ │ stats data       │
└──────────────────┘ └──────────────────┘ └──────────────────┘
```

This architecture ensures:
- ✅ Single source of truth (Redux store)
- ✅ No prop drilling
- ✅ Components can communicate via shared state
- ✅ Easy to debug and test
- ✅ Scalable for larger apps

