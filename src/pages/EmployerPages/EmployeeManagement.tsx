import { useState } from "react";
import Layout from "../../components/employercomponents/shared/Layout";
import EmployeeTable from "../../components/employercomponents/companyemployees/EmployeeTable";
import AddEmployeeForm from "../../components/employercomponents/companyemployees/AddEmployeeForm";
import { Plus } from "lucide-react";

const EmployeeManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const additionalHeader = (
    <button className="btn btn-primary d-flex align-items-center gap-2">
      <Plus size={16} />
      Add Employee
    </button>
  );

  return (
    <Layout 
      title="Employee Management" 
      showSearch={true}
      additionalHeaderContent={additionalHeader}
    >
      <div className="container-fluid py-4">
        <EmployeeTable searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <AddEmployeeForm />
      </div>
    </Layout>
  );
};

export default EmployeeManagement;