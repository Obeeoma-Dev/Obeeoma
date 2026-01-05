import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import WellnessTrends from "../components/employercomponents/reports/WellnessTrends";

// Helper to handle the "content" prop which can be a function OR a React element
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderTooltipContent = (content: any) => {
  if (typeof content === "function") {
    return content({
      active: true,
      payload: [{ payload: { date: "Mon", score: 85, emoji: "😄" } }],
      label: "Mon",
    });
  }
  if (React.isValidElement(content)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return React.cloneElement(content as React.ReactElement<any>, {
      active: true,
      payload: [{ payload: { date: "Mon", score: 85, emoji: "😄" } }],
      label: "Mon",
    });
  }
  return null;
};

// Mock Recharts components - using standard HTML tags to avoid SVG errors in JSDOM
jest.mock("recharts", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  LineChart: ({ children }: any) => (
    <div data-testid="line-chart">{children}</div>
  ),
  Line: () => <div data-testid="line" />,
  XAxis: () => <div data-testid="x-axis" />,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  YAxis: ({ tick }: any) => (
    <div data-testid="y-axis">
      {/* Simulate the Y-axis tick call with a value of 50 */}
      {tick && tick({ x: 0, y: 0, payload: { value: 50 } })}
    </div>
  ),
  CartesianGrid: () => <div data-testid="cartesian-grid" />,
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  ResponsiveContainer: ({ children }: any) => (
    <div data-testid="responsive-container">{children}</div>
  ),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Tooltip: ({ content }: any) => (
    <div data-testid="tooltip">{renderTooltipContent(content)}</div>
  ),
}));

describe("WellnessTrends Component", () => {
  test("renders the chart container", () => {
    render(<WellnessTrends />);
    expect(screen.getByTestId("responsive-container")).toBeInTheDocument();
    expect(screen.getByTestId("line-chart")).toBeInTheDocument();
  });

  test("renders chart elements", () => {
    render(<WellnessTrends />);
    expect(screen.getByTestId("x-axis")).toBeInTheDocument();
    expect(screen.getByTestId("y-axis")).toBeInTheDocument();
    expect(screen.getByTestId("cartesian-grid")).toBeInTheDocument();
    expect(screen.getByTestId("tooltip")).toBeInTheDocument();
  });

  test("renders the line for mood data", () => {
    render(<WellnessTrends />);
    expect(screen.getByTestId("line")).toBeInTheDocument();
  });

  test("renders custom tooltip content", () => {
    render(<WellnessTrends />);
    // Verification of custom tooltip output
    expect(screen.getByText(/Date: Mon/i)).toBeInTheDocument();
    expect(screen.getByText(/Score: 85/i)).toBeInTheDocument();
    expect(screen.getByText("😄")).toBeInTheDocument();
    expect(screen.getByText(/Mood: Excellent/i)).toBeInTheDocument();
  });

  test("renders emoji tick on Y-axis", () => {
    render(<WellnessTrends />);
    // The Y-axis tick should render a Neutral emoji for score 50
    expect(screen.getByText("😐")).toBeInTheDocument();
  });
});
