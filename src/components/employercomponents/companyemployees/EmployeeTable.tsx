import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import AddEmployeeForm from "./AddEmployeeForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployeeInvites, clearEmployerError} from '../../../store/slices/EmployerSlice';
import { EmployeeInvite } from "../../../types/employer";
import { RootState } from "../../../store/store";
import { useToast } from "../../../hooks/use-toast";

// --- UPDATED TYPES ---

// Define the required structure of the data received from the Redux state
interface EmployerStateSubset {
  invites: EmployeeInvite[]; // Use the actual type from EmployerSlice
  isLoading: boolean;
  isActionLoading: boolean; // Add isActionLoading for clarity
  error: string | null;
}

// Define the local type for display in the table
interface Employee {
  id: number | string;
  name: string;
  email: string;
  department: string; // Placeholder for now
  status: string;
  avatar: string;
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
  const employees: Employee[] = invites.map((invite): Employee => ({
    id: invite.id,
    name: invite.email, // Using email as name if actual name isn't available
    email: invite.email,
    department: "Other", // Placeholder based on original code
    // Assuming the EmployeeInvite type has a 'status' field that can be 'accepted', 'pending', etc.
    status: invite.status === 'accepted' ? 'Active' : invite.status === 'pending' ? 'Pending' : 'Inactive',
    avatar: invite.email.charAt(0).toUpperCase(),
  }));

  const [showModal, setShowModal] = useState(false);

