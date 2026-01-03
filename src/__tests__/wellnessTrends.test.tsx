// import React from "react";
// import { render, screen } from "@testing-library/react";
// import "@testing-library/jest-dom";
// import WellnessTrends from "../components/employercomponents/reports/WellnessTrends";

// // Mock Recharts components
// jest.mock("recharts", () => ({
//   LineChart: ({ children }: any) => <div data-testid="line-chart">{children}</div>,
//   Line: () => <div data-testid="line" />,
//   XAxis: () => <div data-testid="x-axis" />,
//   YAxis: ({ tick }: any) => <div data-testid="y-axis">{tick && tick({ x: 0, y: 0, payload: { value: 50 } })}</div>,
//   CartesianGrid: () => <div data-testid="cartesian-grid" />,
//   ResponsiveContainer: ({ children }: any) => <div data-testid="responsive-container">{children}</div>,
//   Tooltip: ({ content }: any) => <div data-testid="tooltip">{content && content({ active: true, payload: [{ payload: { date: "Mon", score: 85, emoji: "😄" } }], label: "Mon" })}</div>,
// }));

// describe("WellnessTrends Component", () => {
//   test("renders the chart container", () => {
//     render(<WellnessTrends />);
//     expect(screen.getByTestId("responsive-container")).toBeInTheDocument();
//     expect(screen.getByTestId("line-chart")).toBeInTheDocument();
//   });

//   test("renders chart elements", () => {
//     render(<WellnessTrends />);
//     expect(screen.getByTestId("x-axis")).toBeInTheDocument();
//     expect(screen.getByTestId("y-axis")).toBeInTheDocument();
//     expect(screen.getByTestId("cartesian-grid")).toBeInTheDocument();
//     expect(screen.getByTestId("tooltip")).toBeInTheDocument();
//   });

//   test("renders the line for mood data", () => {
//     render(<WellnessTrends />);
//     expect(screen.getByTestId("line")).toBeInTheDocument();
//   });

//   test("renders custom tooltip content", () => {
//     render(<WellnessTrends />);
//     // The tooltip content should render the custom tooltip with date, score, emoji, and mood label
//     expect(screen.getByText("Date: Mon")).toBeInTheDocument();
//     expect(screen.getByText("Score: 85")).toBeInTheDocument();
//     expect(screen.getByText("😄")).toBeInTheDocument();
//     expect(screen.getByText("Mood: Excellent")).toBeInTheDocument();
//   });

//   test("renders emoji tick on Y-axis", () => {
//     render(<WellnessTrends />);
//     // The Y-axis tick should render an emoji for score 50 (Neutral)
//     expect(screen.getByText("😐")).toBeInTheDocument();
//   });
// });


import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import WellnessTrends from "../components/employercomponents/reports/WellnessTrends";

// Helper to handle the "content" prop which can be a function OR a React element
const renderTooltipContent = (content: any) => {
  if (typeof content === "function") {
    return content({
      active: true,
      payload: [{ payload: { date: "Mon", score: 85, emoji: "😄" } }],
      label: "Mon",
    });
  }
  if (React.isValidElement(content)) {
    // If it's an element (like <CustomTooltip />), clone it with props
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
  LineChart: ({ children }: any) => <div data-testid="line-chart">{children}</div>,
  Line: () => <div data-testid="line" />,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: ({ tick }: any) => (
    <div data-testid="y-axis">
      {/* Simulate the Y-axis tick call with a value of 50 */}
      {tick && tick({ x: 0, y: 0, payload: { value: 50 } })}
    </div>
  ),
  CartesianGrid: () => <div data-testid="cartesian-grid" />,
  ResponsiveContainer: ({ children }: any) => <div data-testid="responsive-container">{children}</div>,
  Tooltip: ({ content }: any) => (
    <div data-testid="tooltip">
      {renderTooltipContent(content)}
    </div>
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