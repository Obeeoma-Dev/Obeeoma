import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks';
import { fetchSubscribers } from '../../../store/slices/adminpaystackSlice';
import type { RootState } from '../../../store/store';

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

const SubscriberList: React.FC = () => {
  const dispatch = useAppDispatch();
  const subscriptionState = useAppSelector((state: RootState) => state.subscriptionSlice);
  const { items, loading, error } = subscriptionState;

  useEffect(() => {
    dispatch(fetchSubscribers());
  }, [dispatch]);

  if (loading) return <p>Fetching payment data...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div className="admin-table">
      <h2>Active Subscribers</h2>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Next Date</th>
          </tr>
        </thead>
        <tbody>
          {items.map((sub: Subscriber) => (
            <tr key={sub.id}>
              <td>{sub.customer.email}</td>
              <td>{(sub.amount / 100).toLocaleString()}</td>
              <td>
                <span className={`badge ${sub.status}`}>{sub.status}</span>
              </td>
              <td>{new Date(sub.next_payment_date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};