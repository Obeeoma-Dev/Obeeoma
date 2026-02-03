import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EmployeeState {
// eslint-disable-next-line @typescript-eslint/no-explicit-any
currentEmployee: any | null;
isLoading: boolean;
error: string | null;
}

const initialState: EmployeeState = {
currentEmployee: null,
isLoading: false,
error: null,
};

const employeeSlice = createSlice({
name: "employee",
initialState,
reducers: {
// eslint-disable-next-line @typescript-eslint/no-explicit-any
setEmployee: (state: EmployeeState, action: PayloadAction<any>) => {
state.currentEmployee = action.payload;
},
clearEmployee: (state: EmployeeState) => {
state.currentEmployee = null;
},
setEmployeeLoading: (
state: EmployeeState,
action: PayloadAction<boolean>,
) => {
state.isLoading = action.payload;
},
setEmployeeError: (
state: EmployeeState,
action: PayloadAction<string | null>,
) => {
state.error = action.payload;
},
},
});

export const {
setEmployee,
clearEmployee,
setEmployeeLoading,
setEmployeeError,
} = employeeSlice.actions;
export default employeeSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";

// const employeeSlice = createSlice({
// name: "employee",
// initialState: "",
// reducers: {
// employeeReducer: (state, action) => {
// state = action.payload;
// return state;
// }
// },
// });

// export default employeeSlice.reducer;