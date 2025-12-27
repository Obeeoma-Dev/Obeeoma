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

  // State for form fields
  const [formData, setFormData] = useState<Partial<Employee>>({});
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const THEME_COLOR = "#22C55E";

  // Initialize form data when entering update mode
  useEffect(() => {
    if (selectedEmployee && viewMode === "update") {
      setFormData({
        emailAddress: selectedEmployee.emailAddress,
        employeedepartment: selectedEmployee.employeedepartment,
        status: selectedEmployee.status,
      });
    }
  }, [selectedEmployee, viewMode]);

  const handleBackToTable = () => {
    setSelectedEmployee(null);
    setViewMode("table");
    setFormData({});
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!selectedEmployee) return;

    try {
      // Validate using the Yup schema
      await updateEmployeeValidationSchema.validate(formData, {
        abortEarly: false,
      });

      // Clear previous errors if validation passes
      setValidationErrors({});

      //Dispatch the thunk
      await dispatch(
        updateEmployee({
          id: selectedEmployee.id,
          ...formData,
        }),
      ).unwrap();

      // 3. Success handling
      setModalMessage("Employee updated successfully");
      setModalType("success");
      setShowModal(true);
      handleBackToTable();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err instanceof yup.ValidationError) {
        //  Yup errors to the validationErrors state
        const mappedErrors: Record<string, string> = {};
        err.inner.forEach((error) => {
          if (error.path) mappedErrors[error.path] = error.message;
        });
        setValidationErrors(mappedErrors);
      } else {
        //  Handle API or unexpected errors
        setModalMessage(err || "Failed to update employee");
        setModalType("error");
        setShowModal(true);
      }
    }
  };
  // const handleSave = async () => {
  //   if (!selectedEmployee) return;

  //   try {
  //     // Logic for dispatching the update
  //    await dispatch(
  //     updateEmployee({
  //       id: selectedEmployee.id,
  //       ...formData,
  //     })
  //   ).unwrap();

  //     setModalMessage("Employee updated successfully");
  //     setModalType("success");
  //     setShowModal(true);
  //     handleBackToTable(); // Return to table on success
  //   } catch (error) {
  //     setModalMessage("Failed to update employee");
  //     setModalType("error");
  //     setShowModal(true);
  //   }
  // };

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

  // ... (handleDelete and Columns remain the same as your provided code)
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
    columnHelper.accessor("employeedepartment", { header: "Department" }),
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
                View{" "}
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setSelectedEmployee(row.original);
                  setViewMode("update");
                }}
              >
                Update{" "}
              </Dropdown.Item>
              <Dropdown.Item
                className="text-danger"
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

  // --- VIEW SUMMARY ---
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
            <strong>Department:</strong> {selectedEmployee.employeedepartment}
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
      <div className="p-4 btn p-0 mb-3 border-0" style={{ maxWidth: "900px" }}>
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

            {/* Email Input */}
            <div className="mb-2 w-100 text-start">
              <label className="form-label small fw-bold">EMAIL ADDRESS</label>
              <input
                type="email"
                name="emailAddress"
                className={`form-control py-2 ${validationErrors.emailAddress ? "is-invalid" : ""}`}
                value={formData.emailAddress || ""}
                onChange={handleInputChange}
              />
              <div className="invalid-feedback">
                {validationErrors.emailAddress}
              </div>
            </div>

            {/* Department Input */}
            <div className="mb-2 w-100 text-start">
              <label className="form-label small fw-bold">DEPARTMENT</label>
              <input
                type="text"
                name="employeedepartment"
                className={`form-control py-2 ${validationErrors.employeedepartment ? "is-invalid" : ""}`}
                value={formData.employeedepartment || ""}
                onChange={handleInputChange}
              />
              <div className="invalid-feedback">
                {validationErrors.employeedepartment}
              </div>
            </div>

            {/* Status Select */}
            <div className=" mb-2 w-100 text-start">
              <label className="form-label small  fw-semibold mb-2">
                STATUS
              </label>
              <select
                name="status"
                className={`form-select py-2 ${validationErrors.status ? "is-invalid" : ""}`}
                value={formData.status || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    status: e.target.value as any,
                  }))
                }
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

  // --- UPDATE FORM ---
  // if (viewMode === "update" && selectedEmployee) {
  //   return (
  //     <div className="p-4">
  //       <button className="btn p-0 mb-3 border-0" style={{ color: THEME_COLOR }} onClick={handleBackToTable}>
  //         <i className="bi bi-arrow-left"></i> Cancel
  //       </button>
  //       <h3>Update Employee</h3>
  //       <div className="card p-4 shadow-sm border-0">
  //         <div className="mb-3">
  //           <label className="form-label">Email</label>
  //           <input type="text" name="emailAddress" className="form-control" value={formData.emailAddress || ""} onChange={handleInputChange} />
  //         </div>
  //         <div className="mb-3">
  //           <label className="form-label">Department</label>
  //           <input type="text" name="employeedepartment" className="form-control" value={formData.employeedepartment || ""} onChange={handleInputChange} />
  //         </div>
  //         <div className="mb-3">
  //           <label className="form-label">Status</label>
  //           <input type="text" name="status" className="form-control" value={formData.status || ""} onChange={handleInputChange} />
  //         </div>
  //         <Button
  //           style={{ backgroundColor: THEME_COLOR, borderColor: THEME_COLOR }}
  //           onClick={handleSave}
  //           disabled={isActionLoading}
  //         >
  //           {isActionLoading ? <Spinner size="sm" /> : "Save Changes"}
  //         </Button>
  //       </div>
  //     </div>
  //   );

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

      {/* Pagination */}
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
