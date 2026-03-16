import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { RootState } from "../../store/store";
import {
  updateEmployeeLocal,
  deleteEmployeeLocal,
  updateEmployee,
  deleteEmployee,
  toggleEmployeeStatus,
  fetchEmployees,
} from "../../store/slices/EmployerSlice";
import Layout from "../../components/employercomponents/shared/Layout";
import AddEmployeeForm from "../../components/employercomponents/companyemployees/AddEmployeeForm";
import {
  Table,
  Badge,
  Button,
  Modal,
  Form,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import { Eye, PencilSquare, Trash, PersonPlus } from "react-bootstrap-icons";

interface Employee {
  id: number;
  emailAddress: string;
  employeedepartment: string;
  status: "active" | "inactive";
  [key: string]: string | number | boolean;
}

const EmployeeManagement = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [searchQuery, setSearchQuery] = useState("");
  const [viewModalId, setViewModalId] = useState<number | null>(null);
  const [editModalId, setEditModalId] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<Employee>>({});
  const [statusChangeId, setStatusChangeId] = useState<number | null>(null);
  const [statusChangeAction, setStatusChangeAction] = useState<
    "activate" | "deactivate" | null
  >(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [bulkConfirmAction, setBulkConfirmAction] = useState<
    "activate_all" | "deactivate_all" | "delete_all" | null
  >(null);
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(10);

  const { employees, isLoading } = useSelector(
    (state: RootState) => state.employer,
  );

  // Fetch employees on component mount
  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const displayEmployees = (employees || []) as Employee[];

  /* =======================
     SEARCH FILTER
  ======================== */
  const filteredEmployees = (displayEmployees || []).filter(
    (emp) =>
      emp.emailAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.employeedepartment.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedEmployees = filteredEmployees.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  /* =======================
     GET EMPLOYEE BY ID
  ======================== */
  const getEmployeeById = (id: number): Employee | undefined => {
    return displayEmployees.find((emp) => emp.id === id);
  };

  /* =======================
     VIEW MODAL HANDLERS
  ======================== */
  const handleView = (id: number) => {
    setViewModalId(id);
  };

  const closeViewModal = () => {
    setViewModalId(null);
  };

  /* =======================
     EDIT MODAL HANDLERS
  ======================== */
  const handleEdit = (id: number) => {
    const employee = getEmployeeById(id);
    if (employee) {
      setEditFormData({ ...employee });
      setEditModalId(id);
    }
  };

  const closeEditModal = () => {
    setEditModalId(null);
    setEditFormData({});
  };

  const handleEditFieldChange = (
    field: string,
    value: string | number | boolean,
  ) => {
    setEditFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const saveEditChanges = async () => {
    console.log("=== SAVE CLICKED ===");
    console.log("editModalId:", editModalId);
    console.log("editFormData:", editFormData);

    if (editModalId === null) {
      console.error("❌ Missing editModalId");
      return;
    }

    console.log("✓ editModalId exists:", editModalId);
    console.log("Dispatching updateEmployeeLocal with:", {
      id: editModalId,
      ...editFormData,
    });

    try {
      // optimistic local update
      dispatch(updateEmployeeLocal({ id: editModalId, ...editFormData }));
      console.log("✓ Local update dispatched");

      // persist to API and wait for result
      console.log("Calling updateEmployee API with payload:", {
        id: editModalId,
        ...editFormData,
      });
      const result = await dispatch(
        updateEmployee({ id: editModalId, ...editFormData }),
      );

      console.log("API Result received:", result);

      // Check if API call was successful
      if (result.type === updateEmployee.fulfilled.type) {
        console.log("✓ API update successful:", result.payload);
        alert("Employee updated successfully!");
      } else if (result.type === updateEmployee.rejected.type) {
        console.error("❌ API update failed:", result.payload);
        alert("Failed to update employee: " + result.payload);
      }
    } catch (error) {
      console.error("❌ Error saving changes:", error);
      alert(
        "Error: " + (error instanceof Error ? error.message : "Unknown error"),
      );
    } finally {
      console.log("Closing modal");
      closeEditModal();
    }
  };

  /* =======================
     ACTIVATE/DEACTIVATE HANDLERS
  ======================== */
  const handleActivate = (id: number) => {
    setStatusChangeId(id);
    setStatusChangeAction("activate");
  };

  const handleDeactivate = (id: number) => {
    setStatusChangeId(id);
    setStatusChangeAction("deactivate");
  };

  const confirmStatusChange = () => {
    if (statusChangeId !== null) {
      console.log("confirmStatusChange dispatching", {
        id: statusChangeId,
        status: statusChangeAction,
      });
      const newStatus =
        statusChangeAction === "activate" ? "active" : "inactive";

      // optimistic local update
      dispatch(updateEmployeeLocal({ id: statusChangeId, status: newStatus }));
      console.log("✓ Local status update dispatched");

      // call API toggle
      const result = dispatch(
        toggleEmployeeStatus({
          id: String(statusChangeId),
          currentStatus:
            statusChangeAction === "activate" ? "inactive" : "active",
        }),
      );
      console.log("✓ API toggle status called:", result);
    }
    closeStatusChangeModal();
  };

  const closeStatusChangeModal = () => {
    setStatusChangeId(null);
    setStatusChangeAction(null);
  };

  /* =======================
     DELETE HANDLERS
  ======================== */
  const handleDelete = (id: number) => {
    setDeleteConfirmId(id);
  };

  const confirmDelete = () => {
    if (deleteConfirmId !== null) {
      console.log("confirmDelete dispatching", deleteConfirmId);
      // optimistic local delete
      dispatch(deleteEmployeeLocal(deleteConfirmId));
      console.log("✓ Local delete dispatched");

      // persist delete
      const result = dispatch(deleteEmployee(String(deleteConfirmId)));
      console.log("✓ API delete called:", result);
    }
    closeDeleteModal();
  };

  const closeDeleteModal = () => {
    setDeleteConfirmId(null);
  };

  /* =======================
     BULK ACTION HANDLERS
  ======================== */
  const handleBulkActivateAll = () => {
    setBulkConfirmAction("activate_all");
  };

  const handleBulkDeactivateAll = () => {
    setBulkConfirmAction("deactivate_all");
  };

  const handleBulkDeleteAll = () => {
    setBulkConfirmAction("delete_all");
  };

  const confirmBulkAction = async () => {
    if (!bulkConfirmAction) return;

    try {
      if (bulkConfirmAction === "activate_all") {
        console.log("Activating all employees");
        for (const emp of filteredEmployees) {
          if (emp.status !== "active") {
            await dispatch(
              toggleEmployeeStatus({
                id: String(emp.id),
                currentStatus: emp.status,
              }),
            ).unwrap();
          }
        }
      } else if (bulkConfirmAction === "deactivate_all") {
        console.log("Deactivating all employees");
        for (const emp of filteredEmployees) {
          if (emp.status !== "inactive") {
            await dispatch(
              toggleEmployeeStatus({
                id: String(emp.id),
                currentStatus: emp.status,
              }),
            ).unwrap();
          }
        }
      } else if (bulkConfirmAction === "delete_all") {
        console.log("Deleting all employees");
        for (const emp of filteredEmployees) {
          await dispatch(deleteEmployee(String(emp.id))).unwrap();
        }
      }
      console.log("Bulk action completed successfully");
    } catch (error) {
      console.error("Bulk action failed:", error);
      alert("Some operations failed. Please refresh and try again.");
    }

    closeBulkConfirmModal();
  };

  const closeBulkConfirmModal = () => {
    setBulkConfirmAction(null);
  };

  const handleAddEmployee = () => {
    setShowAddEmployeeModal(true);
  };

  const closeAddEmployeeModal = () => {
    setShowAddEmployeeModal(false);
  };

  return (
    <Layout title="Employee Management Portal">
      <div className="container-fluid py-4 px-3">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="h4 mb-0 fw-bold">Corporate Employee List</h2>
        </div>
        <div className="card border-0 shadow-sm">
          <div className="card-body">
            {/* HEADER */}

            <div className="d-flex gap-3 align-items-center">
              <input
                type="text"
                className="form-control"
                style={{ width: "300px" }}
                placeholder="Search employees..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              <Button
                size="sm"
                onClick={handleAddEmployee}
                className="d-flex align-items-center gap-2"
                style={{
                  backgroundColor: "#22C55E",
                  borderColor: "#22C55E",
                  color: "white",
                }}
              >
                <PersonPlus size={16} />
                Add Employee
              </Button>

              <DropdownButton
                id="bulk-actions-dropdown"
                title="Actions"
                variant="outline-secondary"
                size="sm"
              >
                <Dropdown.Item onClick={handleBulkActivateAll}>
                  Activate All
                </Dropdown.Item>
                <Dropdown.Item onClick={handleBulkDeactivateAll}>
                  Deactivate All
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  onClick={handleBulkDeleteAll}
                  className="text-secondary"
                >
                  Delete All
                </Dropdown.Item>
              </DropdownButton>
            </div>
          </div>

          {/* TABLE */}
          <Table hover responsive className="align-middle">
            <thead className="table-light">
              <tr>
                <th style={{ color: "#22C55E" }}>Email</th>
                <th style={{ color: "#22C55E" }}>Department</th>
                <th style={{ color: "#22C55E" }}>Status</th>
                <th className="text-center" style={{ color: "#22C55E" }}>
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {paginatedEmployees.length > 0 ? (
                paginatedEmployees.map((emp, idx) => (
                  <tr key={emp.id ?? `emp-${idx}`}>
                    <td>{emp.emailAddress}</td>
                    <td>{emp.employeedepartment}</td>

                    <td>
                      <Badge
                        bg={emp.status === "active" ? "success" : "secondary"}
                      >
                        {emp.status}
                      </Badge>
                    </td>

                    <td className="text-center">
                      <Button
                        variant="outline-success"
                        size="sm"
                        className="me-2"
                        onClick={() => handleView(emp.id)}
                        title="View Details"
                      >
                        <Eye size={16} />
                      </Button>

                      <Button
                        variant="outline-success"
                        size="sm"
                        className="me-2"
                        onClick={() => handleEdit(emp.id)}
                        title="Edit Employee"
                      >
                        <PencilSquare size={16} />
                      </Button>

                      {emp.status === "inactive" ? (
                        <Button
                          variant="outline-success"
                          size="sm"
                          className="me-2"
                          onClick={() => handleActivate(emp.id)}
                          title="Activate Employee"
                        >
                          Activate
                        </Button>
                      ) : (
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          className="me-2"
                          onClick={() => handleDeactivate(emp.id)}
                          title="Deactivate Employee"
                        >
                          Deactivate
                        </Button>
                      )}

                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => handleDelete(emp.id)}
                        title="Delete Employee"
                      >
                        <Trash size={16} />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center text-muted py-4">
                    No employees found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>

          {/* PAGINATION */}
          <div className="d-flex justify-content-between align-items-center mt-3 pb-4 px-3">
            <div className="text-muted">
              Showing {startIndex + 1}-
              {Math.min(endIndex, filteredEmployees.length)} of{" "}
              {filteredEmployees.length} employees
            </div>
            <div className="d-flex gap-2">
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={handlePreviousPage}
                disabled={currentPage === 0}
              >
                Previous
              </button>
              <span className="align-self-center mx-2">
                Page {currentPage + 1} of {totalPages || 1}
              </span>
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={handleNextPage}
                disabled={currentPage >= totalPages - 1}
              >
                Next
              </button>
            </div>
          </div>

          {isLoading && (
            <div className="text-center text-muted">Loading employees...</div>
          )}
        </div>
      </div>

      {/* =======================
          VIEW MODAL
      ======================== */}
      <Modal
        show={viewModalId !== null}
        onHide={closeViewModal}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Employee Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {viewModalId !== null && getEmployeeById(viewModalId) ? (
            <div>
              <div className="mb-3">
                <label className="fw-semibold" style={{ color: "#22C55E" }}>
                  Email Address:
                </label>
                <p className="text-muted">
                  {getEmployeeById(viewModalId)?.emailAddress}
                </p>
              </div>
              <div className="mb-3">
                <label className="fw-semibold" style={{ color: "#22C55E" }}>
                  Department:
                </label>
                <p className="text-muted">
                  {getEmployeeById(viewModalId)?.employeedepartment}
                </p>
              </div>
              <div className="mb-3">
                <label className="fw-semibold" style={{ color: "#22C55E" }}>
                  Status:
                </label>
                <p>
                  <Badge
                    bg={
                      getEmployeeById(viewModalId)?.status === "active"
                        ? "success"
                        : "secondary"
                    }
                  >
                    {getEmployeeById(viewModalId)?.status}
                  </Badge>
                </p>
              </div>
            </div>
          ) : (
            <p className="text-muted">Loading employee details...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeViewModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* =======================
          EDIT MODAL
      ======================== */}
      <Modal
        show={editModalId !== null}
        onHide={closeEditModal}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Employee Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Email Address</Form.Label>
              <Form.Control
                type="email"
                value={editFormData?.emailAddress || ""}
                onChange={(e) =>
                  handleEditFieldChange("emailAddress", e.target.value)
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Department</Form.Label>
              <Form.Control
                type="text"
                value={editFormData?.employeedepartment || ""}
                onChange={(e) =>
                  handleEditFieldChange("employeedepartment", e.target.value)
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Status</Form.Label>
              <Form.Select
                value={editFormData?.status || "active"}
                onChange={(e) =>
                  handleEditFieldChange("status", e.target.value)
                }
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeEditModal}>
            Cancel
          </Button>
          <Button variant="success" onClick={() => saveEditChanges()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* =======================
          STATUS CHANGE CONFIRMATION MODAL
      ======================== */}
      <Modal
        show={statusChangeId !== null}
        onHide={closeStatusChangeModal}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {statusChangeAction === "activate"
              ? "Activate Employee"
              : "Deactivate Employee"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {statusChangeAction === "activate" ? (
            <p>
              Are you sure you want to <strong>Activate</strong> this employee?
            </p>
          ) : (
            <p>
              Are you sure you want to <strong>Deactivate</strong> this
              employee?
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeStatusChangeModal}>
            Cancel
          </Button>
          <Button
            variant={
              statusChangeAction === "activate" ? "success" : "secondary"
            }
            onClick={confirmStatusChange}
          >
            {statusChangeAction === "activate" ? "Activate" : "Deactivate"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* =======================
          DELETE CONFIRMATION MODAL
      ======================== */}
      <Modal show={deleteConfirmId !== null} onHide={closeDeleteModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to <strong>delete</strong> this employee? This
            action cannot be undone.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDeleteModal}>
            Cancel
          </Button>
          <Button variant="success" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* =======================
          BULK ACTION CONFIRMATION MODAL
      ======================== */}
      <Modal
        show={bulkConfirmAction !== null}
        onHide={closeBulkConfirmModal}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {bulkConfirmAction === "activate_all"
              ? "Activate All Employees"
              : bulkConfirmAction === "deactivate_all"
                ? "Deactivate All Employees"
                : "Delete All Employees"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to{" "}
            <strong>
              {bulkConfirmAction === "activate_all"
                ? "activate"
                : bulkConfirmAction === "deactivate_all"
                  ? "deactivate"
                  : "delete"}
            </strong>{" "}
            {filteredEmployees.length} employee
            {filteredEmployees.length !== 1 ? "s" : ""}?
            {bulkConfirmAction === "delete_all" && (
              <>
                <br />
                <strong className="text-secondary">
                  This action cannot be undone.
                </strong>
              </>
            )}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeBulkConfirmModal}>
            Cancel
          </Button>
          <Button
            variant={
              bulkConfirmAction === "activate_all"
                ? "success"
                : bulkConfirmAction === "deactivate_all"
                  ? "secondary"
                  : "danger"
            }
            onClick={confirmBulkAction}
          >
            {bulkConfirmAction === "activate_all"
              ? "Activate All"
              : bulkConfirmAction === "deactivate_all"
                ? "Deactivate All"
                : "Delete All"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* =======================
          ADD EMPLOYEE MODAL
      ======================== */}
      <AddEmployeeForm
        showModal={showAddEmployeeModal}
        onClose={closeAddEmployeeModal}
        onEmployeeAdded={closeAddEmployeeModal}
      />
    </Layout>
  );
};

export default EmployeeManagement;

// import EmployeeTable from "../../components/employercomponents/employerdashboard/EmployeeTable";
// import Layout from "../../components/employercomponents/shared/Layout";
// import { Search, UserPlus } from "lucide-react";
// import { useState } from "react";
// import { useSelector } from "react-redux";
// import { RootState } from "../../store/store";
// import AddEmployeeForm from "../../components/employercomponents/companyemployees/AddEmployeeForm";

// const EmployeeManagement = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);

//   // Get employees from Redux
//   const employeeData = useSelector((state: RootState) => ({
//     employees: state.employer.employees,
//     isLoading: state.employer.isLoading,
//   }));

//   // // Sort employees by name
//   // const sortedEmployees = [...employeeData.employees].sort((a, b) => a.name.localeCompare(b.name));

//   // // Hardcode companyId for now
//   const companyId = "your-company-id";

//   const handleAddEmployee = () => {
//     setShowAddEmployeeModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowAddEmployeeModal(false);
//   };

//   const handleEmployeeAdded = () => {
//     // Refresh employee list or handle success
//     console.log("Employee added successfully");
//   };

//   return (
//     <Layout title="Employee Management Portal">
//       <div className="container-fluid py-4 px-3">
//         <div className="row gy-4">
//           <div className="col-lg-12 col-md-12">
//             <div className="card border-0 shadow-sm h-100">
//               <div className="card-body">
//                 <div className="d-flex justify-content-between align-items-center mb-4">
//                   <h5 className="card-title fw-semibold mb-0">
//                     Corporate Employee List
//                   </h5>
//                   <div className="d-flex align-items-center">
//                     <div
//                       className="input-group me-3"
//                       style={{ width: "300px" }}
//                     >
//                       {/* <span className="input-group-text bg-white border-end-0">
//                         <Search size={18} />
//                       </span> */}

//                       <input
//                         type="text"
//                         className="form-control border-start-0"
//                         placeholder="Search employees..."
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                       />
//                     </div>
//                     <button
//                       className="btn d-flex align-items-center"
//                       onClick={handleAddEmployee}
//                       style={{
//                         backgroundColor: "#22C55E",
//                         borderColor: "#22C55E",
//                         color: "white",
//                         borderRadius: "8px",
//                         fontWeight: "600",
//                         padding: "0.5rem 1rem",
//                       }}
//                     >
//                       <UserPlus size={18} className="me-2" />
//                       Add Employee
//                     </button>
//                   </div>
//                 </div>
//               </div>
//               <EmployeeTable employees={employeeData.employees} />
//             </div>
//           </div>
//         </div>
//       </div>

//       <AddEmployeeForm
//         showModal={showAddEmployeeModal}
//         onClose={handleCloseModal}
//         onEmployeeAdded={handleEmployeeAdded}
//       />
//     </Layout>
//   );
// };

// export default EmployeeManagement;
