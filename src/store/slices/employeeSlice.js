import { createSlice } from "@reduxjs/toolkit";
const employeeSlice = createSlice({
    name: "employee",
    initialState: "",
    reducers: {
        employeeReducer: (state, action) => {
            state = action.payload;
            return state;
        }
    },
});
export default employeeSlice.reducer;
