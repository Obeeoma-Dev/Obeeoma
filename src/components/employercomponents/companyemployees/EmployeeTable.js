import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import AddEmployeeForm from "./AddEmployeeForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployeeInvites, clearEmployerError } from '../../../store/slices/employerSlice';
import { useToast } from "../../../hooks/use-toast";
const EmployeeTable = ({ searchQuery, onSearchChange }) => {
    const dispatch = useDispatch();
    const { toast } = useToast();
    const { invites, isLoading, error } = useSelector((state) => state.employer);
    const employees = invites.map((invite) => ({
        id: invite.id,
        name: invite.email,
        email: invite.email,
        department: "Other",
        status: invite.status === 'accepted' ? 'Active' : invite.status === 'pending' ? 'Pending' : 'Inactive',
        avatar: invite.email.charAt(0).toUpperCase(),
    }));
    const [showModal, setShowModal] = useState(false);
    // Fetch employee invites on component mount
    useEffect(() => {
        dispatch(fetchEmployeeInvites());
    }, [dispatch]);
    // Handle errors
    useEffect(() => {
        if (error) {
            toast({
                title: "Error",
                description: error,
                message: error,
            });
            dispatch(clearEmployerError());
        }
    }, [error, toast, dispatch]);
    const filteredEmployees = employees.filter((emp) => emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.department.toLowerCase().includes(searchQuery.toLowerCase()));
    const handleStatusChange = (employeeId, checked) => {
        // Note: Status changes should be handled via API call in a real implementation
        // For now, we'll show a toast indicating this feature needs backend integration
        toast({
            title: "Feature Not Implemented",
            description: "Status changes require backend API integration",
            message: "Status changes require backend API integration",
        });
    };
    const loadAddEmployeeForm = () => {
        setShowModal(true);
    };
    const closeModal = () => {
        setShowModal(false);
    };
    const handleEmployeeAdded = () => {
        // Refresh the employee invites list after adding a new employee
        dispatch(fetchEmployeeInvites());
        toast({
            title: "Success",
            description: "Employee invitation sent successfully!",
            message: "Employee invitation sent successfully!",
        });
    };
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "row mb-3", children: _jsx("div", { className: "col-12", children: _jsxs("div", { className: "d-flex justify-content-between align-items-center", children: [_jsxs("div", { className: "position-relative", style: { width: "300px" }, children: [_jsx(Search, { className: "position-absolute top-50 start-0 translate-middle-y ms-3 text-muted", size: 16 }), _jsx("input", { type: "search", placeholder: "Search employees...", className: "form-control ps-5", value: searchQuery, onChange: (e) => onSearchChange(e.target.value) })] }), _jsx("button", { type: "button", className: "btn btn-success", onClick: loadAddEmployeeForm, children: "Add Employee" })] }) }) }), _jsx(AddEmployeeForm, { showModal: showModal, onClose: closeModal, onEmployeeAdded: handleEmployeeAdded }), _jsx("div", { className: "row", children: _jsx("div", { className: "col-12", children: _jsx("div", { className: "card border-0 shadow-sm", children: _jsx("div", { className: "card-body p-0", children: _jsx("div", { className: "table-responsive", children: _jsxs("table", { className: "table table-hover mb-0", children: [_jsx("thead", { className: "bg-light", children: _jsxs("tr", { children: [_jsx("th", { className: "border-0 ps-4 py-3 text-muted fw-semibold", children: "Name" }), _jsx("th", { className: "border-0 py-3 text-muted fw-semibold", children: "Email" }), _jsx("th", { className: "border-0 py-3 text-muted fw-semibold", children: "Department" }), _jsx("th", { className: "border-0 py-3 text-muted fw-semibold", children: "Status" }), _jsx("th", { className: "border-0 py-3 text-muted fw-semibold text-end", children: "Deactivate" })] }) }), _jsx("tbody", { children: filteredEmployees.map((employee) => (_jsxs("tr", { children: [_jsx("td", { className: "ps-4 py-3", children: _jsxs("div", { className: "d-flex align-items-center gap-3", children: [_jsx("div", { className: "rounded-circle bg-light d-flex align-items-center justify-content-center", style: { width: "40px", height: "40px" }, children: _jsx("span", { className: "fw-bold text-primary", children: employee.avatar }) }), _jsx("span", { className: "fw-medium", children: employee.name })] }) }), _jsx("td", { className: "py-3 text-muted", children: employee.email }), _jsx("td", { className: "py-3 text-muted", children: employee.department }), _jsx("td", { className: "py-3", children: _jsx("span", { className: `badge ${employee.status === "Active"
                                                                ? "bg-success bg-opacity-10 text-success"
                                                                : employee.status === "Pending"
                                                                    ? "bg-warning bg-opacity-10 text-warning"
                                                                    : "bg-danger bg-opacity-10 text-danger"}`, children: employee.status }) }), _jsx("td", { className: "py-3 text-end", children: _jsx("div", { className: "form-check form-switch d-inline-block", style: { width: "3.5em", textAlign: "right" }, children: _jsx("input", { className: "form-check-input", type: "checkbox", role: "switch", checked: employee.status === "Active", onChange: (e) => {
                                                                    handleStatusChange(employee.id, e.target.checked);
                                                                }, style: { width: "2.5em", height: "1.25em" } }) }) })] }, employee.id))) })] }) }) }) }) }) })] }));
};
export default EmployeeTable;
