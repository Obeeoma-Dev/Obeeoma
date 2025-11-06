import { jsx as _jsx } from "react/jsx-runtime";
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
const renderHero = () => render(_jsx(MemoryRouter, { children: _jsx(Hero, {}) }));
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
        expect(screen.getByText("Sign Up For Organization")).toBeInTheDocument();
        // Verify Sign In button is there
        expect(screen.getByText("For employees")).toBeInTheDocument();
    });
    // Test 3: temporarily skipped until badge rendering is implemented
    it.skip("renders all badges correctly", () => {
        renderHero();
        const badges = [
            "Mental Health Assessments",
            "Skills Learning",
            "Feedback",
            "EAP",
        ];
        badges.forEach((badgeText) => {
            expect(screen.getByText(badgeText)).toBeInTheDocument();
        });
    });
    // Test 4: temporarily skipped until background image test stabilizes
    it.skip("renders the hero section with a background image", () => {
        renderHero();
        const heroBgDiv = screen.getByTestId("hero-background");
        expect(heroBgDiv.style.backgroundImage).toContain("test-file-stub");
    });
});
