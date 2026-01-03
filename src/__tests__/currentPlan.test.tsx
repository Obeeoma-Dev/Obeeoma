import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CurrentPlan from "../components/employercomponents/subscription/CurrentPlan";

describe("CurrentPlan Component", () => {
  test("renders the Current Plan section", () => {
    render(<CurrentPlan />);
    expect(screen.getByText("Current Plan")).toBeInTheDocument();
  });

  test("displays the plan name and pricing", () => {
    render(<CurrentPlan />);
    expect(screen.getByText("Premium Plan")).toBeInTheDocument();
    expect(screen.getByText("$99 per month • Billed monthly")).toBeInTheDocument();
  });

  test("shows the next billing date", () => {
    render(<CurrentPlan />);
    expect(screen.getByText("Next billing date: Dec 15, 2023")).toBeInTheDocument();
  });

  test("renders the Change Plan and Update Payment Method buttons", () => {
    render(<CurrentPlan />);
    expect(screen.getByRole("button", { name: /Change Plan/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Update Payment Method/i })).toBeInTheDocument();
  });
});