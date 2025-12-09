import EmployeeTable from "../../components/employercomponents/employerdashboard/EmployeeTable";
import Layout from "../../components/employercomponents/shared/Layout";
import { Search } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const EmployeeManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Get employees from Redux
  const employeeData = useSelector((state: RootState) => ({
    employees: state.employer.employees,
    isLoading: state.employer.isLoading,
  }));

  // // Sort employees by name
  // const sortedEmployees = [...employeeData.employees].sort((a, b) => a.name.localeCompare(b.name));

  // // Hardcode companyId for now
  const companyId = "your-company-id";

  return (
    <Layout title="Employee Management Portal">
      <div className="container-fluid py-4 px-3">
        <div className="row gy-4">
          <div className="col-lg-12 col-md-12">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="card-title fw-semibold mb-0">Corporate Employee List</h5>
                  <div className="d-flex align-items-center">
                    <div className="input-group me-3" style={{ width: "300px" }}>
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
                    </div>
                  </div>
                </div>
                <EmployeeTable
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  employees={employeeData.employees}
                  companyId={companyId}
                />
              </div>
            </div>
          </div>
        </div>
    </Layout>
  );
};

export default EmployeeManagement;