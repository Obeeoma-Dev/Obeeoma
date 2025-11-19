import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import AddEmployeeForm from "./AddEmployeeForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployeeInvites, clearEmployerError } from '../../../store/slices/EmployerSlice';
import { useToast } from "../../../hooks/use-toast";
const EmployeeTable = ({ searchQuery, onSearchChange, employees: propEmployees, onEmployeeAdded }) => {
    const dispatch = useDispatch();
    const { toast } = useToast();
    // 1. SELECT STATE WITH CORRECT TYPE MAPPING
    const { invites, isLoading, isActionLoading, error } = useSelector((state) => ({
        invites: state.employer.invites,
        isLoading: state.employer.isLoading,
        isActionLoading: state.employer.isActionLoading,
        error: state.employer.error,
    }));
    const [showModal, setShowModal] = useState(false);
    // Combine invited employees with actual employees
    const displayEmployees = [
        ...(propEmployees || []).map(emp => ({
            id: emp.id,
            name: emp.name || `User`,
            email: emp.email || '',
            department: emp.department || 'Unknown',
            status: (emp.status === 'active' ? 'active' : emp.status === 'pending' ? 'pending' : 'inactive'),
            avatar: emp.avatar || (emp.name ? emp.name.charAt(0).toUpperCase() : 'E'),
        })),
        ...invites.map((invite) => ({
            id: invite.id || `invite-${invite.email}`,
            name: invite.email.split('@')[0],
            email: invite.email,
            department: invite.department || "Pending",
            status: (invite.status === 'accepted' ? 'active' : 'pending'),
            avatar: invite.email.charAt(0).toUpperCase(),
        }))
    ];
    useEffect(() => {
        dispatch(fetchEmployeeInvites());
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
    const filteredEmployees = displayEmployees.filter((emp) => emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.department.toLowerCase().includes(searchQuery.toLowerCase()));
    const handleStatusChange = () => {
        toast({
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
    const handleEmployeeAdded = () => {
        closeModal();
        toast({
            message: "Employee invitation sent successfully!",
            duration: 4000,
        });
        dispatch(fetchEmployeeInvites());
        onEmployeeAdded?.();
    };
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "row mb-3", children: _jsx("div", { className: "col-12", children: _jsxs("div", { className: "d-flex justify-content-between align-items-center", children: [_jsxs("div", { className: "position-relative", style: { width: "300px" }, children: [_jsx(Search, { className: "position-absolute top-50 start-0 translate-middle-y ms-3 text-muted", size: 16 }), _jsx("input", { type: "search", placeholder: "Search employees...", className: "form-control ps-5", value: searchQuery, onChange: (e) => onSearchChange(e.target.value) })] }), _jsx("button", { type: "button", className: "btn btn-success", onClick: loadAddEmployeeForm, disabled: isActionLoading, children: isActionLoading ? 'Sending...' : 'Add Employee' })] }) }) }), _jsx(AddEmployeeForm, { showModal: showModal, onClose: closeModal, onEmployeeAdded: handleEmployeeAdded }), _jsx("div", { className: "table-responsive", children: _jsxs("table", { className: "table table-hover mb-0", children: [_jsx("thead", { className: "bg-light", children: _jsxs("tr", { children: [_jsx("th", { className: "border-0 ps-4 py-3 text-muted fw-semibold", children: "Worker" }), _jsx("th", { className: "border-0 py-3 text-muted fw-semibold", children: "Email" }), _jsx("th", { className: "border-0 py-3 text-muted fw-semibold", children: "Department" }), _jsx("th", { className: "border-0 py-3 text-muted fw-semibold", children: "Status" }), _jsx("th", { className: "border-0 py-3 text-muted fw-semibold text-end", children: "Actions" })] }) }), _jsx("tbody", { children: isLoading ? (_jsx("tr", { children: _jsxs("td", { colSpan: 5, className: "text-center py-5", children: [_jsx("div", { className: "spinner-border text-primary", role: "status", children: _jsx("span", { className: "visually-hidden", children: "Loading..." }) }), _jsx("p", { className: "mt-2 text-muted", children: "Fetching employees..." })] }) })) : filteredEmployees.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: 5, className: "text-center py-5 text-muted", children: "No employees found." }) })) : (filteredEmployees.map((employee) => (_jsxs("tr", { children: [_jsx("td", { className: "ps-4 py-3", children: _jsxs("div", { className: "d-flex align-items-center gap-3", children: [_jsx("div", { className: "rounded-circle bg-light d-flex align-items-center justify-content-center", style: { width: "40px", height: "40px" }, children: _jsx("span", { className: "fw-bold text-primary", children: employee.avatar }) }), _jsx("span", { className: "fw-medium", children: employee.name })] }) }), _jsx("td", { className: "py-3 text-muted", children: employee.email }), _jsx("td", { className: "py-3 text-muted", children: employee.department }), _jsx("td", { className: "py-3", children: _jsx("span", { className: `badge ${employee.status === "active"
                                                ? "bg-success bg-opacity-10 text-success"
                                                : employee.status === "pending"
                                                    ? "bg-warning bg-opacity-10 text-warning"
                                                    : "bg-danger bg-opacity-10 text-danger"}`, children: employee.status.charAt(0).toUpperCase() + employee.status.slice(1) }) }), _jsx("td", { className: "py-3 text-end", children: _jsxs("div", { className: "d-flex justify-content-end gap-2", children: [_jsx("button", { className: "btn btn-sm btn-outline-primary", onClick: () => { }, children: "Edit" }), _jsx("button", { className: "btn btn-sm btn-outline-danger", onClick: () => { }, children: "Remove" })] }) })] }, employee.id)))) })] }) }), _jsxs("div", { className: "d-flex justify-content-between align-items-center mt-3", children: [_jsxs("div", { className: "text-muted", children: ["Showing ", filteredEmployees.length, " of ", displayEmployees.length, " employees"] }), _jsxs("div", { className: "d-flex gap-2", children: [_jsx("button", { className: "btn btn-sm btn-outline-secondary", children: "Previous" }), _jsx("button", { className: "btn btn-sm btn-outline-secondary", children: "Next" })] })] })] }));
};
export default EmployeeTable;
