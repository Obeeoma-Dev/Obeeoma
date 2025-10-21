// import React, { use, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../../store/store";
// import { useNavigate } from "react-router-dom";
// import { Button, Modal, Row, Col } from "react-bootstrap";

// type LogoutButtonProps = React.ComponentProps<typeof Button>;


// const handleLogout = () => { = (props) => {
//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();

//   useEffect(() => {
//     localStorage.removeItem("authToken");
//     navigate("/login");
//     }, [dispatch, navigate]);
// }

// return (
//     <Button variant="danger" onClick={LogoutPage} {...props}>
    
//       Logout
//     </Button>
//   );
// };
 
// export default LogoutPage;