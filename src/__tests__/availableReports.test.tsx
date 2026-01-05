import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import "@testing-library/jest-dom";

// 1. MOCK THE API CONFIG FIRST
// This prevents the "import.meta" SyntaxError from ever occurring
jest.mock("../api/apiConfig", () => ({
  employerAPI: {
    get: jest.fn(),
    post: jest.fn(),
  },
}));

// 2. NOW import the components and slices
import AvailableReports from "../components/employercomponents/reports/AvailableReports";
import employerReducer from "../store/slices/EmployerSlice";

// Mock the hooks
jest.mock("../hooks/redux-hooks", () => ({
  useAppDispatch: jest.fn(),
}));

const mockDispatch = jest.fn();
const { useAppDispatch } = require("../hooks/redux-hooks");

const renderWithProviders = () => {
  const store = configureStore({
    reducer: { employer: employerReducer },
  });

  // Type cast to allow mockReturnValue
  (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);

  return render(
    <Provider store={store}>
      <AvailableReports />
    </Provider>,
  );
};

describe("AvailableReports Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Return a dummy promise to prevent errors if the component awaits the dispatch
    mockDispatch.mockReturnValue({ unwrap: () => Promise.resolve() });
  });

  test("renders the Available Reports section", () => {
    renderWithProviders();
    expect(screen.getByText("Available Reports")).toBeInTheDocument();
  });

  test("renders all report types", () => {
    renderWithProviders();
    expect(screen.getByText("Wellness Summary")).toBeInTheDocument();
    expect(screen.getByText("Department Analysis")).toBeInTheDocument();
    expect(screen.getByText("Risk Assessment")).toBeInTheDocument();
    expect(screen.getByText("Engagement Report")).toBeInTheDocument();
  });

  test("displays report descriptions and frequencies", () => {
    renderWithProviders();
    expect(
      screen.getByText("Overall employee wellness metrics"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Detailed department-wise breakdown"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Identified risk factors and trends"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Employee engagement and participation"),
    ).toBeInTheDocument();

    expect(screen.getAllByText("Monthly").length).toBe(2);
    expect(screen.getByText("Quarterly")).toBeInTheDocument();
    expect(screen.getByText("Weekly")).toBeInTheDocument();
  });

  test("renders Download buttons for each report", () => {
    renderWithProviders();
    const downloadButtons = screen.getAllByRole("button", {
      name: /Download/i,
    });
    expect(downloadButtons).toHaveLength(4);
  });

  test("calls dispatch when Download button is clicked", async () => {
    const user = userEvent.setup();
    renderWithProviders();

    const downloadButtons = screen.getAllByRole("button", {
      name: /Download/i,
    });
    const wellnessSummaryButton = downloadButtons[0];

    await user.click(wellnessSummaryButton);

    // Verify dispatch was called
    // In Redux Toolkit, the first arg is usually the thunk function itself
    expect(mockDispatch).toHaveBeenCalled();
    expect(typeof mockDispatch.mock.calls[0][0]).toBe("function");
  });
});
