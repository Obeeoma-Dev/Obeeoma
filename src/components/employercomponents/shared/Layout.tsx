// import { useState, ReactNode } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import {
//   LayoutDashboard,
//   Users as UsersIcon,
//   CreditCard,
//   Settings as SettingsIcon,
//   FileText,
//   LogOut,
//   Bell,
//   Menu,
//   X,
// } from "lucide-react";
// import logo from "../../../assets/Images/obeeomalogoicon2.png";
// import LogoutModal from "../LogoutModal";
// 
// interface LayoutProps {
//   children: ReactNode;
//   title: string;
//   showSearch?: boolean;
//   additionalHeaderContent?: ReactNode;
// }
// 
// const Layout = ({ children, title}: LayoutProps) => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();
// 
//   const menuItems = [
//     { icon: LayoutDashboard, label: "Overview", path: "/employer-dashboard", active: false },
//     { icon: UsersIcon, label: "Employees", path: "/employee-management", active: false },
//     { icon: CreditCard, label: "Subscription", path: "/employer-subscription", active: false },
//     { icon: FileText, label: "Reports", path: "/organization-reports", active: false },
//   ].map(item => ({
//     ...item,
//     active: location.pathname === item.path
//   }));
// 
// //logout function was here, been replaced by inline modal handlers
// 
//   const handleLogoutConfirm = () => {
//     // Add your logout logic here
//     console.log("Logging out...");
//     // Example: Clear tokens, redirect to login, etc.
//     // localStorage.removeItem('authToken');
//     navigate('/login');
//     setIsLogoutModalOpen(false);
//   };
// 
//   const handleLogoutCancel = () => {
//     setIsLogoutModalOpen(false);
//   };
// 
//   return (
//     <div className="min-vh-100 bg-light">
//       {/* Mobile Menu Overlay */}
//       {isSidebarOpen && (
//         <div
//           className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 z-40 d-lg-none"
//           onClick={() => setIsSidebarOpen(false)}
//         />
//       )}
// 
//        {/* Logout Modal */}
//       <LogoutModal
//         isOpen={isLogoutModalOpen}
//         onClose={handleLogoutCancel}
//         onConfirm={handleLogoutConfirm}
//         userName="Billy"
//         userLocation="Location"
//       />
// 
//       {/* Sidebar */}
//       <aside
//         className={`position-fixed top-0 start-0 h-100 bg-white border-end z-50 transition-all ${isSidebarOpen ? "translate-x-0" : "translate-x-n100"} d-lg-block`}
//         style={{ width: "240px" }}
//       >
//         <div className="p-4 border-bottom d-flex align-items-center justify-content-between">
//           <button
//             onClick={() => navigate("/employer-dashboard")}
//             className="btn btn-link text-decoration-none d-flex align-items-center gap-2 p-0"
//           >
//             <div className="rounded-circle bg-primary d-flex align-items-center justify-content-center" style={{ width: "40px", height: "40px" }}>
//               <span className="text-white fw-bold">
//                 <img src= {logo} alt="logo" height="40" />
//               </span>
//             </div>
//           </button>
//           <button onClick={() => setIsSidebarOpen(false)} className="btn btn-link d-lg-none p-0">
//             <X size={20} />
//           </button>
//         </div>
// 
//         {/* Main Menu */}
//         <nav className="px-3 mt-4">
//           <p className="text-muted small mb-3 ps-3">Menu</p>
//           {menuItems.map((item) => (
//             <button
//               key={item.label}
//               onClick={() => navigate(item.path)}
//               className={`w-100 btn d-flex align-items-center gap-3 mb-2 text-start ${item.active ? "bg-light text-primary" : "text-dark"}`}
//               style={{
//                 border: "none",
//                 borderRadius: "8px",
//                 padding: "12px",
//               }}
//             >
//               <item.icon size={20} />
//               <span className="fw-medium">{item.label}</span>
//             </button>
//           ))}
//         </nav>
// 
//         {/* Bottom Section - Settings & Logout */}
//         <div className="position-absolute bottom-0 start-0 end-0 p-3 border-top">
//           <button
//             onClick={() => navigate("/employer-settings")}
//             className={`w-100 btn d-flex align-items-center gap-3 text-start mb-2 ${location.pathname === "/settings" ? "text-primary bg-light" : "text-dark"
//               }`}
//             style={{
//               border: "none",
//               borderRadius: "8px",
//               padding: "12px",
//             }}
//           >
//             <SettingsIcon size={20} />
//             <span className="fw-medium">Settings</span>
//           </button>
//           <button
//             className="w-100 btn d-flex align-items-center gap-3 text-start text-dark"
//             style={{
//               border: "none",
//               borderRadius: "8px",
//               padding: "12px",
//             }}
//             onClick={() => setIsLogoutModalOpen(true)} >
//             <LogOut size={20} />
//             <span>Logout</span>
//           </button>
//         </div>
//       </aside>
// 
//       {/* Main Content */}
//       <div className="d-lg-flex">
//         <div className="d-none d-lg-block" style={{ width: "240px" }}></div>
// 
//         <div className="flex-grow-1">
//           {/* Header */}
//           <header className="bg-white border-bottom sticky-top z-30">
//             <div className="container-fluid">
//               <div className="row align-items-center py-3">
//                 <div className="col-auto d-lg-none">
//                   <button
//                     onClick={() => setIsSidebarOpen(true)}
//                     className="btn btn-link p-2"
//                   >
//                     <Menu size={24} />
//                   </button>
//                 </div>
// 
//                 <div className="col">
//                   <h1 className="h4 fw-bold mb-0">{title}</h1>
//                 </div>
// 
//                 <div className="col-auto">
//                   <button className="btn btn-link position-relative p-2 text-dark">
//                     <Bell size={20} />
//                     <span className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-primary p-1"></span>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </header>
// 
//           {/* Page Content */}
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// };
// 
// export default Layout;

