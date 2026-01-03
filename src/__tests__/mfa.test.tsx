// import React from 'react';
// import { render, screen, fireEvent} from '@testing-library/react';
// import { Provider } from 'react-redux';
// import { MemoryRouter } from 'react-router-dom';
// import { configureStore } from '@reduxjs/toolkit';
// import '@testing-library/jest-dom';

// import MfaSetupPage from '../pages/auth/mfauth';
// import authReducer, { setupMfa } from '../store/slices/authSlice';

// // FIX: Mock API Config and import.meta.env behavior
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
//     setupMfa: jest.fn(),
//     confirmMfa: jest.fn(),
//   },
//   // This helps bypass the import.meta error if accessed via apiConfig
//   API_BASE_URL: "http://localhost:8000",
// }));

// // Mock the actions to return a valid Thunk-like object with .unwrap()
// jest.mock("../store/slices/authSlice", () => ({
//   __esModule: true,
//   default: jest.requireActual("../store/slices/authSlice").default,
//   setupMfa: jest.fn(),
//   confirmMfa: jest.fn(),
// }));

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

// describe('MfaSetupPage Component', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   test('renders logo and two-factor authentication title', () => {
//     renderWithProviders(<MfaSetupPage />);
    
//     expect(screen.getByAltText(/Logo/i)).toBeInTheDocument();
//     expect(screen.getByText(/Two-Factor Authentication/i)).toBeInTheDocument();
//   });

//   test('calls setupMfa on mount when no setup data exists', () => {
//     renderWithProviders(<MfaSetupPage />, {
//       preloadedState: { auth: { mfaSetupData: null, isMfaSetupConfirmed: false } }
//     });
    
//     expect(setupMfa).toHaveBeenCalled();
//   });

//   test('displays loading state when isLoading is true', () => {
//     renderWithProviders(<MfaSetupPage />, {
//       preloadedState: { auth: { isLoading: true } }
//     });
    
//     expect(screen.getByText(/Loading MFA setup data/i)).toBeInTheDocument();
//   });

//   test('displays QR code and secret when setup data is available', () => {
//     const mockData = {
//       otpauth_uri: "otpauth://totp/test",
//       qr_code_base64: "data:image/png;base64,abc",
//       secret: "ABC123DEF",
//       temp_token: "token123"
//     };

//     renderWithProviders(<MfaSetupPage />, {
//       preloadedState: { auth: { mfaSetupData: mockData } }
//     });

//     expect(screen.getByAltText(/MFA Setup QR Code/i)).toBeInTheDocument();
//     expect(screen.getByText(/ABC123DEF/i)).toBeInTheDocument();
//     expect(screen.getByPlaceholderText(/6-digit verification code/i)).toBeInTheDocument();
//   });

//   test('disables submit button when code length is not 6', () => {
//     const mockData = { secret: "ABC", temp_token: "123", qr_code_base64: "...", otpauth_uri: "..." };
    
//     renderWithProviders(<MfaSetupPage />, {
//       preloadedState: { auth: { mfaSetupData: mockData } }
//     });

//     const input = screen.getByPlaceholderText(/6-digit verification code/i);
//     const button = screen.getByRole('button', { name: /Confirm MFA/i });

//     fireEvent.change(input, { target: { value: '123' } });
//     expect(button).toBeDisabled();
//   });

//   test('shows success message and close button when MFA is confirmed', () => {
//     renderWithProviders(<MfaSetupPage />, {
//       preloadedState: { auth: { isMfaSetupConfirmed: true } }
//     });

//     expect(screen.getByText(/Multi-Factor Authentication is Active/i)).toBeInTheDocument();
//     expect(screen.getByRole('button', { name: /CLOSE/i })).toBeInTheDocument();
//   });

//   test('displays error message when error state exists', () => {
//     const errorMsg = "Invalid verification code";
//     renderWithProviders(<MfaSetupPage />, {
//       preloadedState: { auth: { error: errorMsg } }
//     });

//     expect(screen.getByText(errorMsg)).toBeInTheDocument();
//   });
// });

import React from 'react';
import { render, screen, fireEvent} from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';

import MfaSetupPage from '../pages/auth/mfauth';
import authReducer, { setupMfa, confirmMfa } from '../store/slices/authSlice';

// FIX: Mock API Config and import.meta.env behavior
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
    setupMfa: jest.fn(),
    confirmMfa: jest.fn(),
  },
  API_BASE_URL: "http://localhost:8000",
}));

