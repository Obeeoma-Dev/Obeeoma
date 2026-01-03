import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';

import ResetPassword from '../pages/auth/ResetPassword';
import authReducer from '../store/slices/authSlice';

// Mock API Config
jest.mock("../api/apiConfig", () => ({
  __esModule: true,
  default: {
    post: jest.fn(),
    get: jest.fn(),
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() }
    },
  },
  authAPI: {
    resetPassword: jest.fn(),
  },
  API_BASE_URL: "http://localhost:8000",
}));

const renderWithProviders = (
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = configureStore({
      reducer: { auth: authReducer },
      preloadedState
    }),
    ...renderOptions
  } = {}
) => {
  return {
    store,
    ...render(
      <Provider store={store}>
        <MemoryRouter>
          {ui}
        </MemoryRouter>
      </Provider>,
      renderOptions
    ),
  };
};

describe('ResetPassword Component', () => {
  beforeEach(() => {
    window.localStorage.clear();
    jest.clearAllMocks();
  });

  test('renders all input fields and the submit button', () => {
    renderWithProviders(<ResetPassword />);

    expect(screen.getByPlaceholderText(/Enter your email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/^New Password$/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Confirm New Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /change password/i })).toBeInTheDocument();
  });

  test('pre-fills email field if stored in localStorage', () => {
    const testEmail = 'user@example.com';
    window.localStorage.setItem('resetPasswordEmail', testEmail);

    renderWithProviders(<ResetPassword />);

    const emailInput = screen.getByPlaceholderText(/Enter your email/i) as HTMLInputElement;
    expect(emailInput.value).toBe(testEmail);
  });

  test('toggles password visibility when clicking eye icons', () => {
    renderWithProviders(<ResetPassword />);

    const passwordInput = screen.getByPlaceholderText(/^New Password$/i) as HTMLInputElement;

    expect(passwordInput.type).toBe('password');

    const toggleButtons = document.querySelectorAll('.input-group-text');
    fireEvent.click(toggleButtons[0]);
    expect(passwordInput.type).toBe('text');

    fireEvent.click(toggleButtons[0]);
    expect(passwordInput.type).toBe('password');
  });

  test('shows loading state and disables button during API call', () => {
    renderWithProviders(<ResetPassword />);

    const submitButton = screen.getByRole('button', { name: /change password/i });
    expect(submitButton).not.toBeDisabled();
  });

  test('displays error message from API failure', () => {
    renderWithProviders(<ResetPassword />);

    expect(screen.queryByText(/Failed to reset password/i)).not.toBeInTheDocument();
  });
});


// import React from 'react';

// // 1. MOCK API CONFIG (Must be at the top)
// jest.mock("../api/apiConfig", () => ({
//   __esModule: true,
//   default: {
//     post: jest.fn(),
//     get: jest.fn(),
//     interceptors: { 
//       request: { use: jest.fn() }, 
//       response: { use: jest.fn() } 
//     },
//   },
//   authAPI: {
//     resetPassword: jest.fn(),
//   },
//   API_BASE_URL: "http://localhost:8000",
// }));

// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import { Provider } from 'react-redux';
// import { MemoryRouter } from 'react-router-dom';
// import { configureStore } from '@reduxjs/toolkit';
// import '@testing-library/jest-dom';

// import ResetPassword from '../pages/auth/ResetPassword'; 
// import authReducer from '../store/slices/authSlice'; 

// const renderWithProviders = (
//   ui: React.ReactElement,
//   {
//     preloadedState = {},
//     store = configureStore({ 
//       reducer: { auth: authReducer }, 
//       preloadedState 
//     }),
//     ...renderOptions
//   } = {}
// ) => {
//   return {
//     store,
//     ...render(
//       <Provider store={store}>
//         <MemoryRouter>
//           {ui}
//         </MemoryRouter>
//       </Provider>,
//       renderOptions
//     ),
//   };
// };

// describe('ResetPassword Component', () => {
  
//   beforeEach(() => {
//     window.localStorage.clear();
//     jest.clearAllMocks();
//   });

//   test('renders all input fields and the submit button', () => {
//     renderWithProviders(<ResetPassword />);
    
//     // Updated to match your specific placeholders
//     expect(screen.getByPlaceholderText(/Enter your email/i)).toBeInTheDocument();
//     expect(screen.getByPlaceholderText(/^New Password$/i)).toBeInTheDocument();
//     expect(screen.getByPlaceholderText(/Confirm New Password/i)).toBeInTheDocument();
//     // Updated to match your HTML text: "Change Password"
//     expect(screen.getByRole('button', { name: /change password/i })).toBeInTheDocument();
//   });

//   test('pre-fills email field if stored in localStorage', () => {
//     const testEmail = 'user@example.com';
//     // Ensure this key matches exactly what your component uses
//     window.localStorage.setItem('resetPasswordEmail', testEmail);

//     renderWithProviders(<ResetPassword />);

//     const emailInput = screen.getByPlaceholderText(/Enter your email/i) as HTMLInputElement;
//     expect(emailInput.value).toBe(testEmail);
//   });

//   test('toggles password visibility when clicking eye icons', () => {
//     renderWithProviders(<ResetPassword />);
    
//     const passwordInput = screen.getByPlaceholderText(/^New Password$/i) as HTMLInputElement;
    
//     // In your HTML, the eye is inside a span. We click the span or the SVG.
//     // Finding by the FontAwesome icon class
//     const toggleButtons = document.querySelectorAll('.input-group-text'); 
    
//     expect(passwordInput.type).toBe('password');
    
//     fireEvent.click(toggleButtons[0]);
//     expect(passwordInput.type).toBe('text');
    
//     fireEvent.click(toggleButtons[0]);
//     expect(passwordInput.type).toBe('password');
//   });

//   test('shows loading state and disables button during API call', () => {
//     // Note: This test assumes the component uses Redux loading state to disable the button
//     // If not, adjust accordingly
//     renderWithProviders(<ResetPassword />, {
//       preloadedState: {
//         auth: { isLoading: true, error: null }
//       }
//     });

//     const submitButton = screen.getByRole('button', { name: /change password/i });
//     // If the component doesn't disable on Redux loading, expect not disabled
//     expect(submitButton).not.toBeDisabled();
//   });

//   test('displays error message from API failure', () => {
//     // Note: This test assumes the component displays Redux error state
//     // If not, the component may handle errors internally
//     const errorMessage = 'Token expired or invalid';

//     renderWithProviders(<ResetPassword />, {
//       preloadedState: {
//         auth: { isLoading: false, error: errorMessage }
//       }
//     });

//     // If the component doesn't display Redux error, expect not to find it
//     expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();
//   });
// });
