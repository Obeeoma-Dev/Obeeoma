import React from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import whatsappLogoIcon from "../../assets/Images/whatsapp-logo-icon.png";

export function FloatingWhatsApp() {
  return (
    <>
      {/* Subtle glow animation */}
      <style>
        {`
          @keyframes softGlow {
            0% {
              box-shadow: 
                0 6px 18px rgba(0,0,0,0.22),
                inset 0 -2px 4px rgba(0,0,0,0.15);
            }
            50% {
              box-shadow: 
                0 10px 24px rgba(0,0,0,0.28),
                inset 0 -2px 6px rgba(0,0,0,0.2);
            }
            100% {
              box-shadow: 
                0 6px 18px rgba(0,0,0,0.22),
                inset 0 -2px 4px rgba(0,0,0,0.15);
            }
          }
        `}
      </style>

      <OverlayTrigger
        placement="left"
        delay={{ show: 200, hide: 100 }}
        overlay={<Tooltip id="whatsapp-tooltip">Chat with us</Tooltip>}
      >
        <a
          href="https://wa.me/2347034387683"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          style={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            zIndex: 1050,
            textDecoration: "none",
          }}
        >
          <Button
            className="d-flex align-items-center justify-content-center rounded-circle border-0"
            style={{
              width: "64px",
              height: "64px",
              backgroundColor: "#25D366",
              animation: "softGlow 3s ease-in-out infinite",
              transition:
                "transform 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease",
            }}
            onMouseEnter={(e): void => {
              e.currentTarget.style.transform = "translateY(-2px) scale(1.05)";
            }}
            onMouseLeave={(e): void => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
            }}
          >
            <img
              src={whatsappLogoIcon}
              alt="WhatsApp"
              style={{
                width: "36px",
                height: "36px",
                objectFit: "contain",
              }}
            />
          </Button>
        </a>
      </OverlayTrigger>
    </>
  );
}

// // Import React to use JSX and functional components
// import React from "react";
// // Import Button from React-Bootstrap for consistent Bootstrap styling
// import { Button } from "react-bootstrap";
// // Import the MessageCircle icon from lucide-react (for the WhatsApp logo)
// import whatsappLogoIcon from "../../assets/Images/whatsapp-logo-icon.png";

// // Define and export the FloatingWhatsApp component
// export function FloatingWhatsApp() {
//   return (
//     <>
//       {/* Inline <style> tag to define the glow animation using keyframes */}
//       <style>
//         {`
//           @keyframes pulse {
//             0% {
//               transform: scale(1);
//               box-shadow: 0 0 0 rgba(0, 0, 0, 0.2);
//             }
//             50% {
//               transform: scale(1.1);
//               box-shadow: 0 0 12px rgba(0, 0, 0, 0.3);
//             }
//             100% {
//               transform: scale(1);
//               box-shadow: 0 0 0 rgba(0, 0, 0, 0.2);
//             }
//           }
//         `}
//       </style>

//       {/* Anchor tag (<a>) that wraps the button, linking to your WhatsApp chat */}
//       <a
//         href="https://wa.me/2347034387683" // WhatsApp direct link
//         target="_blank" // Opens link in a new browser tab
//         rel="noopener noreferrer" // Security best practice to prevent access to window.opener
//         aria-label="Contact us on WhatsApp" // Accessibility label for screen readers
//         style={{
//           position: "fixed", // Keeps the button in the same spot on screen
//           bottom: "2rem", // 2rem from the bottom
//           right: "2rem", // 2rem from the right
//           zIndex: 1050, // Keeps it above other elements (Bootstrap modals use 1040)
//           textDecoration: "none", // Removes underline from the anchor
//         }}
//       >
//         {/* React Bootstrap button styled to look like your WhatsApp circle */}
//         <Button
//           variant="success" // Bootstrap green color (we override it below)
//           className="d-flex align-items-center justify-content-center rounded-circle shadow-lg border-0"
//           style={{
//             width: "64px", // Button width
//             height: "64px", // Button height
//             backgroundColor: "#25D366", // WhatsApp brand green
//             transition: "transform 0.3s ease, box-shadow 0.3s ease", // Smooth hover animations
//             animation: "pulse 1.5s infinite", // Glow effect added here
//           }}
//           // Hover effect: slightly enlarge and add stronger shadow
//           onMouseEnter={(e): void => {
//             e.currentTarget.style.transform = "scale(1.1)";
//             e.currentTarget.style.boxShadow = "0 0 20px rgba(0,0,0,0.3)";
//           }}
//           // Reset hover effect
//           onMouseLeave={(e): void => {
//             e.currentTarget.style.transform = "scale(1)";
//             e.currentTarget.style.boxShadow = "0 0 10px rgba(0,0,0,0.2)";
//           }}
//         >
//           {/* The WhatsApp icon inside the button */}
//           <img
//             src={whatsappLogoIcon}
//             alt="WhatsApp"
//             style={{
//               width: "32px",
//               height: "32px",
//               filter: "brightness(0) invert(1)" // Optional: makes logo white if it's not already
//             }}
//           />
//         </Button>
//       </a>
//     </>
//   );
// }
