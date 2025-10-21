import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { logout } from "../../store/slices/authSlice";

type LogoutButtonProps = React.ComponentProps<typeof Button>;

const LogoutButton: React.FC<LogoutButtonProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Dispatch logout action to clear Redux state and localStorage
    dispatch(logout());
    // Navigate to login page
    navigate("/login");
  };

  return (
    <Button variant="danger" onClick={handleLogout} {...props}>
      Logout
    </Button>
  );
};

export default LogoutButton;