import { useState, ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users as UsersIcon,
  CreditCard,
  Settings as SettingsIcon,
  FileText,
  LogOut,
  Bell,
  Menu,
  X,
} from "lucide-react";
import logo from "../../../assets/Images/green..png";
import LogoutModal from "../LogoutModal";

interface LayoutProps {
  children: ReactNode;
  title: string;
  showSearch?: boolean;
  additionalHeaderContent?: ReactNode;
}

const PRIMARY_COLOR = "#3CB371"; // Define your custom color for easy reference

const Layout = ({ children, title }: LayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: "Overview", path: "/employer-dashboard", active: false },
    { icon: UsersIcon, label: "Employees", path: "/employee-management", active: false },
    { icon: CreditCard, label: "Subscription", path: "/employer-subscription", active: false },
    { icon: FileText, label: "Reports", path: "/organization-reports", active: false },
  ].map(item => ({
    ...item,
    active: location.pathname === item.path
  }));

  //logout function was here, been replaced by inline modal handlers

  const handleLogoutConfirm = () => {
    // Add your logout logic here
    console.log("Logging out...");
    // Example: Clear tokens, redirect to login, etc.
    // localStorage.removeItem('authToken');
    navigate('/login');
    setIsLogoutModalOpen(false);
  };

  const handleLogoutCancel = () => {
    setIsLogoutModalOpen(false);
  };

  return (
    <div className="min-vh-100 bg-light">
      {/* Mobile Menu Overlay */}
      {isSidebarOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 z-40 d-lg-none"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Logout Modal */}
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
        userName="Billy"
        userLocation="Location"
      />

      {/* Sidebar */}
      <aside
        className={`position-fixed top-0 start-0 h-100 bg-white border-end z-50 transition-all ${isSidebarOpen ? "translate-x-0" : "translate-x-n100"} d-lg-block`}
        style={{ width: "240px" }}
      >
        <div className="p-4 border-bottom d-flex align-items-center justify-content-between">
          <button
            onClick={() => navigate("/employer-dashboard")}
            className="btn btn-link text-decoration-none d-flex align-items-center gap-2 p-0"
          >
            <div 
                className=" justify-content-center" 
                style={{ width: "80px", height: "80px", }} // <-- COLOR CHANGE 1: Logo background
            >
              <span className="text-white fw-bold">
                <img src={logo} alt="logo" height="40" />
              </span>
            </div>
          </button>
          <button onClick={() => setIsSidebarOpen(false)} className="btn btn-link d-lg-none p-0">
            <X size={20} />
          </button>
        </div>

        {/* Main Menu */}
        <nav className="px-3 mt-4">
          <p className="text-muted small mb-3 ps-3">Menu</p>
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`w-100 btn d-flex align-items-center gap-3 mb-2 text-start ${item.active ? "bg-light" : "text-dark"}`}
              style={{
                border: "none",
                borderRadius: "8px",
                padding: "12px",
                color: item.active ? PRIMARY_COLOR : undefined, // <-- COLOR CHANGE 2: Active text color
              }}
            >
              <item.icon size={20} />
              <span className="fw-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Bottom Section - Settings & Logout */}
        <div className="position-absolute bottom-0 start-0 end-0 p-3 border-top">
          <button
            onClick={() => navigate("/employer-settings")}
            className={`w-100 btn d-flex align-items-center gap-3 text-start mb-2 ${location.pathname === "/settings" ? "bg-light" : "text-dark"
              }`}
            style={{
              border: "none",
              borderRadius: "8px",
              padding: "12px",
              color: location.pathname === "/settings" ? PRIMARY_COLOR : undefined, // <-- COLOR CHANGE 3: Settings active text color
            }}
          >
            <SettingsIcon size={20} />
            <span className="fw-medium">Settings</span>
          </button>
          <button
            className="w-100 btn d-flex align-items-center gap-3 text-start text-dark"
            style={{
              border: "none",
              borderRadius: "8px",
              padding: "12px",
            }}
            onClick={() => setIsLogoutModalOpen(true)} >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="d-lg-flex">
        <div className="d-none d-lg-block" style={{ width: "240px" }}></div>

        <div className="flex-grow-1">
          {/* Header */}
          <header className="bg-white border-bottom sticky-top z-30">
            <div className="container-fluid">
              <div className="row align-items-center py-3">
                <div className="col-auto d-lg-none">
                  <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="btn btn-link p-2"
                    style={{fontFamily:"heading", color:PRIMARY_COLOR}}
                  >
                    <Menu size={24} />
                  </button>
                </div>

                <div className="col">
                  <h1 className="h4 fw-bold mb-0 " style={{fontFamily:"heading"}}>{title}</h1>
                </div>

                <div className="col-auto">
                  <button className="btn btn-link position-relative p-2 text-dark">
                    <Bell size={20} />
                    <span 
                        className="position-absolute top-0 start-100 translate-middle badge rounded-circle p-1"
                        style={{ backgroundColor: PRIMARY_COLOR }} // <-- COLOR CHANGE 4: Notification badge background
                    ></span>
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;