  // Fetch employee invites on component mount
  useEffect(() => {
    // @ts-expect-error - Redux toolkit thunks don't always auto-infer dispatch type easily
    dispatch(fetchEmployeeInvites());
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

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchQuery.toLowerCase())
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
    // @ts-expect-error - Redux toolkit thunks don't always auto-infer dispatch type easily
    dispatch(fetchEmployeeInvites());
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
        <div className="col-12 p-3">
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
//   id: number | string;
//   name: string;
//   email: string;
//   department: string; // Placeholder for now
//   status: string;
//   avatar: string;
// }

// interface EmployeeTableProps {
//   searchQuery: string;
//   onSearchChange: (query: string) => void;
//   employees: Employee[];
//   companyId?: string;
// }

// const EmployeeTable = ({ searchQuery, onSearchChange }: EmployeeTableProps) => {
//   const dispatch = useDispatch();
//   const { toast } = useToast();
//   const [data, setData] = React.useState<Employee[]>([])
//   // const table = useReactTable({
//   //   data: employees,
//   //   columns,
//   //   getCoreRowModel: getCoreRowModel(),
//   //   getPaginationRowModel: getPaginationRowModel(),
//   //   onSortingChange: setSorting,
//   //   getSortedRowModel: getSortedRowModel(),
//   //   onColumnFiltersChange: setColumnFilters,
//   //   getFilteredRowModel: getFilteredRowModel(),
//   // });

//   // 1. SELECT STATE WITH CORRECT TYPE MAPPING
//   const { invites, isLoading, isActionLoading, error } = useSelector(
//     (state: RootState): EmployerStateSubset => ({
//       invites: state.employer.invites,
//       isLoading: state.employer.isLoading,
//       isActionLoading: state.employer.isActionLoading,
//       error: state.employer.error,
//     })
//   );

//   // 2. MAP INVITES TO DISPLAY FORMAT
//   const employees: Employee[] = invites.map((invite): Employee => ({
//     id: invite.id,
//     name: invite.email, // Using email as name if actual name isn't available
//     email: invite.email,
//     department: "Other", // Placeholder based on original code
//     // Assuming the EmployeeInvite type has a 'status' field that can be 'accepted', 'pending', etc.
//     status: invite.status === 'accepted' ? 'Active' : invite.status === 'pending' ? 'Pending' : 'Inactive',
//     avatar: invite.email.charAt(0).toUpperCase(),
//   }));

//   const [showModal, setShowModal] = useState(false);

//   // Fetch employee invites on component mount
//   useEffect(() => {
//     // @ts-expect-error - Redux toolkit thunks don't always auto-infer dispatch type easily
//     dispatch(fetchEmployeeInvites());
//   }, [dispatch]);

//   // Handle errors
//   useEffect(() => {
//     if (error) {
//       toast({
//         // Provide the required 'message' property and an optional duration
//         message: `Error: ${error}`,
//         duration: 5000,
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
//           </div>
//         </div>
//       </div>

//         <div className="table-responsive">
//           <table className="table table-hover mb-0">
//             <thead className="bg-light">
//               <tr>
//                 <th className="border-0 py-3 text-muted fw-semibold">Email</th>
//                 <th className="border-0 py-3 text-muted fw-semibold">Department</th>
//                 <th className="border-0 py-3 text-muted fw-semibold">Status</th>
//                 <th className="border-0 py-3 text-muted fw-semibold text-end">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {isLoading ? (
//                 <tr>
//                   <td colSpan={5} className="text-center py-5">
//                     <div className="spinner-border text-primary" role="status">
//                       <span className="visually-hidden">Loading...</span>
//                     </div>
//                     <p className="mt-2 text-muted">Fetching employees...</p>
//                   </td>
//                 </tr>
//               ) : filteredEmployees.length === 0 ? (
//                 <tr>
//                   <td colSpan={5} className="text-center py-5 text-muted">
//                     No employees found.
//                   </td>
//                 </tr>
//               ) : (
//                 //changed from CombinedEmployee to Employee
//                 filteredEmployees.map((employee: Employee) => (
//                   <tr key={employee.id}>
//                     <td className="ps-4 py-3">
//                       <div className="d-flex align-items-center gap-3">
//                         <span className="fw-medium">{employee.name}</span>
//                       </div>
//                     </td>
//                     <td className="py-3 text-muted">{employee.email}</td>
//                     <td className="py-3 text-muted">{employee.department}</td>
//                     <td className="py-3">
//                       <span className={`badge ${
//                         employee.status === "active" 
//                           ? "bg-success bg-opacity-10 text-success" 
//                           : employee.status === "pending"
//                           ? "bg-warning bg-opacity-10 text-warning"
//                           : "bg-danger bg-opacity-10 text-danger"
//                       }`}>
//                         {employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
//                       </span>
//                     </td>
//                     <td className="py-3 text-end">
//                       <div className="d-flex justify-content-end gap-2">
//                         <button
//                           className={`btn btn-sm ${
//                             employee.status === "inactive"
//                               ? "btn-outline-success"
//                               : "btn-outline-warning"
//                           }`}
//                           disabled
//                         >
//                           {employee.status === "inactive" ? "Reactivate" : "Deactivate"}
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//         {/* Pagination */}
//         <div className="d-flex justify-content-between align-items-center mt-3">
//           <div className="text-muted">
//             Showing {filteredEmployees.length} of {employees.length} employees
//           </div>
//           <div className="d-flex gap-2">
//             <button className="btn btn-sm btn-outline-secondary">Previous</button>
//             <button className="btn btn-sm btn-outline-secondary">Next</button>
//           </div>
//         </div>
//     </>
//   );
// };


// // tanstack begins here

// const columnHelper = createColumnHelper<Person>()

// const columns = [
//   columnHelper.accessor('firstName', {
//     cell: info => info.getValue(),
//     footer: info => info.column.id,
//   }),
//   columnHelper.accessor(row => row.lastName, {
//     id: 'lastName',
//     cell: info => <i>{info.getValue()}</i>,
//     header: () => <span>Last Name</span>,
//     footer: info => info.column.id,
//   }),
//   columnHelper.accessor('age', {
//     header: () => 'Age',
//     cell: info => info.renderValue(),
//     footer: info => info.column.id,
//   }),
//   columnHelper.accessor('visits', {
//     header: () => <span>Visits</span>,
//     footer: info => info.column.id,
//   }),
//   columnHelper.accessor('status', {
//     header: 'Status',
//     footer: info => info.column.id,
//   }),
//   columnHelper.accessor('progress', {
//     header: 'Profile Progress',
//     footer: info => info.column.id,
//   }),
// ]

// function App() {
//   const [data, _setData] = React.useState(() => [...defaultData])
//   const rerender = React.useReducer(() => ({}), {})[1]

//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//   })

//   return (
//     <div className="p-2">
//       <table>
//         <thead>
//           {table.getHeaderGroups().map(headerGroup => (
//             <tr key={headerGroup.id}>
//               {headerGroup.headers.map(header => (
//                 <th key={header.id}>
//                   {header.isPlaceholder
//                     ? null
//                     : flexRender(
//                         header.column.columnDef.header,
//                         header.getContext()
//                       )}
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody>
//           {table.getRowModel().rows.map(row => (
//             <tr key={row.id}>
//               {row.getVisibleCells().map(cell => (
//                 <td key={cell.id}>
//                   {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//         <tfoot>
//           {table.getFooterGroups().map(footerGroup => (
//             <tr key={footerGroup.id}>
//               {footerGroup.headers.map(header => (
//                 <th key={header.id}>
//                   {header.isPlaceholder
//                     ? null
//                     : flexRender(
//                         header.column.columnDef.footer,
//                         header.getContext()
//                       )}
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </tfoot>
//       </table>
//       <div className="h-4" />
//       <button onClick={() => rerender()} className="border p-2">
//         Rerender
//       </button>
//     </div>
//   )
// }

// const rootElement = document.getElementById('root')
// if (!rootElement) throw new Error('Failed to find the root element')

// ReactDOM.createRoot(rootElement).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// )

// export default EmployeeTable;

import React, { useState, useEffect, useMemo } from "react";
import { Search } from "lucide-react";
import { Employee } from "../../../types/employer";
import { useDispatch, useSelector } from "react-redux";
import { 
  fetchEmployeeInvites, 
  clearEmployerError, 
  fetchEmployees,
  // You will need to import your toggle status actions here:
  // deactivateEmployee, 
  // activateEmployee, 
} from '../../../store/slices/EmployerSlice';
import { RootState } from "../../../store/store";
import { useToast } from "../../../hooks/use-toast"; 

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  ColumnFiltersState,
} from '@tanstack/react-table';

interface EmployeeTableProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  employees: Employee[];
  companyId?: string;
}

