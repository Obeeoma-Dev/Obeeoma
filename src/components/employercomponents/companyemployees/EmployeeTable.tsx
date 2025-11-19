import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import AddEmployeeForm from "./AddEmployeeForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployeeInvites, clearEmployerError } from '../../../store/slices/EmployerSlice';
import { EmployeeInvite, Employee } from '../../../types/employer';
import { RootState } from "../../../store/store";
import { useToast } from "../../../hooks/use-toast";

// Define the required structure of the data received from the Redux state
interface EmployerStateSubset {
  invites: EmployeeInvite[];
  isLoading: boolean;
  isActionLoading: boolean;
  error: string | null;
}

interface EmployeeTableProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  employees?: Employee[];
  companyId?: string;
  onEmployeeAdded?: () => void;
}

// Define the combined employee type
interface CombinedEmployee extends Omit<Employee, 'id'> {
  id: string | number;
  name: string;
  email: string;
  department: string;
  status: 'active' | 'pending' | 'inactive';
  avatar: string;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ 
  searchQuery, 
  onSearchChange, 
  employees: propEmployees,
  onEmployeeAdded 
}) => {
  const dispatch = useDispatch();
  const { toast } = useToast();

  // 1. SELECT STATE WITH CORRECT TYPE MAPPING
  const { invites, isLoading, isActionLoading, error } = useSelector(
    (state: RootState): EmployerStateSubset => ({
      invites: state.employer.invites,
      isLoading: state.employer.isLoading,
      isActionLoading: state.employer.isActionLoading,
      error: state.employer.error,
    })
  );

  const [showModal, setShowModal] = useState(false);

  // Combine invited employees with actual employees
  const displayEmployees: CombinedEmployee[] = [
    ...(propEmployees || []).map(emp => ({
      id: emp.id,
      name: emp.name || `User`,
      email: emp.email || '',
      department: emp.department || 'Unknown',
      status: (emp.status === 'active' ? 'active' : emp.status === 'pending' ? 'pending' : 'inactive') as 'active' | 'pending' | 'inactive',
      avatar: emp.avatar || (emp.name ? emp.name.charAt(0).toUpperCase() : 'E'),
    })),
    ...invites.map((invite: EmployeeInvite) => ({
      id: invite.id || `invite-${invite.email}`,
      name: invite.email.split('@')[0],
      email: invite.email,
      department: invite.department || "Pending",
      status: (invite.status === 'accepted' ? 'active' : 'pending') as 'active' | 'pending' | 'inactive',
      avatar: invite.email.charAt(0).toUpperCase(),
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

  const filteredEmployees = displayEmployees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStatusChange = () => {
    toast({
      message: "Status changes require backend API integration",
      duration: 4000,
    });
  };

  const loadAddEmployeeForm = () => {
    setShowModal(true);
  }

  const closeModal = () => {
    setShowModal(false);
  }

  const handleEmployeeAdded = () => {
    closeModal();
    toast({
      message: "Employee invitation sent successfully!",
      duration: 4000,
    });
    dispatch(fetchEmployeeInvites() as any);
    onEmployeeAdded?.();
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
                onChange={(e) => onSearchChange(e.target.value)} />
            </div>
            <button 
              type="button" 
              className="btn btn-success" 
              onClick={loadAddEmployeeForm} 
              disabled={isActionLoading}
            > 
              {isActionLoading ? 'Sending...' : 'Add Employee'}
            </button>
          </div>
        </div>
      </div>

      <AddEmployeeForm 
        showModal={showModal}
        onClose={closeModal}
        onEmployeeAdded={handleEmployeeAdded}
      />

      <div className="table-responsive">
        <table className="table table-hover mb-0">
          <thead className="bg-light">
            <tr>
              <th className="border-0 ps-4 py-3 text-muted fw-semibold">Worker</th>
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
              filteredEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td className="ps-4 py-3">
                    <div className="d-flex align-items-center gap-3">
                      <div 
                        className="rounded-circle bg-light d-flex align-items-center justify-content-center" 
                        style={{ width: "40px", height: "40px" }}
                      >
                        <span className="fw-bold text-primary">{employee.avatar}</span>
                      </div>
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
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => {/* Edit functionality */}}
                      >
                        Edit
                      </button>
                      <button 
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => {/* Remove functionality */}}
                      >
                        Remove
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
          Showing {filteredEmployees.length} of {displayEmployees.length} employees
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-sm btn-outline-secondary">Previous</button>
          <button className="btn btn-sm btn-outline-secondary">Next</button>
        </div>
      </div>
    </>
  );
};

export default EmployeeTable;