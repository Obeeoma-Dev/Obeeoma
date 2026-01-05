import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MoodTrend from "../components/employercomponents/employerdashboard/MoodTrend";

describe("MoodTrend", () => {
  it("renders the mood trend card", () => {
    render(<MoodTrend />);

    expect(screen.getByText("Mood Trend")).toBeInTheDocument();
    expect(
      screen.getByText("Automated from aggregated data"),
    ).toBeInTheDocument();
  });

  it("renders the legend", () => {
    render(<MoodTrend />);

    expect(screen.getByText("High")).toBeInTheDocument();
    expect(screen.getByText("Medium")).toBeInTheDocument();
    expect(screen.getByText("Low")).toBeInTheDocument();
  });

  it("renders week labels", () => {
    render(<MoodTrend />);

    // Check for some week numbers
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("renders y-axis labels", () => {
    render(<MoodTrend />);

    expect(screen.getByText("100%")).toBeInTheDocument();
    expect(screen.getByText("0%")).toBeInTheDocument();
  });

  it("renders chart bars", () => {
    render(<MoodTrend />);

    // Check that bars are rendered (they have background color)
    const bars = document.querySelectorAll('[style*="background-color"]');
    expect(bars.length).toBeGreaterThan(0);
  });
});
