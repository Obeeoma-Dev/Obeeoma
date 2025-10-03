// Import React so JSX works
import React from "react";

// Import testing utilities from React Testing Library
import { render, screen } from "@testing-library/react";

// MemoryRouter is needed because Hero uses useNavigate (React Router hook)
import { MemoryRouter } from "react-router-dom";

// Import the Hero component we want to test
import Hero from "./Hero";

/**
 * Utility function that renders the Hero component
 * wrapped in a MemoryRouter, so navigation works in tests.
 */
const renderHero = () =>
    render(
        <MemoryRouter>
            <Hero />
        </MemoryRouter>
    );

describe("Hero Component", () => {
    // Test 1: check if component renders without crashing
    it("renders heading text correctly", () => {
        renderHero();

        // Look for heading text that contains "Start Your journey"
        expect(screen.getByText(/Start Your journey/i)).toBeInTheDocument();
    });

    // Test 2: check that both buttons render with correct text
    it("renders Sign Up and Sign In buttons", () => {
        renderHero();

        // Verify Sign Up button is there
        expect(
            screen.getByText("Sign up for my organization")
        ).toBeInTheDocument();

        // Verify Sign In button is there
        expect(screen.getByText("Sign In")).toBeInTheDocument();
    });

    // Test 3: check that all badges render
    it("renders all badges correctly", () => {
        renderHero();

        // List of expected badge texts
        const badges = [
            "Mental Health Assessments",
            "Skills Learning",
            "Feedback",
            "EAP",
        ];

        // Loop through and check each badge exists in the DOM
        badges.forEach((badgeText) => {
            expect(screen.getByText(badgeText)).toBeInTheDocument();
        });
    });

    // Test 4: check that hero section is rendered with background image
    it("renders the hero section with a background image", () => {
        renderHero();

        // Grab the inner div that has the backgroundImage
        const heroBgDiv = screen.getByTestId("hero-background");

        // Check that the backgroundImage style contains the mocked string
        expect(heroBgDiv.style.backgroundImage).toContain("test-file-stub");
    });


});

/* Removed custom expect function to allow Jest/RTL expect to work */

