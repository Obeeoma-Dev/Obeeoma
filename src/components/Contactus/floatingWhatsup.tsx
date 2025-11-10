// Import React to use JSX and functional components
import React from 'react';
// Import Button from React-Bootstrap for consistent Bootstrap styling
import { Button } from 'react-bootstrap';
// Import the MessageCircle icon from lucide-react (for the WhatsApp logo)
import { MessageCircle } from 'lucide-react';

// Define and export the FloatingWhatsApp component
export function FloatingWhatsApp() {
    return (
        <>
            {/* Inline <style> tag to define the glow animation using keyframes */}
            <style>
                {`
          @keyframes pulse {
            0% {
              transform: scale(1);
              box-shadow: 0 0 0 rgba(0, 0, 0, 0.2);
            }
            50% {
              transform: scale(1.1);
              box-shadow: 0 0 12px rgba(0, 0, 0, 0.3);
            }
            100% {
              transform: scale(1);
              box-shadow: 0 0 0 rgba(0, 0, 0, 0.2);
            }
          }
        `}
            </style>

            {/* Anchor tag (<a>) that wraps the button, linking to your WhatsApp chat */}
            <a
                href="https://wa.me/2347034387683" // WhatsApp direct link
                target="_blank" // Opens link in a new browser tab
                rel="noopener noreferrer" // Security best practice to prevent access to window.opener
                aria-label="Contact us on WhatsApp" // Accessibility label for screen readers
                style={{
                    position: 'fixed', // Keeps the button in the same spot on screen
                    bottom: '2rem', // 2rem from the bottom
                    right: '2rem', // 2rem from the right
                    zIndex: 1050, // Keeps it above other elements (Bootstrap modals use 1040)
                    textDecoration: 'none', // Removes underline from the anchor
                }}
            >
                {/* React Bootstrap button styled to look like your WhatsApp circle */}
                <Button
                    variant="success" // Bootstrap green color (we override it below)
                    className="d-flex align-items-center justify-content-center rounded-circle shadow-lg border-0"
                    style={{
                        width: '64px', // Button width
                        height: '64px', // Button height
                        backgroundColor: '#25D366', // WhatsApp brand green
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Smooth hover animations
                        animation: 'pulse 1.5s infinite', // Glow effect added here
                    }}
                    // Hover effect: slightly enlarge and add stronger shadow
                    onMouseEnter={(e): void => {
                        e.currentTarget.style.transform = 'scale(1.1)';
                        e.currentTarget.style.boxShadow = '0 0 20px rgba(0,0,0,0.3)';
                    }}
                    // Reset hover effect
                    onMouseLeave={(e): void => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = '0 0 10px rgba(0,0,0,0.2)';
                    }}
                >
                    {/* The WhatsApp icon inside the button */}
                    <MessageCircle size={28} color="white" />
                </Button>
            </a>
        </>
    );
}