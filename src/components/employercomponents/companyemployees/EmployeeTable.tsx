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
      status: "Pending",
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

  const handleChange = (checked: boolean) => {
    setIsChecked(checked);
  };

  const loadAddEmployeeForm = () => {
    // Logic to load the Add Employee form/modal
  }


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
      <div className="row mb-3">
        <div className="col-8 col-md-6">
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
        <div className="col-4 col-md-6 text-end"></div> 
          <button type="button" className="btn btn-success col-3 col-md-5 col-lg-auto" data-toggle="modal" data-target="#employeeInviteModal" data-whatever="@mdo"
            onClick={loadAddEmployeeForm}> 
            Add Employee
          </button>
        </div>
        
        
      <div className="row mb-3">

        {/* Modal popup for adding employee */}
        <div className="modal fade" id="employeeInviteModal" tabIndex={-1} role="dialog" aria-labelledby="employeeInviteModal" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="employeeInviteModal">Invite employees</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="employee-email" className="col-form-label">Email address:</label>
                    <input type="text" className="form-control" id="employee-email" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone" className="col-form-label">Phone number:</label>
                    <textarea className="form-control" id="phone"></textarea>
                  </div>
                  <div className="form-group">
                    <label htmlFor="department" className="col-form-label">Department:</label>
                    <textarea className="form-control" id="department"></textarea>
                  </div>
                  <div className="form-group">
                    <a href="#" className="tooltip-test" title="Upload an excel document">Try bulk add</a>.
                    <input type="file" className="form-control-file" id="upload-excel" />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-success">Add</button>
                <button type="button" className="btn btn-primary" data-dismiss="modal">Close</button>
            </div>
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
                      <th className="border-0 py-3 text-muted fw-normal text-end">Deactivate</th>
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
                        <td className="py-3 text-end">
                          <div className="form-check form-switch d-inline-block" style={{ width: "3.5em", textAlign: "right" }}>
                            <input
                              className="form-check-input"
                              type="checkbox"
                              role="switch"
                              defaultChecked={employee.status === "Active"}
                              onChange={(e) => {
                                const checked = (e.target as HTMLInputElement).checked;
                                // TODO: replace with real update logic (update state or call API)
                                console.log(`Employee ${employee.id} toggled to ${checked ? "Active" : "Inactive"}`);
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
    </div>
    </>
  );
};

export default EmployeeTable;
