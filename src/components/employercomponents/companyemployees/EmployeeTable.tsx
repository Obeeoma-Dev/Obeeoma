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
        <div className="col-12 p-3">
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
