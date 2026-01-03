import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import "@testing-library/jest-dom";
import BillingHistoryTable from "../components/employercomponents/subscription/BillingHistory";
import billingReducer from "../store/slices/billingSlice";

// Mock the API to avoid import.meta errors
jest.mock("../api/apiConfig", () => ({
  __esModule: true,
  employerAPI: {
    viewBillingHistory: jest.fn(),
  },
}));

const renderWithProviders = (initialState?: any) => {
  const store = configureStore({
    reducer: { billing: billingReducer },
    preloadedState: {
      billing: {
        invoices: [],
        status: "idle",
        error: null,
        ...initialState,
      },
    },
  });

  return render(
    <Provider store={store}>
      <BillingHistoryTable />
    </Provider>
  );
};

describe("BillingHistoryTable Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading spinner when status is loading", () => {
    const { container } = renderWithProviders({ status: "loading" });
    
    // Since role="status" is missing in your HTML, we find by class
    const spinner = container.querySelector(".spinner-border");
    expect(spinner).toBeInTheDocument();
  });

  test("renders error message when there is an error", () => {
    const errorMessage = "Failed to fetch billing history.";
    renderWithProviders({ status: "failed", error: errorMessage });
    expect(screen.getByText(new RegExp(errorMessage, "i"))).toBeInTheDocument();
  });

  test("renders no billing history message when invoices array is empty", () => {
    renderWithProviders({ status: "succeeded", invoices: [] });
    expect(screen.getByText(/No billing history found/i)).toBeInTheDocument();
  });

  test("renders billing history table with invoices", () => {
    const mockInvoices = [
      {
        invoice_number: "INV001",
        date: "2023-12-01",
        description: "Monthly Subscription",
        amount: 99.99,
        currency: "USD",
        status: "paid",
        invoice_url: "https://example.com/invoice.pdf",
      },
      {
        invoice_number: "INV002",
        date: "2023-11-01",
        description: "Monthly Subscription",
        amount: 99.99,
        currency: "USD",
        status: "pending",
        invoice_url: null,
      },
    ];

    renderWithProviders({ status: "succeeded", invoices: mockInvoices });

    expect(screen.getByText("Billing History")).toBeInTheDocument();
    
    // Check multiple descriptions using getAll
    const descriptions = screen.getAllByText("Monthly Subscription");
    expect(descriptions).toHaveLength(2);

    expect(screen.getByText("2023-12-01")).toBeInTheDocument();
    expect(screen.getByText("PAID")).toBeInTheDocument();
  });

  test("renders VIEW ALL INVOICES button", () => {
    // FIX: Provide mock data so the component doesn't show the "No history" alert
    const mockInvoices = [
      {
        invoice_number: "INV001",
        date: "2023-12-01",
        description: "Monthly Subscription",
        amount: 99.99,
        currency: "USD",
        status: "paid",
        invoice_url: "https://example.com/invoice.pdf",
      },
    ];

    renderWithProviders({ status: "succeeded", invoices: mockInvoices });
    
    const button = screen.getByRole("button", { name: /VIEW ALL INVOICES/i });
    expect(button).toBeInTheDocument();
  });
});