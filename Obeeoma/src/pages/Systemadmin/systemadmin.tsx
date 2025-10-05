import { Outlet } from "react-router-dom";
import Adminnav from "@/components/shared/Adminnav";

const SystemadminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Adminnav />
      <div className="flex-grow overflow-y-auto p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default SystemadminLayout;