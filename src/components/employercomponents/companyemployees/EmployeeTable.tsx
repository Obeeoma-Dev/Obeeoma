import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployeeInvites, clearEmployerError } from '../../../store/slices/EmployerSlice';
import { EmployeeInvite, Employee } from '../../../types/employer';
import { RootState } from "../../../store/store";
import { useToast } from "../../../hooks/use-toast";

interface EmployeeTableProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  employees?: Employee[];
  companyId?: string;
  onEmployeeAdded?: () => void;
}

// Define the combined employee type
interface CombinedEmployee {
  id: string;
  name: string;
  email: string;
  department: string;
  status: string;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({
  searchQuery,
  onSearchChange,
  employees,
  onEmployeeAdded
}) => {
  const dispatch = useDispatch();
  const { toast } = useToast();

  const { invites, isLoading, error } = useSelector(
    (state: RootState) => ({
      invites: state.employer.invites,
      isLoading: state.employer.isLoading,
      isActionLoading: state.employer.isActionLoading,
      error: state.employer.error,
    })
  );

  const [showModal, setShowModal] = useState(false);

  // Combine invited employees with actual employees - FIXED TYPE
  const allEmployees: CombinedEmployee[] = [
    ...(employees || []).map((emp: Employee) => ({
      id: String(emp.id),
      name: emp.name || `${emp.name }`,
      email: emp.email || '',
      department: emp.department || 'Unknown',
      status: emp.status as 'active' | 'pending' | 'inactive',
    })),
    ...invites.map((invite: EmployeeInvite) => ({
      id: String(invite.id || `invite-${invite.email}`),
      name: invite.email.split('@')[0],
      email: invite.email,
      department: invite.department || "Pending",
      status: (invite.status == 'accepted' ? 'active' : 'pending') as 'active' | 'pending' | 'inactive',
    }))
  ];

  useEffect(() => {
    dispatch(fetchEmployeeInvites() as any);
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast({
        message: `Error: ${error}`,
        duration: 5000,
      });
      dispatch(clearEmployerError());
    }
  }, [error, toast, dispatch]);

  const filteredEmployees = allEmployees.filter(
    (emp: CombinedEmployee) =>
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body">
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
            </div>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="bg-light">
              <tr>
                <th className="border-0 py-3 text-muted fw-semibold">Email</th>
                <th className="border-0 py-3 text-muted fw-semibold">Department</th>
                <th className="border-0 py-3 text-muted fw-semibold">Status</th>
                <th className="border-0 py-3 text-muted fw-semibold text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2 text-muted">Fetching employees...</p>
                  </td>
                </tr>
              ) : filteredEmployees.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-5 text-muted">
                    No employees found.
                  </td>
                </tr>
              ) : (
                filteredEmployees.map((employee: CombinedEmployee) => (
                  <tr key={employee.id}>
                    <td className="ps-4 py-3">
                      <div className="d-flex align-items-center gap-3">
                        <span className="fw-medium">{employee.name}</span>
                      </div>
                    </td>
                    <td className="py-3 text-muted">{employee.email}</td>
                    <td className="py-3 text-muted">{employee.department}</td>
                    <td className="py-3">
                      <span className={`badge ${
                        employee.status === "active" 
                          ? "bg-success bg-opacity-10 text-success" 
                          : employee.status === "pending"
                          ? "bg-warning bg-opacity-10 text-warning"
                          : "bg-danger bg-opacity-10 text-danger"
                      }`}>
                        {employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 text-end">
                      <div className="d-flex justify-content-end gap-2">
                        <button
                          className={`btn btn-sm ${
                            employee.status === "inactive"
                              ? "btn-outline-success"
                              : "btn-outline-warning"
                          }`}
                          disabled
                        >
                          {employee.status === "inactive" ? "Reactivate" : "Deactivate"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="d-flex justify-content-between align-items-center mt-3">
          <div className="text-muted">
            Showing {filteredEmployees.length} of {allEmployees.length} employees
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-sm btn-outline-secondary">Previous</button>
            <button className="btn btn-sm btn-outline-secondary">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeTable;