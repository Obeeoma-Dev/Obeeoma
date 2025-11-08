import React from "react";
import { render, screen } from "@testing-library/react";
import AboutHeader from "./aboutheader";

// Test to ensure the header renders correctly
describe("AboutHeader", () => {
    it("renders the header section with correct text", () => {
        render(<AboutHeader />);

        // Check for heading
        expect(screen.getByText("Who We Are")).toBeInTheDocument();

        // Check for paragraph content
        expect(
            screen.getByText(/We are a dedicated team of mental health professionals/i)
        ).toBeInTheDocument();

        // Check for test ID
        expect(screen.getByTestId("about-header")).toBeInTheDocument();
    });
});