// Define the custom color for the "Reactivate" action
const CUSTOM_SUCCESS_COLOR = '#22C55E';

const EmployeeTable = ({ searchQuery, onSearchChange, employees, companyId }: EmployeeTableProps) => {
  const dispatch = useDispatch<any>(); 
  const { toast } = useToast();
  
  const employerSelector = useMemo(() => (state: RootState) => ({
    isLoading: state.employer.isLoading,
    isActionLoading: state.employer.isActionLoading,
    error: state.employer.error,
  }), []);

  const { isLoading, isActionLoading, error } = useSelector(employerSelector);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  // 1. New function to handle the status toggle click
  const handleToggleStatus = (employee: Employee) => {
      const nextStatus = employee.status === 'inactive' ? 'active' : 'inactive';
      
      // Prevent action if another action is already loading
      if (isActionLoading) return;
      
      //  Dispatch the appropriate thunk based on the next status
      // You must implement these thunks in your EmployerSlice!
      
      // if (nextStatus === 'active') {
      //   dispatch(activateEmployee({ employeeId: employee.id, companyId }));
      // } else {
      //   dispatch(deactivateEmployee({ employeeId: employee.id, companyId }));
      // }
      
      //  Placeholder toast for demonstration without implemented thunks
      toast({
          message: `Attempting to change status of ${employee.name} to ${nextStatus}...`,
          duration: 3000,
      });

  };

  const columnHelper = createColumnHelper<Employee>();

  const columns = [
    columnHelper.accessor('name', {
      header: () => 'Name',
      cell: info => info.getValue() || 'N/A',
      filterFn: 'includesString',
    }),
    columnHelper.accessor('emailAddress', {
      header: () => 'Email',
      cell: info => info.getValue() || 'N/A',
    }),
    columnHelper.accessor('department', {
      header: () => 'Department',
      cell: info => info.getValue() || 'N/A',
    }),
    columnHelper.accessor('status', {
      header: () => 'Status',
      cell: info => {
        const status = info.getValue();

        const statusStyles = status === "active"
          ? { backgroundColor: 'rgba(34, 197, 94, 0.1)', color: '#22C55E', borderColor: '#22C55E' }
          : status === "pending" || status === "accepted"
          ? { backgroundColor: 'rgba(233, 236, 239, 0.5)', color: '#6c757d', borderColor: '#6c757d' }
          : { backgroundColor: 'rgba(173, 181, 189, 0.5)', color: '#495057', borderColor: '#495057' };

        return (
          <span className="badge" style={statusStyles}>
            {status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Unknown'}
          </span>
        );
      },
    }),
    columnHelper.display({
      id: 'actions',
      header: () => 'Actions',
      cell: ({ row }) => {
        // Determine if the employee is currently inactive (button will show "Reactivate")
        const isInactive = row.original.status === "inactive";
        
        // The button text is the action to be performed
        const buttonText = isInactive ? "Reactivate" : "Deactivate";

        // Determine the base class for the button
        const buttonClass = isInactive 
          ? "btn-outline-success" // Reactivate uses success
          : "btn-outline-secondary"; // Deactivate uses secondary

        // Define inline style to use the custom green for "Reactivate" and grey for deactivate
        const buttonStyle = isInactive
          ? { borderColor: CUSTOM_SUCCESS_COLOR, color: CUSTOM_SUCCESS_COLOR }
          : { borderColor: '#adb5bd', color: '#495057' };

        return (
        <div className="d-flex justify-content-end gap-2">
          <button
            className={`btn btn-sm ${buttonClass}`}
            style={buttonStyle}
            onClick={() => handleToggleStatus(row.original)} // 2. Add the onClick handler
            disabled={isActionLoading}
          >
            {buttonText}
          </button>
        </div>
      );
      },
    }),
  ];

  // Initialize table
  const table = useReactTable({
    data: employees,
    columns,
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // Fetch employees on component mount
  useEffect(() => {
    dispatch(fetchEmployees() as any); 
  }, [dispatch]);

  // Handle errors
  useEffect(() => {
    if (error) {
      toast({
        message: `Error: ${error}`,
        duration: 5000,
      });
      dispatch(clearEmployerError());
    }
  }, [error, toast, dispatch]);

  // Apply search filter
  useEffect(() => {
    table.getColumn('name')?.setFilterValue(searchQuery);
  }, [searchQuery, table]);

  return (
    <div className="p-4 pt-0">
      {/* Search Section */}
      <div className="row mb-3">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <div className="position-relative" style={{ width: "300px" }}>
              {/* The Search icon from lucide-react is correctly placed here */}
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

      {/* Table */}
      <div className="table-responsive border rounded">
        <table className="table table-hover mb-0">
          <thead className="bg-light">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} className="border-0 py-3 text-muted fw-semibold">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-2 text-muted">Fetching employees...</p>
                </td>
              </tr>
            ) : table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-5 text-muted">
                  No employees found.
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="py-3">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <div className="text-muted">
          Showing {table.getFilteredRowModel().rows.length} of{' '}
          {employees.length} employees
        </div>
        <div className="d-flex gap-2">
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </button>
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeTable;
