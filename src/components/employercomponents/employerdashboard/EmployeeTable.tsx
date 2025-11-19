import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import AddEmployeeForm from "../companyemployees/AddEmployeeForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployeeInvites, clearEmployerError} from '../../../store/slices/EmployerSlice';
import { EmployeeInvite, Employee } from "../../../types/employer";
import { RootState } from "../../../store/store";
import { useToast } from "../../../hooks/use-toast";

// Define the required structure of the data received from the Redux state
interface EmployerStateSubset {
  invites: EmployeeInvite[]; // Use the actual type from EmployerSlice
  isLoading: boolean;
  isActionLoading: boolean; // Add isActionLoading for clarity
  error: string | null;
}

interface EmployeeTableProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const EmployeeTable = ({ searchQuery, onSearchChange }: EmployeeTableProps) => {
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

  // 2. MAP INVITES TO DISPLAY FORMAT
  const displayEmployees: Employee[] = invites.map((invite): Employee => ({
    id: invite.id,
    name: invite.email, // Using email as name if actual name isn't available
    email: invite.email,
    department: "Other", // Placeholder based on original code
    // Assuming the EmployeeInvite type has a 'status' field that can be 'accepted', 'pending', etc.
    status: invite.status === 'accepted' ? 'Active' : invite.status === 'pending' ? 'Pending' : 'Inactive',
  }));

  const [showModal, setShowModal] = useState(false);

  // Fetch employee invites on component mount
  useEffect(() => {
    dispatch(fetchEmployeeInvites() as any);
  }, [dispatch]);

  // Handle errors
  useEffect(() => {
    if (error) {
      toast({
        // Provide the required 'message' property and an optional duration
        message: `Error: ${error}`,
        duration: 5000,
      });
    
      dispatch(clearEmployerError());
    }
  }, [error, toast, dispatch]);

