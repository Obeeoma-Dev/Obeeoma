import { createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import { employerAPI } from '../../api/apiConfig';
import {PaymentUpdatePayload, InvoiceItem} from '../../types/employer'


//  The Async Thunk
export const updatePaymentMethod = createAsyncThunk(
    'billing/updatePaymentMethod',
    async (payload: PaymentUpdatePayload, { rejectWithValue }) => {
        try {
            const response = await employerAPI.updatePaymentMethod(payload); 
            return response.data; // Return the success message/data
        } catch (error) {
            // Handle errors from your DRF endpoint
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const axiosError = error as any;
            return rejectWithValue(axiosError.response?.data || 'Failed to update payment method.');
        }
    }
);

//  Async Thunk for Fetching History
export const fetchBillingHistory = createAsyncThunk(
    'billing/fetchBillingHistory',
    async (_, { rejectWithValue }) => {
        try {
            const response = await employerAPI.viewBillingHistory();
             
            return response.data; // Array of InvoiceItem
        } catch (error) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const axiosError = error as any;
            return rejectWithValue(axiosError.response?.data?.detail || 'Failed to fetch billing history.');
        }
    }
);

//  Simple Slice to track state
interface BillingState {
    invoices: InvoiceItem[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: BillingState = {
    invoices: [],
    status: 'idle',
    error: null,
};

const billingSlice = createSlice({
    name: 'billing',
    initialState,
    reducers: {
        clearBillingError: (state: BillingState) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(updatePaymentMethod.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(updatePaymentMethod.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(updatePaymentMethod.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string || 'Unknown error.';
            })

            // Cases for fetching history
            .addCase(fetchBillingHistory.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBillingHistory.fulfilled, (state, action: PayloadAction<InvoiceItem[]>) => {
                state.status = 'succeeded';
                state.invoices = action.payload; // Store the fetched invoices
            })
            .addCase(fetchBillingHistory.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string || 'Unknown error fetching history.';
            });
    },
});
export const {clearBillingError} = billingSlice.actions;
export default billingSlice.reducer