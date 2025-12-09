import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { 
  fetchEmployeeInvites, 
  clearEmployerError,
  fetchEmployees 
} from '../../../store/slices/EmployerSlice';
import { Employee } from "../../../types/employer";
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
import { json } from "zod";

// Define the required structure of the data received from the Redux state
interface EmployerStateSubset {
  employees: Employee[];
  isLoading: boolean;
  isActionLoading: boolean;
  error: string | null;
}

interface EmployeeTableProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  employees: Employee[];
  companyId?: string;
}

const EmployeeTable = ({ searchQuery, onSearchChange, employees }: EmployeeTableProps) => {
console.log(employees);
    const dispatch = useDispatch();

  const { toast } = useToast();
  
  // Redux state
  const { isLoading, isActionLoading, error } = useSelector(
    (state: RootState): EmployerStateSubset => ({
      employees: state.employer.employees,
      isLoading: state.employer.isLoading,
      isActionLoading: state.employer.isActionLoading,
      error: state.employer.error,
    })
  );

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  // Define columns using TanStack Table
  const columnHelper = createColumnHelper<Employee>();

  const columns = [
    columnHelper.accessor('emailAddress', {
      header: () => 'Email',
      cell: info => info.getValue() || 'N/A',
      footer: info => info.column.id,
    }),
    columnHelper.accessor('department', {
      header: () => 'Department',
      cell: info => info.getValue() || 'N/A',
      footer: info => info.column.id,
    }),
    columnHelper.accessor('status', {
      header: () => 'Status',
      cell: info => {
        const status = info.getValue();
        const statusClass = status === "active" 
          ? "bg-success bg-opacity-10 text-success" 
          : status === "pending" || status === "accepted"
          ? "bg-warning bg-opacity-10 text-warning"
          : "bg-danger bg-opacity-10 text-danger";
        
        return (
          <span className={`badge ${statusClass}`}>
            {status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Unknown'}
          </span>
        );
      },
      footer: info => info.column.id,
    }),
    columnHelper.display({
      id: 'actions',
      header: () => 'Actions',
      cell: ({ row }) => (
        <div className="d-flex justify-content-end gap-2">
          <button
            className={`btn btn-sm ${
              row.original.status === "inactive"
                ? "btn-outline-success"
                : "btn-outline-warning"
            }`}
            disabled={isActionLoading}
          >
            {row.original.status === "inactive" ? "Reactivate" : "Deactivate"}
          </button>
        </div>
      ),
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
    if (searchQuery) {
      table.getColumn('name')?.setFilterValue(searchQuery);
    } else {
      // Clear all filters when search query is empty
      table.setColumnFilters([]);
    }
  }, [searchQuery, table]);

  return (
    <>
      {/* Table */}
      <div className="table-responsive">
        <table className="table table-hover mb-0 px-3">
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
    </>
  );
};

export default EmployeeTable;
