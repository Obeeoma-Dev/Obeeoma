import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import { Modal, Button, Spinner } from "react-bootstrap";
import {
  fetchEmployees,
  deleteEmployee,
  toggleEmployeeStatus,
} from "../../../store/slices/EmployerSlice";
import { Employee } from "../../../types/employer";
import { RootState, AppDispatch } from "../../../store/store";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  ColumnFiltersState,
} from "@tanstack/react-table";

const EmployeeTable = ({ employees }: { employees: Employee[] }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isActionLoading } = useSelector((state: RootState) => state.employer);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState<"success" | "error">("success");

  // Handlers for API Calls
  const handleToggleStatus = async (id: number, currentStatus: string) => {
    try {
      await dispatch(
        toggleEmployeeStatus({ id: id.toString(), currentStatus }),
      ).unwrap();
      setModalMessage("Status updated successfully");
      setModalType("success");
    } catch (error) {
      setModalMessage("Failed to update status");
      setModalType("error");
    }
    setShowModal(true);
  };

  const handleDelete = useCallback(
    async (id: number) => {
      if (
        window.confirm(
          "Are you sure you want to delete this employee? This action cannot be undone.",
        )
      ) {
        try {
          await dispatch(deleteEmployee(id.toString())).unwrap();
          setModalMessage("Employee deleted successfully");
          setModalType("success");
        } catch (error: unknown) {
          setModalMessage("Failed to delete employee");
          setModalType("error");
        }
        setShowModal(true);
      }
    },
    [dispatch],
  );

  const columnHelper = createColumnHelper<Employee>();

  const columns = [
    columnHelper.accessor("emailAddress", {
      header: "Email",
      cell: (info) => info.getValue() || "N/A",
      meta: { filterVariant: "text" },
    }),
    columnHelper.accessor("employeedepartment", {
      header: "Department",
      cell: (info) => info.getValue() || "N/A",
      meta: { filterVariant: "text" },
    }),

    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => {
        const status = info.getValue();

        // Changed 'let' to 'const' here
        const backgroundColor = status === "active" ? "#22C55E" : "#b4beb9dc";

        return (
          <span className="badge text-white" style={{ backgroundColor }}>
            {status ? status.toUpperCase() : "N/A"}
          </span>
        );
      },
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="d-flex justify-content-end align-items-center gap-2">
          <button
            className={`btn btn-sm ${row.original.status === "inactive" ? "btn-outline-success" : "btn-outline-secondary"}`}
            onClick={() =>
              handleToggleStatus(row.original.id, row.original.status)
            }
            disabled={isActionLoading}
          >
            {isActionLoading ? (
              <Spinner size="sm" />
            ) : row.original.status === "inactive" ? (
              "Reactivate"
            ) : (
              "Deactivate"
            )}
          </button>

          <Dropdown align="end">
            <Dropdown.Toggle
              as="button"
              className="btn btn-sm p-1 border-0 shadow-none no-caret bg-transparent"
            >
              <i className="bi bi-three-dots-vertical fs-5 text-dark"></i>
            </Dropdown.Toggle>

            <Dropdown.Menu className="shadow border-0 dropdown-menu-custom">
              <Dropdown.Item className="py-2">
                <i className="bi bi-eye me-2 text-secondary"></i> View
              </Dropdown.Item>
              <Dropdown.Item className="py-2">
                <i className="bi bi-pencil me-2 text-secondary"></i> Update
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item
                className="py-2 text-secondary"
                onClick={() => handleDelete(row.original.id)}
              >
                <i className="bi bi-trash me-2"></i> Delete
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data: employees,
    columns,
    state: { columnFilters },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <style>
        {`
          .table-responsive { overflow: visible !important; padding-bottom: 100px; }
          .no-caret::after { display: none !important; }
          .dropdown-menu-custom { min-width: 150px; z-index: 1060; }
          tr, td { position: static !important; }
        `}
      </style>

      <div className="table-responsive p-3">
        <table className="table table-hover">
          <thead className="bg-light">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="py-3">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                    {header.column.getCanFilter() && (
                      <input
                        className="form-control form-control-sm mt-2"
                        placeholder="Search..."
                        onChange={(e) =>
                          header.column.setFilterValue(e.target.value)
                        }
                      />
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="py-3 align-middle">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalType === "success" ? "Success" : "Error"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EmployeeTable;
