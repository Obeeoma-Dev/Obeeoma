import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// components/employercomponents/companyemployees/EmployeeTable.tsx
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import AddEmployeeForm from "./AddEmployeeForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployeeInvites, clearEmployerError } from '../../../store/slices/EmployerSlice';
import { useToast } from "../../../hooks/use-toast";
const EmployeeTable = ({ searchQuery, onSearchChange, employees, companyId, onEmployeeAdded }) => {
    const dispatch = useDispatch();
    const { toast } = useToast();
    const { invites, isLoading, isActionLoading, error } = useSelector((state) => ({
        invites: state.employer.invites,
        isLoading: state.employer.isLoading,
        isActionLoading: state.employer.isActionLoading,
        error: state.employer.error,
    }));
    const [showModal, setShowModal] = useState(false);
    // Combine invited employees with actual employees
    const allEmployees = [
        ...employees,
        ...invites.map(invite => ({
            id: invite.id,
            name: invite.email.split('@')[0], // Use email prefix as name
            email: invite.email,
            department: "Pending", // Or use invite.department if available
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
    const filteredEmployees = allEmployees.filter((emp) => emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.department.toLowerCase().includes(searchQuery.toLowerCase()));
    const handleEmployeeAdded = () => {
        setShowModal(false);
        toast({
            message: "Employee invitation sent successfully!",
            duration: 4000,
        });
        onEmployeeAdded?.();
        dispatch(fetchEmployeeInvites());
    };
    return (_jsx("div", { className: "card border-0 shadow-sm", children: _jsxs("div", { className: "card-body", children: [_jsx("div", { className: "row mb-3", children: _jsx("div", { className: "col-12", children: _jsxs("div", { className: "d-flex justify-content-between align-items-center", children: [_jsxs("div", { className: "position-relative", style: { width: "300px" }, children: [_jsx(Search, { className: "position-absolute top-50 start-0 translate-middle-y ms-3 text-muted", size: 16 }), _jsx("input", { type: "search", placeholder: "Search employees...", className: "form-control ps-5", value: searchQuery, onChange: (e) => onSearchChange(e.target.value) })] }), _jsx("button", { type: "button", className: "btn btn-success", onClick: () => setShowModal(true), disabled: isActionLoading, children: isActionLoading ? 'Sending...' : 'Add Employee' })] }) }) }), _jsx(AddEmployeeForm, { showModal: showModal, onClose: () => setShowModal(false), onEmployeeAdded: handleEmployeeAdded, companyId: companyId }), _jsx("div", { className: "table-responsive", children: _jsxs("table", { className: "table table-hover mb-0", children: [_jsx("thead", { className: "bg-light", children: _jsxs("tr", { children: [_jsx("th", { className: "border-0 ps-4 py-3 text-muted fw-semibold", children: "Worker" }), _jsx("th", { className: "border-0 py-3 text-muted fw-semibold", children: "Email" }), _jsx("th", { className: "border-0 py-3 text-muted fw-semibold", children: "Department" }), _jsx("th", { className: "border-0 py-3 text-muted fw-semibold", children: "Status" }), _jsx("th", { className: "border-0 py-3 text-muted fw-semibold text-end", children: "Actions" })] }) }), _jsx("tbody", { children: isLoading ? (_jsx("tr", { children: _jsxs("td", { colSpan: 5, className: "text-center py-5", children: [_jsx("div", { className: "spinner-border text-primary", role: "status", children: _jsx("span", { className: "visually-hidden", children: "Loading..." }) }), _jsx("p", { className: "mt-2 text-muted", children: "Fetching employees..." })] }) })) : filteredEmployees.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: 5, className: "text-center py-5 text-muted", children: "No employees found." }) })) : (filteredEmployees.map((employee) => (_jsxs("tr", { children: [_jsx("td", { className: "ps-4 py-3", children: _jsxs("div", { className: "d-flex align-items-center gap-3", children: [_jsx("div", { className: "rounded-circle bg-light d-flex align-items-center justify-content-center", style: { width: "40px", height: "40px" }, children: _jsx("span", { className: "fw-bold text-primary", children: employee.avatar }) }), _jsx("span", { className: "fw-medium", children: employee.name })] }) }), _jsx("td", { className: "py-3 text-muted", children: employee.email }), _jsx("td", { className: "py-3 text-muted", children: employee.department }), _jsx("td", { className: "py-3", children: _jsx("span", { className: `badge ${employee.status === "active"
                                                    ? "bg-success bg-opacity-10 text-success"
                                                    : employee.status === "pending"
                                                        ? "bg-warning bg-opacity-10 text-warning"
                                                        : "bg-danger bg-opacity-10 text-danger"}`, children: employee.status.charAt(0).toUpperCase() + employee.status.slice(1) }) }), _jsx("td", { className: "py-3 text-end", children: _jsxs("div", { className: "d-flex justify-content-end gap-2", children: [_jsx("button", { className: "btn btn-sm btn-outline-primary", onClick: () => { }, children: "Edit" }), _jsx("button", { className: "btn btn-sm btn-outline-danger", onClick: () => { }, children: "Remove" })] }) })] }, employee.id)))) })] }) })] }) }));
};
export default EmployeeTable;
