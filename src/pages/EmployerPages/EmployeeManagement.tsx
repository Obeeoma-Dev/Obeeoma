import { useState } from "react";
import Layout from "../../components/employercomponents/shared/Layout";
import EmployeeTable from "../../components/employercomponents/companyemployees/EmployeeTable";
import AddEmployeeForm from "../../components/employercomponents/companyemployees/AddEmployeeForm";
import { Plus } from "lucide-react";

const EmployeeManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const additionalHeader = (
    <button className="btn btn-success d-flex align-items-center gap-2">
      <Plus size={16} />
      Add Employee
    </button>
  );

  return (
    <Layout 
      title="Employee Management" 
      showSearch={true}
      additionalHeaderContent={additionalHeader}>
      <div className="row gy-4">
        <div className="container-fluid py-4 px-3">
          <div className="col-lg-12 col-md-9 col-sm-6 mx-auto">
          <EmployeeTable searchQuery={searchQuery} onSearchChange={setSearchQuery} />
          <AddEmployeeForm />
      </div></div></div>
    </Layout>
  );
};

export default EmployeeManagement;