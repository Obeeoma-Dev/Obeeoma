// src/hooks/useLogout.ts

import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../store/store'; // Adjust path as needed
import { logoutUserThunk } from '../store/slices/authSlice'; // Adjust path as needed

// A custom hook to encapsulate all logout logic
export const useLogout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // Function to open the modal
  const openModal = useCallback(() => setIsModalOpen(true), []);

  // Function to close the modal
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  // The core logout logic (confirms the action)
  const confirmLogout = useCallback(async () => {
    // 1. Close the modal immediately for a better UX
    closeModal();
    
    // 2. Execute the Redux thunk
    const resultAction = await dispatch(logoutUserThunk());
    // Debug info to verify network + storage state after logout
    console.log("Logout dispatched:", {
      resultType: resultAction.type,
      tokenAfter: localStorage.getItem('token'),
      userAfter: localStorage.getItem('user')
    });
    
    // 3. Navigate after success or failure (as you had before)
    if (logoutUserThunk.fulfilled.match(resultAction) || logoutUserThunk.rejected.match(resultAction)) {
      navigate("/login");
    }
  }, [dispatch, navigate, closeModal]); // Dependencies for useCallback

  return {
    isModalOpen,
    openModal,
    closeModal,
    confirmLogout,
    // You can add more user-specific data here if needed (e.g., from Redux state)
    // userName: useSelector(state => state.auth.user.name), 
    // userLocation: useSelector(state => state.auth.user.location), 
  };
};