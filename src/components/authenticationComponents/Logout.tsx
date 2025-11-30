import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { logoutUserThunk } from "../../store/slices/authSlice";

// We use React.PropsWithChildren to ensure the component can accept JSX as children (e.g., the icon)
type LogoutButtonProps = React.ComponentProps<typeof Button>;

const LogoutButton: React.FC<React.PropsWithChildren<LogoutButtonProps>> = ({ children, ...props }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = async() => {
    
    
    console.log("User attempting to log out via Redux Thunk and client-side cleanup.");
    const resultAction = await dispatch(logoutUserThunk());
    

    localStorage.removeItem('userToken');
    sessionStorage.removeItem('userData');
  
    alert("You have been successfully logged out."); 

    // 4. Navigate to the login page upon success or failure of the logout thunk
    if (logoutUserThunk.fulfilled.match(resultAction) || logoutUserThunk.rejected.match(resultAction)) {
      // Use navigate from react-router-dom 
     navigate("/login", { replace: true });
    // window.location.href = '/login';
    }

    
  };

  return (
    // The component now renders {children}, allowing for the icon and text passed in from the parent.
    <Button variant="danger" onClick={handleLogout} {...props}>
      {children || 'Logout'} 
    </Button>
  );
};

export default LogoutButton;