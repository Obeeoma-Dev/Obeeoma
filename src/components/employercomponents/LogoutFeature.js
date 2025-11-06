import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Button } from 'react-bootstrap';
import LogoutModal from './LogoutModal'; // Adjust path as needed
import { useLogout } from '../../hooks/useLogout';
const LogoutFeature = ({ buttonVariant = "danger", buttonText = "Logout", className = "", userName, userLocation, }) => {
    //connect the logic! ---
    const { isModalOpen, openModal, closeModal, confirmLogout } = useLogout();
    return (_jsxs(_Fragment, { children: [_jsxs(Button, { variant: buttonVariant, onClick: openModal, className: className, children: ["*", buttonText, "*"] }), _jsx(LogoutModal, { isOpen: isModalOpen, onClose: closeModal, onConfirm: confirmLogout, userName: userName, userLocation: userLocation })] }));
};
export default LogoutFeature;
