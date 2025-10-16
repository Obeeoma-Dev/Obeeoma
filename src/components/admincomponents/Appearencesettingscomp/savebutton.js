import { jsx as _jsx } from "react/jsx-runtime";
import { Button } from 'react-bootstrap';
// This component renders the save button.
const SaveButton = ({ onClick }) => (_jsx(Button, { variant: "success", onClick: onClick, children: "Save Appearance Settings" }));
export default SaveButton;
