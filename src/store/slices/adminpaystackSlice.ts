import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the shape of the data for TypeScript
interface Subscriber {
  id: number;
  subscription_code: string;
  status: string;
  amount: number;
  next_payment_date: string;
  customer: {
    email: string;
    first_name: string;
  };
}

interface SubscriptionState {
  items: Subscriber[];
  loading: boolean;
  error: string | null;
}

const initialState: SubscriptionState = {
  items: [],
  loading: false,
  error: null,
};

// The Async Thunk
export const fetchSubscribers = createAsyncThunk(
  'subscriptions/fetch',
  async (_, { rejectWithValue }) => {
    try {
      // Note: For production, this should go through your backend API
      // to avoid exposing secret keys on the client side
      const paystackSecret = import.meta.env.VITE_PAYSTACK_SECRET;
      if (!paystackSecret) {
        return rejectWithValue('Paystack secret key not configured');
      }
      
      const response = await axios.get('https://api.paystack.co/subscription', {
        headers: {
          Authorization: `Bearer ${paystackSecret}`,
          'Content-Type': 'application/json',
        },
      });
      // Paystack returns { status: true, message: "...", data: [...] }
      return response.data.data; 
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Check your API Key or Network');
    }
  }
);

const subscriptionSlice = createSlice({
  name: 'subscriptions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubscribers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubscribers.fulfilled, (state, action: PayloadAction<Subscriber[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchSubscribers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default subscriptionSlice.reducer;