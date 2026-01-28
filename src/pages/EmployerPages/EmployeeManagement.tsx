import EmployeeTable from "../../components/employercomponents/employerdashboard/EmployeeTable";
import Layout from "../../components/employercomponents/shared/Layout";
import { Search, UserPlus } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import AddEmployeeForm from "../../components/employercomponents/companyemployees/AddEmployeeForm";

const EmployeeManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);

  // Get employees from Redux
  const employeeData = useSelector((state: RootState) => ({
    employees: state.employer.employees,
    isLoading: state.employer.isLoading,
  }));

  // // Sort employees by name
  // const sortedEmployees = [...employeeData.employees].sort((a, b) => a.name.localeCompare(b.name));

  // // Hardcode companyId for now
  const companyId = "your-company-id";

  const handleAddEmployee = () => {
    setShowAddEmployeeModal(true);
  };

  const handleCloseModal = () => {
    setShowAddEmployeeModal(false);
  };

  const handleEmployeeAdded = () => {
    // Refresh employee list or handle success
    console.log("Employee added successfully");
  };

  return (
    <Layout title="Employee Management Portal">
      <div className="container-fluid py-4 px-3">
        <div className="row gy-4">
          <div className="col-lg-12 col-md-12">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="card-title fw-semibold mb-0">
                    Corporate Employee List
                  </h5>
                  <div className="d-flex align-items-center">
                    <div
                      className="input-group me-3"
                      style={{ width: "300px" }}
                    >
                      {/* <span className="input-group-text bg-white border-end-0">
                        <Search size={18} />
                      </span> */}

                      <input
                        type="text"
                        className="form-control border-start-0"
                        placeholder="Search employees..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <button
                      className="btn d-flex align-items-center"
                      onClick={handleAddEmployee}
                      style={{
                        backgroundColor: "#22C55E",
                        borderColor: "#22C55E",
                        color: "white",
                        borderRadius: "8px",
                        fontWeight: "600",
                        padding: "0.5rem 1rem",
                      }}
                    >
                      <UserPlus size={18} className="me-2" />
                      Add Employee
                    </button>
                  </div>
                </div>
              </div>
              <EmployeeTable employees={employeeData.employees} />
            </div>
          </div>
        </div>
      </div>

      <AddEmployeeForm
        showModal={showAddEmployeeModal}
        onClose={handleCloseModal}
        onEmployeeAdded={handleEmployeeAdded}
      />
    </Layout>
  );
};

export default EmployeeManagement;
