import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Search } from "lucide-react";

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
  const employees: Employee[] = [
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
      status: "Active",
      avatar: "O",
    },
  ];

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };


  return (
    <>
      {/* Header Section */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="h5 fw-semibold mb-0">Employees</h2>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="row mb-4">
        <div className="col-12 col-md-6">
          <div className="position-relative">
            <Search className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" size={16} />
            <input
              type="search"
              placeholder="Search employees..."
              className="form-control ps-5"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Employees Table */}
      <div className="row">
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th className="border-0 ps-4 py-3 text-muted fw-normal">Name</th>
                      <th className="border-0 py-3 text-muted fw-normal">Email</th>
                      <th className="border-0 py-3 text-muted fw-normal">Department</th>
                      <th className="border-0 py-3 text-muted fw-normal">Status</th>
                      <th className="border-0 pe-4 py-3 text-muted fw-normal text-end">Deactivate</th>
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
                          <span className="badge bg-success bg-opacity-10 text-success">
                            {employee.status}
                          </span>
                        </td>
                        <td className="pe-4 py-3 text-end">
                          <button className="btn btn-link p-0 text-muted">
                            <Checkbox checked={isChecked}
                              onChange={handleChange} size={18} />
                          </button>
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
