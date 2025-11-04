import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import Layout from "../../components/employercomponents/shared/Layout";
import EmployeeTable from "../../components/employercomponents/companyemployees/EmployeeTable";
import AddEmployeeForm from "../../components/employercomponents/companyemployees/AddEmployeeForm";
import { Plus } from "lucide-react";
import { Provider } from "react-redux";
import { store } from "../../store/store";
const EmployeeManagement = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const additionalHeader = (_jsxs("button", { className: "btn btn-success d-flex align-items-center gap-2", children: [_jsx(Plus, { size: 16, className: "text-white" }), "Add Employee"] }));
    return (_jsx(Layout, { title: "Employee Management", showSearch: true, additionalHeaderContent: additionalHeader, children: _jsx("div", { className: "row gy-4", children: _jsx("div", { className: "container-fluid py-4 px-3", children: _jsxs("div", { className: "col-lg-12 col-md-9 col-sm-6 mx-auto", children: [_jsx(EmployeeTable, { searchQuery: searchQuery, onSearchChange: setSearchQuery }), _jsx(Provider, { store: store, children: _jsx(AddEmployeeForm, {}) })] }) }) }) }));
};
export default EmployeeManagement;
