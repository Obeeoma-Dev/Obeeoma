
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import DepartmentMetrics from "../components/employercomponents/reports/DepartmentMetrics";

// Mock Recharts components
jest.mock("recharts", () => ({
  BarChart: ({ children }: any) => <div data-testid="bar-chart">{children}</div>,
  Bar: () => <div data-testid="bar" />,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
  CartesianGrid: () => <div data-testid="cartesian-grid" />,
  ResponsiveContainer: ({ children }: any) => <div data-testid="responsive-container">{children}</div>,
  Tooltip: () => <div data-testid="tooltip" />,
  Legend: () => <div data-testid="legend" />,
}));

describe("DepartmentMetrics Component", () => {
  test("renders the Department Metrics section", () => {
    render(<DepartmentMetrics />);
    expect(screen.getByText("Department Metrics")).toBeInTheDocument();
  });

  test("renders the chart container", () => {
    render(<DepartmentMetrics />);
    expect(screen.getByTestId("responsive-container")).toBeInTheDocument();
    expect(screen.getByTestId("bar-chart")).toBeInTheDocument();
  });

  test("renders chart elements", () => {
    render(<DepartmentMetrics />);
    expect(screen.getByTestId("x-axis")).toBeInTheDocument();
    expect(screen.getByTestId("y-axis")).toBeInTheDocument();
    expect(screen.getByTestId("cartesian-grid")).toBeInTheDocument();
    expect(screen.getByTestId("tooltip")).toBeInTheDocument();
    expect(screen.getByTestId("legend")).toBeInTheDocument();
  });

  test("renders bars for each metric", () => {
    render(<DepartmentMetrics />);
    const bars = screen.getAllByTestId("bar");
    expect(bars).toHaveLength(3); // wellness, participation, risk
  });
});