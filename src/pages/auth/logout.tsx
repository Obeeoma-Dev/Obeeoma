import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { logoutUserThunk } from "../../store/slices/authSlice";

type LogoutButtonProps = React.ComponentProps<typeof Button>;

const LogoutButton: React.FC<LogoutButtonProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = async() => {
   
    const resultAction = await dispatch(logoutUserThunk());
    if (logoutUserThunk.fulfilled.match(resultAction) || logoutUserThunk.rejected.match(resultAction)) {
    navigate("/login", { replace: true });
    }
  };

  return (
    <Button variant="danger" onClick={handleLogout} {...props}>
      Logout
    </Button>
  );
};

export default LogoutButton;