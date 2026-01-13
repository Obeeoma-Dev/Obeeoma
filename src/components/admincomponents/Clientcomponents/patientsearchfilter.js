import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// PatientSearchFilter.tsx
// Provides search input and filter controls for patient engagement table
import { useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import "./engagement.css";
// Define the component using React.FC
const PatientSearchFilter = () => {
    // Local state to hold search input value
    const [searchTerm, setSearchTerm] = useState("");
    // Handler for input change
    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };
    // Handler for search button click (stubbed for now)
    const handleSearch = () => {
        // TODO: Implement search logic or lift state to parent
        console.log("Searching for:", searchTerm);
    };
    return (_jsx(Form, { className: "mb-3", children: _jsxs(InputGroup, { children: [_jsx(Form.Control, { type: "text", placeholder: "Search patients by name or organization...", value: searchTerm, onChange: handleChange, "aria-label": "Search patients" }), _jsx(Button, { className: "btn-search", onClick: handleSearch, children: "Search" })] }) }));
};
export default PatientSearchFilter;