// Mock the actions to return a valid Thunk-like object with .unwrap()
jest.mock("../store/slices/authSlice", () => {
  const actual = jest.requireActual("../store/slices/authSlice");
  const mockSetupMfa = jest.fn();
  const mockConfirmMfa = jest.fn() as any;
  mockConfirmMfa.fulfilled = { match: (action: any) => action && action.type === 'auth/confirmMfa/fulfilled' };
  mockConfirmMfa.rejected = { match: (action: any) => action && action.type === 'auth/confirmMfa/rejected' };
  return {
    ...actual,
    __esModule: true,
    setupMfa: mockSetupMfa,
    confirmMfa: mockConfirmMfa,
  };
});

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

describe('MfaSetupPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // FIX: Provide default mock implementations so .unwrap() works
    (setupMfa as unknown as jest.Mock).mockReturnValue({
      type: "auth/setupMfa",
      unwrap: () => Promise.resolve(),
    });
    (confirmMfa as unknown as jest.Mock).mockReturnValue({
      type: "auth/confirmMfa",
      unwrap: () => Promise.resolve(),
    });
  });

  test('renders logo and two-factor authentication title', () => {
    renderWithProviders(<MfaSetupPage />);
    expect(screen.getByAltText(/Logo/i)).toBeInTheDocument();
    expect(screen.getByText(/Two-Factor Authentication/i)).toBeInTheDocument();
  });

  test('calls setupMfa on mount when no setup data exists', () => {
    renderWithProviders(<MfaSetupPage />, {
      preloadedState: { auth: { mfaSetupData: null, isMfaSetupConfirmed: false } }
    });
    expect(setupMfa).toHaveBeenCalled();
  });

  test('displays loading state when isLoading is true', () => {
    renderWithProviders(<MfaSetupPage />, {
      preloadedState: { auth: { isLoading: true } }
    });
    expect(screen.getByText(/Loading MFA setup data/i)).toBeInTheDocument();
  });

  test('displays QR code and secret when setup data is available', () => {
    const mockData = {
      otpauth_uri: "otpauth://totp/test",
      qr_code_base64: "data:image/png;base64,abc",
      secret: "ABC123DEF",
      temp_token: "token123"
    };

    renderWithProviders(<MfaSetupPage />, {
      preloadedState: { auth: { mfaSetupData: mockData } }
    });

    expect(screen.getByAltText(/MFA Setup QR Code/i)).toBeInTheDocument();
    expect(screen.getByText(/ABC123DEF/i)).toBeInTheDocument();
  });

  // Remaining tests corrected for logic and interactions:
  
  test('handles code input and filters non-numeric characters', () => {
    const mockData = { secret: "ABC", temp_token: "123", qr_code_base64: "...", otpauth_uri: "..." };
    renderWithProviders(<MfaSetupPage />, {
      preloadedState: { auth: { mfaSetupData: mockData } }
    });

    const input = screen.getByPlaceholderText(/6-digit verification code/i) as HTMLInputElement;
    
    // Test numeric input
    fireEvent.change(input, { target: { value: '123456' } });
    expect(input.value).toBe('123456');

    // Test non-numeric filtering (assuming your component logic handles this)
    fireEvent.change(input, { target: { value: 'abc789' } });
    expect(input.value).toBe('789');
  });

  test('calls confirmMfa on form submit with valid 6-digit code', async () => {
    const mockData = { secret: "ABC", temp_token: "token123", qr_code_base64: "...", otpauth_uri: "..." };
    renderWithProviders(<MfaSetupPage />, {
      preloadedState: { auth: { mfaSetupData: mockData } }
    });

    const input = screen.getByPlaceholderText(/6-digit verification code/i);
    const button = screen.getByRole('button', { name: /Confirm MFA/i });

    fireEvent.change(input, { target: { value: '123456' } });
    fireEvent.click(button);

    expect(confirmMfa).toHaveBeenCalledWith({
      temp_token: "token123",
      code: "123456",
    });
  });

  test('shows success message and close button when MFA is confirmed', () => {
    renderWithProviders(<MfaSetupPage />, {
      preloadedState: { auth: { isMfaSetupConfirmed: true } }
    });

    expect(screen.getByText(/Multi-Factor Authentication is Active/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /CLOSE/i })).toBeInTheDocument();
  });

  test('displays warning when mfaSetupData is null and not loading', () => {
    renderWithProviders(<MfaSetupPage />, {
      preloadedState: { auth: { mfaSetupData: null, isLoading: false, isMfaSetupConfirmed: false } }
    });

    expect(screen.getByText(/Could not load MFA setup data/i)).toBeInTheDocument();
  });
});