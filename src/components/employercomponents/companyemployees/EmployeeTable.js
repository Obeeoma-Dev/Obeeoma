import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import AddEmployeeForm from "./AddEmployeeForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployeeInvites, clearEmployerError } from '../../../store/slices/EmployerSlice';
import { useToast } from "../../../hooks/use-toast";
const EmployeeTable = ({ searchQuery, onSearchChange }) => {
    const dispatch = useDispatch();
    const { toast } = useToast();
    // 1. SELECT STATE WITH CORRECT TYPE MAPPING
    const { invites, isLoading, isActionLoading, error } = useSelector((state) => ({
        invites: state.employer.invites,
        isLoading: state.employer.isLoading,
        isActionLoading: state.employer.isActionLoading,
        error: state.employer.error,
    }));
    // 2. MAP INVITES TO DISPLAY FORMAT
    const employees = invites.map((invite) => ({
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
        // @ts-ignore - Redux toolkit thunks don't always auto-infer dispatch type easily
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
            // @ts-ignore
            dispatch(clearEmployerError());
        }
    }, [error, toast, dispatch]);
    const filteredEmployees = employees.filter((emp) => emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.department.toLowerCase().includes(searchQuery.toLowerCase()));
    const handleStatusChange = (employeeId, checked) => {
        // Note: Status changes should be handled via API call in a real implementation
        toast({
            // Use the expected 'message' prop
            message: "Status changes require backend API integration",
            duration: 4000,
        });
    };
    const loadAddEmployeeForm = () => {
        setShowModal(true);
    };
    const closeModal = () => {
        setShowModal(false);
    };
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
        // @ts-ignore
        dispatch(fetchEmployeeInvites());
    };
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "row mb-3", children: _jsx("div", { className: "col-12", children: _jsxs("div", { className: "d-flex justify-content-between align-items-center", children: [_jsxs("div", { className: "position-relative", style: { width: "300px" }, children: [_jsx(Search, { className: "position-absolute top-50 start-0 translate-middle-y ms-3 text-muted", size: 16 }), _jsx("input", { type: "search", placeholder: "Search employees...", className: "form-control ps-5", value: searchQuery, onChange: (e) => onSearchChange(e.target.value) })] }), _jsx("button", { type: "button", className: "btn btn-success", onClick: loadAddEmployeeForm, disabled: isActionLoading, children: isActionLoading ? 'Sending...' : 'Add Employee' })] }) }) }), _jsx(AddEmployeeForm, { showModal: showModal, onClose: closeModal, onEmployeeAdded: handleEmployeeAdded }), _jsx("div", { className: "row", children: _jsx("div", { className: "col-12", children: _jsx("div", { className: "card border-0 shadow-sm", children: _jsx("div", { className: "card-body p-0", children: _jsx("div", { className: "table-responsive", children: _jsxs("table", { className: "table table-hover mb-0", children: [_jsx("thead", { className: "bg-light", children: _jsxs("tr", { children: [_jsx("th", { className: "border-0 ps-4 py-3 text-muted fw-semibold", children: "Name" }), _jsx("th", { className: "border-0 py-3 text-muted fw-semibold", children: "Email" }), _jsx("th", { className: "border-0 py-3 text-muted fw-semibold", children: "Department" }), _jsx("th", { className: "border-0 py-3 text-muted fw-semibold", children: "Status" }), _jsx("th", { className: "border-0 py-3 text-muted fw-semibold text-end", children: "Deactivate" })] }) }), _jsx("tbody", { children: isLoading ? (_jsx("tr", { children: _jsxs("td", { colSpan: 5, className: "text-center py-5", children: [_jsx("div", { className: "spinner-border text-primary", role: "status", children: _jsx("span", { className: "visually-hidden", children: "Loading..." }) }), _jsx("p", { className: "mt-2 text-muted", children: "Fetching invitations..." })] }) })) : filteredEmployees.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: 5, className: "text-center py-5 text-muted", children: "No invitations found." }) })) : (filteredEmployees.map((employee) => (_jsxs("tr", { children: [_jsx("td", { className: "ps-4 py-3", children: _jsxs("div", { className: "d-flex align-items-center gap-3", children: [_jsx("div", { className: "rounded-circle bg-light d-flex align-items-center justify-content-center", style: { width: "40px", height: "40px" }, children: _jsx("span", { className: "fw-bold text-primary", children: employee.avatar }) }), _jsx("span", { className: "fw-medium", children: employee.name })] }) }), _jsx("td", { className: "py-3 text-muted", children: employee.email }), _jsx("td", { className: "py-3 text-muted", children: employee.department }), _jsx("td", { className: "py-3", children: _jsx("span", { className: `badge ${employee.status === "Active"
                                                                ? "bg-success bg-opacity-10 text-success"
                                                                : employee.status === "Pending"
                                                                    ? "bg-warning bg-opacity-10 text-warning"
                                                                    : "bg-danger bg-opacity-10 text-danger"}`, children: employee.status }) }), _jsx("td", { className: "py-3 text-end", children: _jsx("div", { className: "form-check form-switch d-inline-block", style: { width: "3.5em", textAlign: "right" }, children: _jsx("input", { className: "form-check-input", type: "checkbox", role: "switch", checked: employee.status === "Active", onChange: (e) => {
                                                                    handleStatusChange(Number(employee.id), e.target.checked);
                                                                }, style: { width: "2.5em", height: "1.25em" } }) }) })] }, employee.id)))) })] }) }) }) }) }) })] }));
};
export default EmployeeTable;
