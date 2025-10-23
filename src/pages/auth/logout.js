import { jsx as _jsx } from "react/jsx-runtime";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { logout } from "../../store/slices/authSlice";
const LogoutButton = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        // Dispatch logout action to clear Redux state and localStorage
        dispatch(logout());
        // Navigate to login page
        navigate("/login");
    };
    return (_jsx(Button, { variant: "danger", onClick: handleLogout, ...props, children: "Logout" }));
};
export default LogoutButton;
