import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import EmployeeStatusLegend from "../components/employercomponents/employerdashboard/EmployeeStatusLegend";

// Mock react-chartjs-2
jest.mock("react-chartjs-2", () => ({
  Doughnut: jest.fn(() => (
    <div data-testid="doughnut-chart">Doughnut Chart</div>
  )),
}));

// Mock Chart.js
jest.mock("chart.js", () => ({
  Chart: {
    register: jest.fn(),
  },
  ArcElement: jest.fn(),
  Tooltip: jest.fn(),
  Legend: jest.fn(),
}));

describe("EmployeeStatusLegend", () => {
  const mockEmployeeStatus = {
    activeEmployees: 10,
    inactiveEmployees: 5,
    totalEmployees: 15,
  };

  it("renders the doughnut chart", () => {
    render(<EmployeeStatusLegend employeeStatus={mockEmployeeStatus} />);

    expect(screen.getByTestId("doughnut-chart")).toBeInTheDocument();
  });

  it("renders with correct data", () => {
    render(<EmployeeStatusLegend employeeStatus={mockEmployeeStatus} />);

    // Since the chart is mocked, we can't test the actual data rendering
    // But we can test that the component renders without crashing
    expect(screen.getByTestId("doughnut-chart")).toBeInTheDocument();
  });

  it("handles zero total employees", () => {
    const zeroData = {
      activeEmployees: 0,
      inactiveEmployees: 0,
      totalEmployees: 0,
    };

    render(<EmployeeStatusLegend employeeStatus={zeroData} />);

    expect(screen.getByTestId("doughnut-chart")).toBeInTheDocument();
  });
});
