// Import React so we can use JSX and functional components
import React from "react";
// Import Card component from React-Bootstrap to build the card structure
import { Card } from "react-bootstrap";
// Import the LucideIcon type so TypeScript knows what kind of icon we’ll receive as a prop
import { LucideIcon } from "lucide-react";

// Define TypeScript interface for the props this component will receive
interface ContactCardProps {
    icon: LucideIcon; // The icon component to display (e.g., Phone, Mail, etc.)
    title: string; // The title text (e.g., "Email Us")
    content: string; // The main content (e.g., the email address)
    link?: string; // Optional link (e.g., mailto: or https://)
}

// Define and export the ContactCard component
export function ContactCard({
    icon: Icon, // Rename `icon` to `Icon` so we can use it as a React component later
    title,
    content,
    link,
}: ContactCardProps) {
    // Build the card’s main content (used in both link and non-link versions)
    const CardContent = (
        <>
            {/* Circle icon area with a gradient background */}
            <div
                className="d-flex align-items-center justify-content-center mb-4 rounded-circle"
                style={{
                    width: "64px", // Circle width
                    height: "64px", // Circle height
                    background: "linear-gradient(to bottom right, #9DD3AF, #00A859)", // Gradient color
                    transition: "transform 0.3s ease", // Smooth scaling animation
                    fontFamily: "body"
                }}
                // Adding a hover scale for the icon.
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
                {/* Display the icon passed as a prop */}
                <Icon size={32} color="white" />
            </div>

            {/* Title text */}
            <h3 className="fs-5 fw-semibold text-success mb-2">{title}</h3>

            {/* Description or contact text */}
            <p className="text-secondary mb-0">{content}</p>
        </>
    );

    // If there is a link prop, render the entire card as a clickable link
    if (link) {
        return (
            <a
                href={link} // Navigate to the given link
                className="text-decoration-none text-reset" // Remove link underline & keep default text color
                target="_blank" // Open in new tab (optional, safe for external links)
                rel="noopener noreferrer" // Security best practice
            >
                <Card
                    className="text-center border-0 hover-shadow-lg transition-all"
                    style={{
                        borderRadius: "20px", // Rounded edges
                        padding: "20px", // Inner spacing
                        transition: "all 0.3s ease", // Smooth hover animation
                        fontFamily: "body"
                    }}

                    // Adding a lift effect on card hover:
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-8px)";
                        e.currentTarget.style.boxShadow = "0 5rem 6rem rgba(0,0,0,0.3)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "0 3rem 3.5rem rgba(0,0,0,0.075)";
                    }}
                >
                    <Card.Body>{CardContent}</Card.Body>
                </Card>
            </a>
        );
    }

    // Otherwise, render a normal static card without a link
    return (
        <Card
            className="text-center border-0 hover-shadow-lg transition-all"
            style={{
                borderRadius: "20px", // Rounded edges
                padding: "20px", // Inner spacing
                transition: "all 0.3s ease", // Smooth hover animation
                fontFamily: "body"
            }}

            // Adding a lift effect on card hover:
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 5rem 6rem rgba(0,0,0,0.3)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 3rem 3.5rem rgba(0,0,0,0.075)";
            }}
        >
            <Card.Body>{CardContent}</Card.Body>
        </Card>
    );
}
