      {/* Header Section -- find more interesting words to put here, like company logo or stress quote */}
      {/* <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="h5 fw-semibold mb-0 text-success">Employees</h2>
          </div>
        </div>
      </div> */}
import React, { useState } from "react";
import { Search } from "lucide-react";
import AddEmployeeForm from "./AddEmployeeForm"; // Adjust import path as needed

interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  status: string;
  avatar: string;
}

interface EmployeeTableProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const EmployeeTable = ({ searchQuery, onSearchChange }: EmployeeTableProps) => {
  // TODO: Replace with API data
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: 1,
      name: "Paul Lwanga",
      email: "paul@example.com",
      department: "Marketing",
      status: "Active",
      avatar: "J",
    },
    {
      id: 2,
      name: "Alex Agbonifo",
      email: "alex@example.com",
      department: "HR",
      status: "Active",
      avatar: "A",
    },
    {
      id: 3,
      name: "Sam Mukwano",
      email: "sam@example.com",
      department: "Finance",
      status: "Active",
      avatar: "S",
    },
    {
      id: 4,
      name: "Orena",
      email: "orenagedion2020@gmail.com",
      department: "Engineering",
      status: "Pending",
      avatar: "O",
    },
  ]);

  const [showModal, setShowModal] = useState(false);

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStatusChange = (employeeId: number, checked: boolean) => {
    setEmployees(prevEmployees => 
      prevEmployees.map(emp => 
        emp.id === employeeId 
          ? { ...emp, status: checked ? "Active" : "Inactive" }
          : emp
      )
    );
  };

  const loadAddEmployeeForm = () => {
    setShowModal(true);
  }

  const closeModal = () => {
    setShowModal(false);
  }

  const handleEmployeeAdded = () => {
    // Refresh employee list or show success message
    console.log("Employee added successfully");
    // You can refetch employees here or update the state
  }

  return (
    <>
      {/* Search and Add Employee Section */}
      <div className="row mb-3">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <div className="position-relative" style={{ width: "300px" }}>
              <Search className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" size={16} />
              <input
                type="search"
                placeholder="Search employees..."
                className="form-control ps-5"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
            <button 
              type="button" 
              className="btn btn-success" 
              onClick={loadAddEmployeeForm}
            > 
              Add Employee
            </button>
          </div>
        </div>
      </div>

      {/* Add Employee Modal */}
      <AddEmployeeForm 
        showModal={showModal}
        onClose={closeModal}
        onEmployeeAdded={handleEmployeeAdded}
      />

      {/* Employees Table */}
      <div className="row">
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th className="border-0 ps-4 py-3 text-muted fw-semibold">Name</th>
                      <th className="border-0 py-3 text-muted fw-semibold">Email</th>
                      <th className="border-0 py-3 text-muted fw-semibold">Department</th>
                      <th className="border-0 py-3 text-muted fw-semibold">Status</th>
                      <th className="border-0 py-3 text-muted fw-semibold text-end">Deactivate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmployees.map((employee) => (
                      <tr key={employee.id}>
                        <td className="ps-4 py-3">
                          <div className="d-flex align-items-center gap-3">
                            <div className="rounded-circle bg-light d-flex align-items-center justify-content-center" style={{ width: "40px", height: "40px" }}>
                              <span className="fw-bold text-primary">{employee.avatar}</span>
                            </div>
                            <span className="fw-medium">{employee.name}</span>
                          </div>
                        </td>
                        <td className="py-3 text-muted">{employee.email}</td>
                        <td className="py-3 text-muted">{employee.department}</td>
                        <td className="py-3">
                          <span className={`badge ${
                            employee.status === "Active" 
                              ? "bg-success bg-opacity-10 text-success" 
                              : employee.status === "Pending"
                              ? "bg-warning bg-opacity-10 text-warning"
                              : "bg-danger bg-opacity-10 text-danger"
                          }`}>
                            {employee.status}
                          </span>
                        </td>
                        <td className="py-3 text-end">
                          <div className="form-check form-switch d-inline-block" style={{ width: "3.5em", textAlign: "right" }}>
                            <input
                              className="form-check-input"
                              type="checkbox"
                              role="switch"
                              checked={employee.status === "Active"}
                              onChange={(e) => {
                                handleStatusChange(employee.id, e.target.checked);
                              }}
                              style={{ width: "2.5em", height: "1.25em" }}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeTable;