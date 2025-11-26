import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store'; // Import RootState from your store file
import { EmployeeInvite } from '../../types/employer'; // Import necessary types


export interface EmployeeTableState {
  invites: EmployeeInvite[];
  isLoading: boolean;
  isActionLoading: boolean;
  error: string | null;
}

// Input Selector: Gets the employer slice from the state
const selectEmployerSlice = (state: RootState) => state.employer;

// Memoized Selector: Only re-runs if state.employer (the slice) changes
export const selectEmployeeTableState = createSelector(
  [selectEmployerSlice],
  
  (employerState): EmployeeTableState => ({
    // This object is only recreated if employerState changes
    invites: employerState.invites as EmployeeInvite[], 
    isLoading: employerState.isLoading,
    isActionLoading: employerState.isActionLoading,
    error: employerState.error,
  })
);