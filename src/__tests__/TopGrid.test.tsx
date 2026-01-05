import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TopGrid from "../components/employercomponents/employerdashboard/TopGrid";

// Mock lucide-react icons
jest.mock("lucide-react", () => ({
  Users: jest.fn(() => <div data-testid="users-icon">Users</div>),
  UserRoundPlus: jest.fn(() => (
    <div data-testid="userroundplus-icon">UserRoundPlus</div>
  )),
  ClipboardCheck: jest.fn(() => (
    <div data-testid="clipboardcheck-icon">ClipboardCheck</div>
  )),
  HelpCircle: jest.fn(() => (
    <div data-testid="helpcircle-icon">HelpCircle</div>
  )),
}));

describe("TopGrid", () => {
  const mockStats = [
    {
      title: "Total Employees",
      value: 150,
      icon: "Users" as const,
      color: "green",
    },
    {
      title: "Add Employee",
      value: "",
      icon: "UserRoundPlus" as const,
      color: "green",
      onClick: jest.fn(),
    },
    {
      title: "General Company Mood",
      value: "",
      icon: "ClipboardCheck" as const,
      color: "green",
      moodValue: "Good",
    },
  ];

  it("renders all stat cards", () => {
    render(<TopGrid stats={mockStats} />);

    expect(screen.getByText("Total Employees")).toBeInTheDocument();
    expect(screen.getByText("150")).toBeInTheDocument();
    expect(screen.getByText("Add Employee")).toBeInTheDocument();
    expect(screen.getByText("General Company Mood")).toBeInTheDocument();
  });

  it("renders icons", () => {
    render(<TopGrid stats={mockStats} />);

    expect(screen.getByTestId("users-icon")).toBeInTheDocument();
    expect(screen.getByTestId("userroundplus-icon")).toBeInTheDocument();
    expect(screen.getByTestId("clipboardcheck-icon")).toBeInTheDocument();
  });

  it("handles click events", () => {
    render(<TopGrid stats={mockStats} />);

    const addEmployeeCard = screen.getByText("Add Employee").closest(".card");
    fireEvent.click(addEmployeeCard!);

    expect(mockStats[1].onClick).toHaveBeenCalled();
  });

  it("renders mood card with emoji", () => {
    render(<TopGrid stats={mockStats} />);

    // The mood card should have an emoji
    expect(screen.getByText("🙂")).toBeInTheDocument();
  });
});
