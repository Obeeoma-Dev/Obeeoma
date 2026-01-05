import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import EngagementTrend from "../components/employercomponents/employerdashboard/EngagementTrend";

describe("EngagementTrend", () => {
  it("renders the engagement trend card", () => {
    render(<EngagementTrend />);

    expect(screen.getByText("Engagement Trend")).toBeInTheDocument();
    expect(screen.getByText("Total")).toBeInTheDocument();
    expect(screen.getByText("345")).toBeInTheDocument();
    expect(screen.getByText("289")).toBeInTheDocument();
    expect(screen.getByText("Active")).toBeInTheDocument();
    expect(screen.getByText("56")).toBeInTheDocument();
    expect(screen.getByText("Pending")).toBeInTheDocument();
  });

  it("renders the progress bar", () => {
    render(<EngagementTrend />);

    // Check if progress bar is present
    const progressBar = document.querySelector(".progress");
    expect(progressBar).toBeInTheDocument();
  });
});
