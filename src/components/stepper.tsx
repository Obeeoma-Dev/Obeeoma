import React from 'react';
import { Row, Col } from 'react-bootstrap';


interface CustomStepperProps {
    steps: string[];
    activeStep: number;
    primaryColor: string; 
    onStepClick: (stepIndex: number) => void;
}

// Define the steps (can use the one passed via props, but redefining for clarity)
const defaultSteps = [
    { label: "Organization Details" },
    { label: "Contact & Access" },
    { label: "Complete" },
];

const CustomStepper: React.FC<CustomStepperProps> = ({ activeStep, primaryColor, steps: propSteps }) => {
    // Use steps prop if available, otherwise use defaultSteps
    const steps = propSteps.map((label, index) => defaultSteps[index] ? { ...defaultSteps[index], label } : { label });

    // New style for the main progress line (separator)
    const progressLineStyle = (index: number): React.CSSProperties => {
        const isCompleted = index < activeStep;
        return {
            position: 'absolute',
            top: '0px', // Positioned above the text labels
            left: '50%',
            right: '-50%',
            height: '4px', // Increased thickness of the line
            backgroundColor: isCompleted ? primaryColor : '#e9ecef', 
            zIndex: 0,
            transition: 'background-color 0.3s ease',
            borderRadius: '2px',
        };
    };

    const labelStyle = (index: number): React.CSSProperties => {
        const isCompleted = index < activeStep;
        const isActive = index === activeStep;
        
        return {
            textAlign: 'center',
            position: 'relative',
            paddingTop: '20px', // Space for the line above the label
            color: (isCompleted || isActive) ? primaryColor : '#6c757d', // Active/Completed color is primary
            transition: 'color 0.3s ease',
        };
    };

    // The logic for the "dot" marker on the line
    const dotStyle = (index: number): React.CSSProperties => {
        const isCompleted = index < activeStep;
        const isActive = index === activeStep;
        
        const baseDotStyle: React.CSSProperties = {
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            position: 'absolute',
            top: '-4px', // Centered vertically on the 4px line
            left: 'calc(50% - 6px)', // Centered horizontally
            zIndex: 2, // Ensure dot is above the line
            transition: 'background-color 0.3s ease, border-color 0.3s ease',
        };

        if (isCompleted) {
            return { ...baseDotStyle, backgroundColor: primaryColor, border: `2px solid ${primaryColor}` };
        } else if (isActive) {
            return { ...baseDotStyle, backgroundColor: 'white', border: `2px solid ${primaryColor}` };
        } else {
            return { ...baseDotStyle, backgroundColor: '#e9ecef', border: `2px solid #ced4da` };
        }
    }


    return (
        <Row className="mb-5 d-flex justify-content-between px-3" style={{ position: 'relative' }}>
            {steps.map((step, index) => {
                const isFirst = index === 0;
                const isLast = index === steps.length - 1;
                
                // Get the calculated styles for the label (text)
                const textStyle = labelStyle(index);

                return (
                    <Col key={index} xs={12 / steps.length} style={textStyle}>
                        
                        {/* 1. Progress Line Separator (Left Side) */}
                        {!isFirst && <div style={{ ...progressLineStyle(index - 1), right: '50%' }}></div>}
                        
                        {/* 2. Progress Line Separator (Right Side) */}
                        {!isLast && <div style={{ ...progressLineStyle(index) }}></div>}
                        
                        {/* 3. The Dot Marker */}
                        <div style={dotStyle(index)}></div>

                        {/* 4. Step Label */}
                        <small className="d-block fw-semibold" style={{ fontSize: '0.9rem' }}>
                            {step.label}
                        </small>
                    </Col>
                );
            })}
        </Row>
    );
}

export default CustomStepper;


// import React from 'react';
// import { Row, Col } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBuilding, faUserTie, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

// interface CustomStepperProps {
//     steps: string[];
//     activeStep: number;
//     primaryColor: string; // The primary color from Register.tsx, e.g., "#3CB371"
//     //mainColor: string;
    
// }

// // Define the steps for the registration process
// const steps = [
//     { label: "Organization Details", icon: faBuilding },
//     { label: "Contact & Access", icon: faUserTie },
//     { label: "Complete", icon: faCheckCircle },
// ];

// const CustomStepper: React.FC<CustomStepperProps> = ({ activeStep, primaryColor,  }) => {

//     const stepStyle = (index: number) => {
//         const isActive = index === activeStep;
//         const isCompleted = index < activeStep;

//         // Base styles for the step item
//         const baseStyle: React.CSSProperties = {
//             textAlign: 'center',
//             position: 'relative',
//             paddingTop: '1rem',
//             color: '#6c757d', // Default text color (muted)
//             transition: 'color 0.3s ease',
//         };

//         // Style for the step icon
//         const iconContainerStyle: React.CSSProperties = {
//             width: '40px',
//             height: '40px',
//             borderRadius: '50%',
//             backgroundColor: '#e9ecef', // Default grey background
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             margin: '0 auto 0.5rem auto',
//             color: '#6c757d', // Default icon color
//             fontWeight: 'bold',
//             zIndex: 1,
//             transition: 'background-color 0.3s ease, color 0.3s ease',
//         };

//         if (isCompleted) {
//             baseStyle.color = primaryColor;
//             iconContainerStyle.backgroundColor = primaryColor;
//             iconContainerStyle.color = 'white';
//         } else if (isActive) {
//             baseStyle.color = primaryColor;
//             iconContainerStyle.backgroundColor = 'white'; // Active step: white background
//             iconContainerStyle.border = `2px solid ${primaryColor}`;
//             iconContainerStyle.color = primaryColor;
//         }

//         return { baseStyle, iconContainerStyle };
//     };

//     const separatorStyle = (index: number): React.CSSProperties => {
//         const isCompleted = index < activeStep;
//         return {
//             position: 'absolute',
//             top: '30px', // Half of iconContainerStyle height + paddingTop
//             left: '50%',
//             right: '-50%',
//             height: '2px',
//             backgroundColor: isCompleted ? primaryColor : '#e9ecef', // Color based on completion
//             zIndex: 0,
//             transition: 'background-color 0.3s ease',
//         };
//     };

//     return (
//         <Row className="mb-5 d-flex justify-content-between px-3">
//             {steps.map((step, index) => {
//                 const { baseStyle, iconContainerStyle } = stepStyle(index);
//                 const isFirst = index === 0;
//                 const isLast = index === steps.length - 1;

//                 return (
//                     <Col key={index} xs={12 / steps.length} style={baseStyle}>
//                         {/* Step Line Separator (before icon) */}
//                         {!isFirst && <div style={{ ...separatorStyle(index - 1), right: '50%' }}></div>}
                        
//                         {/* Step Icon */}
//                         <div style={iconContainerStyle}>
//                             <FontAwesomeIcon icon={step.icon} />
//                         </div>

//                         {/* Step Line Separator (after icon) */}
//                         {!isLast && <div style={{ ...separatorStyle(index) }}></div>}

//                         {/* Step Label */}
//                         <small className="d-block mt-2 fw-semibold" style={{ fontSize: '0.9rem' }}>
//                             {step.label}
//                         </small>
//                     </Col>
//                 );
//             })}
//         </Row>
//     );
// }

// export default CustomStepper;