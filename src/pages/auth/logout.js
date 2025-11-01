import { jsx as _jsx } from "react/jsx-runtime";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { logoutUserThunk } from "../../store/slices/authSlice";
const LogoutButton = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = async () => {
        const resultAction = await dispatch(logoutUserThunk());
        if (logoutUserThunk.fulfilled.match(resultAction) || logoutUserThunk.rejected.match(resultAction)) {
            navigate("/login");
        }
    };
    return (_jsx(Button, { variant: "danger", onClick: handleLogout, ...props, children: "**Logout**" }));
};
export default LogoutButton;
