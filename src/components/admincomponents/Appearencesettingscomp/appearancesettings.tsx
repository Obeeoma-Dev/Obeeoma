// import React, { useState } from "react";
// import { Card } from "react-bootstrap";
// import ThemeSelector from "./themeselector";
// import AccentColorSelector from "./accentcolourselector";
// import LayoutSelector from "./layoutselector";
// import SaveButton from "./savebutton";

// // This page renders the full Appearance Settings interface.
// const AppearanceSettings: React.FC = () => {
//   // Local state for each setting
//   const [theme, setTheme] = useState("Light");
//   const [accentColor, setAccentColor] = useState("Green");
//   const [layout, setLayout] = useState("Default");

//   // Placeholder save function (ready to connect to backend)
//   const handleSave = () => {
//     console.log("Saving settings:", { theme, accentColor, layout });
//     // Future: send to backend via API call
//   };

//   return (
//     <Card className="settings-card-compact shadow-sm border-0">
//       <Card.Header className="fw-semibold mb-2 ps-0">
//         Appearance Settings
//       </Card.Header>

//       <div className="row g-3">
//         {/* Theme Selector */}
//         <div className="col-md-6">
//           <div className="p-2 border rounded-2 settings-section-compact">
//             <h6 className="fw-semibold mb-2">Theme</h6>
//             <ThemeSelector selectedTheme={theme} onChange={setTheme} />
//           </div>
//         </div>

//         {/* Accent Color Selector */}
//         <div className="col-md-6">
//           <div className="p-2 border rounded-2 settings-section-compact">
//             <h6 className="fw-semibold mb-2">Accent Color</h6>
//             <AccentColorSelector
//               selectedColor={accentColor}
//               onChange={setAccentColor}
//             />
//           </div>
//         </div>

//         {/* Layout Selector */}
//         <div className="col-12">
//           <div className="p-2 border rounded-2 settings-section-compact">
//             <h6 className="fw-semibold mb-2">Layout</h6>
//             <LayoutSelector selectedLayout={layout} onChange={setLayout} />
//           </div>
//         </div>
//       </div>

//       {/* Save Button */}
//       <div className="d-flex justify-content-end gap-2 mt-2">
//         <SaveButton onClick={handleSave} />
//       </div>
//     </Card>
//   );
// };

// export default AppearanceSettings;
