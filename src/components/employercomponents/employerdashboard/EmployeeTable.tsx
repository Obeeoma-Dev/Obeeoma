import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import { Modal, Button, Spinner } from "react-bootstrap";
import * as yup from "yup";
import { updateEmployeeValidationSchema } from "../../../validation/authValidation";
import {
  deleteEmployee,
  toggleEmployeeStatus,
  updateEmployee,
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
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null,
  );
  const [viewMode, setViewMode] = useState<"table" | "view" | "update">(
    "table",
  );

  const [formData, setFormData] = useState<Partial<Employee>>({});
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const THEME_COLOR = "#22C55E";

  // 1. FIXED INITIALIZATION: Ensure null values from backend become empty strings
  useEffect(() => {
    if (selectedEmployee && viewMode === "update") {
      setFormData({
        emailAddress: selectedEmployee.emailAddress || "",
        employeedepartment: selectedEmployee.employeedepartment || "",
        phoneNumber: selectedEmployee.phoneNumber || "",
        status: selectedEmployee.status || "active",
      });
    }
  }, [selectedEmployee, viewMode]);

  const handleBackToTable = () => {
    setSelectedEmployee(null); 
    setViewMode("table");
    setFormData({});
    setValidationErrors({});
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!selectedEmployee) return;

    // DEBUG: Check this log in your browser console!
    console.log("Payload being sent to Django:", {
      id: selectedEmployee.id,
      ...formData,
    });

    try {
      await updateEmployeeValidationSchema.validate(formData, {
        abortEarly: false,
      });
      setValidationErrors({});

      // Connect the text in that form to localStorage as localData
      const localData = { ...selectedEmployee, ...formData };
      localStorage.setItem("localData", JSON.stringify(localData));

      // 2. DISPATCH: Explicitly pass the ID and the form data
      await dispatch(
        updateEmployee({
          id: selectedEmployee.id,
          emailAddress: formData.emailAddress,
          employeedepartment: formData.employeedepartment,
          status: formData.status,
        }),
      ).unwrap();

      setModalMessage("Employee updated successfully");
      setModalType("success");
      setShowModal(true);
      handleBackToTable();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err instanceof yup.ValidationError) {
        const mappedErrors: Record<string, string> = {};
        err.inner.forEach((error) => {
          if (error.path) mappedErrors[error.path] = error.message;
        });
        setValidationErrors(mappedErrors);
      } else {
        setModalMessage(err || "Failed to update employee");
        setModalType("error");
        setShowModal(true);
      }
    }
  };

  const handleToggleStatus = async (id: number, currentStatus: string) => {
    try {
      await dispatch(
        toggleEmployeeStatus({ id: id.toString(), currentStatus }),
      ).unwrap();
      setModalMessage("Status updated successfully");
      setModalType("success");
    } catch {
      setModalMessage("Failed to update status");
      setModalType("error");
    }
    setShowModal(true);
  };

  const handleDelete = useCallback(
    async (id: number) => {
      if (window.confirm("Are you sure?")) {
        try {
          await dispatch(deleteEmployee(id.toString())).unwrap();
          setModalMessage("Deleted successfully");
          setModalType("success");
        } catch {
          setModalMessage("Error deleting");
          setModalType("error");
        }
        setShowModal(true);
      }
    },
    [dispatch],
  );

  const columnHelper = createColumnHelper<Employee>();
  const columns = [
    columnHelper.accessor("emailAddress", { header: "Email" }),
    columnHelper.accessor("employeedepartment", {
      header: "Department",
      cell: (info) =>
        info.getValue() || (
          <span className="text-muted italic">Not Assigned</span>
        ),
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => (
        <span
          className="badge text-white"
          style={{
            backgroundColor:
              info.getValue() === "active" ? THEME_COLOR : "#b4beb9dc",
          }}
        >
          {(info.getValue() || "N/A").toUpperCase()}
        </span>
      ),
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="d-flex justify-content-end align-items-center gap-2">
          <button
            className="btn btn-sm"
            style={{
              color:
                row.original.status === "inactive" ? THEME_COLOR : "#6c757d",
              borderColor:
                row.original.status === "inactive" ? THEME_COLOR : "#6c757d",
            }}
            onClick={() =>
              handleToggleStatus(row.original.id, row.original.status)
            }
          >
            {row.original.status === "inactive" ? "Reactivate" : "Deactivate"}
          </button>
          <Dropdown align="end">
            <Dropdown.Toggle
              as="button"
              className="btn btn-sm p-1 border-0 no-caret bg-transparent"
            >
              <i className="bi bi-three-dots-vertical fs-5 text-dark"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu className="shadow border-0">
              <Dropdown.Item
                onClick={() => {
                  setSelectedEmployee(row.original);
                  setViewMode("view");
                }}
              >
                View
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setSelectedEmployee(row.original);
                  setViewMode("update");
                }}
              >
                Update
              </Dropdown.Item>
              <Dropdown.Item
                className="text-secondary"
                onClick={() => handleDelete(row.original.id)}
              >
                Delete
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

  if (viewMode === "view" && selectedEmployee) {
    return (
      <div className="p-4">
        <button
          className="btn p-0 mb-3 border-0"
          style={{ color: THEME_COLOR }}
          onClick={handleBackToTable}
        >
          <i className="bi bi-arrow-left"></i> Back to List
        </button>
        <h3>Employee Summary</h3>
        <div className="card p-3 shadow-sm border-0">
          <p>
            <strong>Email:</strong> {selectedEmployee.emailAddress}
          </p>
          <p>
            <strong>Department:</strong>{" "}
            {selectedEmployee.employeedepartment || "N/A"}
          </p>
          <p>
            <strong>Status:</strong> {selectedEmployee.status}
          </p>
        </div>
      </div>
    );
  }

  if (viewMode === "update" && selectedEmployee) {
    return (
      <div className="p-4" style={{ maxWidth: "900px" }}>
        <button
          className="btn btn-link p-0 mb-4 text-decoration-none d-flex align-items-center gap-2"
          style={{ color: THEME_COLOR }}
          onClick={handleBackToTable}
        >
          <i className="bi bi-arrow-left"></i> Back to Employee Table
        </button>

        <div className="card shadow-sm border-0 rounded-4">
          <div className="card-body p-4">
            <h4 className="fw-bold mb-4">Edit Employee</h4>

            <div className="mb-3 w-100 text-start">
              <label className="form-label small fw-bold">EMAIL ADDRESS</label>
              <input
                type="email"
                name="emailAddress"
                className={`form-control ${validationErrors.emailAddress ? "is-invalid" : ""}`}
                value={formData.emailAddress || ""}
                onChange={handleInputChange}
              />
              <div className="invalid-feedback">
                {validationErrors.emailAddress}
              </div>
            </div>

            <div className="mb-3 w-100 text-start">
              <label className="form-label small fw-bold">DEPARTMENT</label>
              <input
                type="text"
                name="employeedepartment"
                className={`form-control ${validationErrors.employeedepartment ? "is-invalid" : ""}`}
                value={formData.employeedepartment || ""}
                onChange={handleInputChange}
              />
              <div className="invalid-feedback">
                {validationErrors.employeedepartment}
              </div>
            </div>

            <div className="mb-4 w-100 text-start">
              <label className="form-label small fw-bold">STATUS</label>
              <select
                name="status"
                className={`form-select ${validationErrors.status ? "is-invalid" : ""}`}
                value={formData.status || ""}
                onChange={handleInputChange}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
                <option value="N/A">N/A</option>
              </select>
              <div className="invalid-feedback">{validationErrors.status}</div>
            </div>

            <Button
              className="w-100 py-2 fs-5 border-0 shadow-sm"
              style={{ backgroundColor: THEME_COLOR }}
              onClick={handleSave}
              disabled={isActionLoading}
            >
              {isActionLoading ? (
                <>
                  <Spinner size="sm" className="me-2" /> Updating...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`.no-caret::after { display: none !important; }`}</style>
      <div className="table-responsive p-3">
        <table className="table table-hover">
          <thead className="bg-light">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((h) => (
                  <th key={h.id} className="py-3">
                    {flexRender(h.column.columnDef.header, h.getContext())}
                    {h.column.getCanFilter() && (
                      <input
                        className="form-control form-control-sm mt-2"
                        placeholder="Search..."
                        onChange={(e) =>
                          h.column.setFilterValue(e.target.value)
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

      <div className="d-flex justify-content-between align-items-center mt-3 pb-4 px-3">
        <div className="text-muted">
          Showing {table.getFilteredRowModel().rows.length} of{" "}
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
