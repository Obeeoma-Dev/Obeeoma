/**
 * Floating WhatsApp button using React-Bootstrap
 * Fixed position at bottom right of the screen with pulse animation
 */

import React from "react";
import { Button } from "react-bootstrap"; // Importing React-Bootstrap Button
import { MessageCircleIcon } from "lucide-react"; // WhatsApp-like icon

// Define the functional component
export function WhatsAppButton() {
    return (
        // Anchor tag to open WhatsApp chat
        <a
            href="https://wa.me/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contact us on WhatsApp"
            style={{
                position: "fixed", // Fixes position to screen corner
                bottom: "2rem", // 32px from bottom
                right: "2rem", // 32px from right
                zIndex: 1050, // Keeps button on top of other elements
                textDecoration: "none", // Removes underline from anchor
            }}
        >
            {/* React-Bootstrap Button for consistent styling */}
            <Button
                variant="success" // Bootstrap green button
                className="rounded-circle border-0 shadow-lg position-relative" // Rounded, elevated button
                style={{
                    width: "64px", // Similar to w-16 in Tailwind
                    height: "64px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    animation: "pulse 2s infinite", // Custom animation defined below
                    backgroundColor: "#10B981", // Emerald green to match original
                }}
            >
                {/* WhatsApp icon from lucide-react */}
                <MessageCircleIcon size={32} color="white" />

                {/* Ripple effect (Bootstrap doesn’t have built-in, so mimic with a span) */}
                <span
                    className="position-absolute top-0 start-0 w-100 h-100 rounded-circle"
                    style={{
                        backgroundColor: "rgba(16, 185, 129, 0.6)", // semi-transparent green
                        animation: "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite",
                        opacity: 0.75,
                    }}
                />
            </Button>

            {/* Keyframe animations using standard CSS-in-JS syntax */}
            <style>
                {`
          /* Pulse animation to make the button gently expand and contract */
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
          }

          /* Ping animation to mimic ripple expansion */
          @keyframes ping {
            0% { transform: scale(1); opacity: 0.75; }
            75%, 100% { transform: scale(2); opacity: 0; }
          }
        `}
            </style>
        </a>
    );
}