  const filteredEmployees = displayEmployees.filter(
    (emp) =>
      (emp.name?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
      (emp.email?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
      (emp.department?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
  );

  const handleStatusChange = () => {
    // Note: Status changes should be handled via API call in a real implementation
    toast({
      // Use the expected 'message' prop
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

  // 3. REFRESH INVITATION LIST AFTER SUCCESSFUL INVITE
  const handleEmployeeAdded = () => {
    // This function is called by the modal upon successful POST action completion.
    // The inviteEmployee thunk already handles adding the new invite to the state, 
    // so a re-fetch (fetchEmployeeInvites) is often redundant unless the API doesn't 
    // return the full list. We'll keep the toast and close the modal.
    closeModal(); // Close the modal upon success
    toast({
      message: "Employee invitation sent successfully!",
      duration: 4000,
    });
    

    // Optionally re-fetch to ensure data is completely fresh, 
    // though the inviteEmployee thunk should ideally update the state locally.
    dispatch(fetchEmployeeInvites() as any);
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
              disabled={isActionLoading} // Disable if an action (like inviting) is loading
            > 
              {isActionLoading ? 'Sending...' : 'Add Employee'}
            </button>
          </div>
        </div>
      </div>

      {/* Add Employee Modal (Assuming it handles the actual `inviteEmployee` dispatch) */}
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
                    {isLoading ? (
                      <tr>
                        <td colSpan={5} className="text-center py-5">
                          <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                          <p className="mt-2 text-muted">Fetching invitations...</p>
                        </td>
                      </tr>
                    ) : filteredEmployees.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="text-center py-5 text-muted">No invitations found.</td>
                      </tr>
                    ) : (
                      filteredEmployees.map((employee) => (
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
                                onChange={() => {
                                  handleStatusChange();
                                }}
                                style={{ width: "2.5em", height: "1.25em" }}
                              />
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
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

// import React, { useState, useEffect } from "react";
// import { Search } from "lucide-react";
// import AddEmployeeForm from "./AddEmployeeForm";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchEmployeeInvites, clearEmployerError, inviteEmployee } from '../../../store/slices/EmployerSlice';
// import { RootState } from "../../../store/store";
// import { useToast } from "../../../hooks/use-toast";

// interface Employee {
//   id: number;
//   name: string;
//   email: string;
//   department: string;
//   status: string;
//   avatar: string;
// }

// interface EmployeeTableProps {
//   searchQuery: string;
//   onSearchChange: (query: string) => void;
// }

// const EmployeeTable = ({ searchQuery, onSearchChange }: EmployeeTableProps) => {
//   const dispatch = useDispatch();
//   const { toast } = useToast();
// interface InvitesState {
//   invites: typeof inviteEmployee;
//   isLoading: boolean;
//   error: string | null;
// }
// const { invites, isLoading, error } = useSelector((state: RootState) => state.employer as InvitesState);
//   // Transform invites to employee format for display
//   interface Invite {
//     id: number;
//     email: string;
//     status: 'accepted' | 'pending' | 'rejected' | string;
//   }

//   const employees: Employee[] = (invites as Invite[]).map((invite: Invite): Employee => ({
//     id: invite.id,
//     name: invite.email,
//     email: invite.email,
//     department: "Other",
//     status: invite.status === 'accepted' ? 'Active' : invite.status === 'pending' ? 'Pending' : 'Inactive',
//     avatar: invite.email.charAt(0).toUpperCase(),
//   }));

//   const [showModal, setShowModal] = useState(false);

//   // Fetch employee invites on component mount
//   useEffect(() => {
//     dispatch(fetchEmployeeInvites());
//   }, [dispatch]);

//   // Handle errors
//   useEffect(() => {
//     if (error) {
//       toast({
//         title: "Error",
//         description: error,
//         message: error,
//       });
//       dispatch(clearEmployerError());
//     }
//   }, [error, toast, dispatch]);

//   const filteredEmployees = employees.filter(
//     (emp) =>
//       emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       emp.department.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleStatusChange = (employeeId: number, checked: boolean) => {
//     // Note: Status changes should be handled via API call in a real implementation
//     // For now, we'll show a toast indicating this feature needs backend integration
//     toast({
//       title: "Feature Not Implemented",
//       description: "Status changes require backend API integration",
//       message: "Status changes require backend API integration",
//     });
//   };

//   const loadAddEmployeeForm = () => {
//     setShowModal(true);
//   }

//   const closeModal = () => {
//     setShowModal(false);
//   }

//   const handleEmployeeAdded = () => {
//     // Refresh the employee invites list after adding a new employee
//     dispatch(fetchEmployeeInvites());
//     toast({
//       title: "Success",
//       description: "Employee invitation sent successfully!",
//       message: "Employee invitation sent successfully!",
//     });
//   }

//   return (
//     <>
//       {/* Search and Add Employee Section */}
//       <div className="row mb-3">
//         <div className="col-12">
//           <div className="d-flex justify-content-between align-items-center">
//             <div className="position-relative" style={{ width: "300px" }}>
//               <Search className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" size={16} />
//               <input
//                 type="search"
//                 placeholder="Search employees..."
//                 className="form-control ps-5"
//                 value={searchQuery}
//                 onChange={(e) => onSearchChange(e.target.value)} />
//             </div>
//             <button 
//               type="button" 
//               className="btn btn-success" 
//               onClick={loadAddEmployeeForm} > 
//               Add Employee
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Add Employee Modal */}
//       <AddEmployeeForm 
//         showModal={showModal}
//         onClose={closeModal}
//         onEmployeeAdded={handleEmployeeAdded}
//       />

//       {/* Employees Table */}
//       <div className="row">
//         <div className="col-12">
//           <div className="card border-0 shadow-sm">
//             <div className="card-body p-0">
//               <div className="table-responsive">
//                 <table className="table table-hover mb-0">
//                   <thead className="bg-light">
//                     <tr>
//                       <th className="border-0 ps-4 py-3 text-muted fw-semibold">Name</th>
//                       <th className="border-0 py-3 text-muted fw-semibold">Email</th>
//                       <th className="border-0 py-3 text-muted fw-semibold">Department</th>
//                       <th className="border-0 py-3 text-muted fw-semibold">Status</th>
//                       <th className="border-0 py-3 text-muted fw-semibold text-end">Deactivate</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {filteredEmployees.map((employee) => (
//                       <tr key={employee.id}>
//                         <td className="ps-4 py-3">
//                           <div className="d-flex align-items-center gap-3">
//                             <div className="rounded-circle bg-light d-flex align-items-center justify-content-center" style={{ width: "40px", height: "40px" }}>
//                               <span className="fw-bold text-primary">{employee.avatar}</span>
//                             </div>
//                             <span className="fw-medium">{employee.name}</span>
//                           </div>
//                         </td>
//                         <td className="py-3 text-muted">{employee.email}</td>
//                         <td className="py-3 text-muted">{employee.department}</td>
//                         <td className="py-3">
//                           <span className={`badge ${
//                             employee.status === "Active" 
//                               ? "bg-success bg-opacity-10 text-success" 
//                               : employee.status === "Pending"
//                               ? "bg-warning bg-opacity-10 text-warning"
//                               : "bg-danger bg-opacity-10 text-danger"
//                           }`}>
//                             {employee.status}
//                           </span>
//                         </td>
//                         <td className="py-3 text-end">
//                           <div className="form-check form-switch d-inline-block" style={{ width: "3.5em", textAlign: "right" }}>
//                             <input
//                               className="form-check-input"
//                               type="checkbox"
//                               role="switch"
//                               checked={employee.status === "Active"}
//                               onChange={(e) => {
//                                 handleStatusChange(employee.id, e.target.checked);
//                               }}
//                               style={{ width: "2.5em", height: "1.25em" }}
//                             />
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default EmployeeTable;