import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the shape of Paystack data based on your UI
export interface Subscription {
  id?: number; // Optional ID field for external data sources
  organization: string; // usually customer.email or customer.first_name
  plan: string;
  employees: number; // custom field or calculated
  activeUsers: number;
  activeUsersPercentage: number;
  status: "Active" | "Pending";
  expiryDate: string;
}

interface SubscriptionState {
  items: Subscription[];
  loading: boolean;
  error: string | null;
}

const initialState: SubscriptionState = {
  items: [],
  loading: false,
  error: null,
};

// Async Thunk to fetch data
export const fetchSubscriptions = createAsyncThunk(
  'subscriptions/fetchAll',
  async (_, thunkAPI) => {
    try {
      // Note: In production, replace this URL with your Backend API endpoint
      const response = await axios.get('https://api.paystack.co/subscription', {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_PAYSTACK_SECRET_KEY}`,
        },
      });

      // Transform Paystack API data to match your UI 'Subscription' interface
      return response.data.data.map((item: any) => ({
        organization: item.customer.email,
        plan: item.plan.name,
        employees: 0, // Paystack doesn't provide this; set default or map from metadata
        activeUsers: 0,
        activeUsersPercentage: 0,
        status: item.status === 'active' ? 'Active' : 'Pending',
        expiryDate: new Date(item.next_payment_date).toLocaleDateString(),
      }));
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const SubscriptionSlice = createSlice({
  name: 'subscriptions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubscriptions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSubscriptions.fulfilled, (state, action: PayloadAction<Subscription[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchSubscriptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default SubscriptionSlice.reducer;