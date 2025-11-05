import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const LogoutModal = ({ isOpen, onClose, onConfirm, userName = "Billy", userLocation = "Location" }) => {
    if (!isOpen)
        return null;
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const formattedTime = currentDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
    return (_jsx("div", { className: "modal fade show d-block", style: { backgroundColor: 'rgba(0,0,0,0.5)' }, tabIndex: -1, children: _jsx("div", { className: "modal-dialog modal-dialog-centered", children: _jsxs("div", { className: "modal-content", children: [_jsx("div", { className: "modal-header border-0 pb-0", children: _jsx("h5", { className: "modal-title fw-bold", children: "Log out" }) }), _jsxs("div", { className: "modal-body pt-0", children: [_jsx("p", { className: "mb-4", children: "Are you sure you want to complete this action?" }), _jsx("div", { className: "card border-0 bg-light mb-3", children: _jsx("div", { className: "card-body", children: _jsxs("div", { className: "row", children: [_jsxs("div", { className: "col-6", children: [_jsx("p", { className: "small text-muted mb-1", children: "Name" }), _jsx("p", { className: "fw-medium mb-0", children: userName })] }), _jsxs("div", { className: "col-6", children: [_jsx("p", { className: "small text-muted mb-1", children: "Location" }), _jsx("p", { className: "fw-medium mb-0", children: userLocation })] })] }) }) }), _jsx("div", { className: "card border-0 bg-light", children: _jsx("div", { className: "card-body", children: _jsxs("div", { className: "row", children: [_jsxs("div", { className: "col-12 mb-3", children: [_jsx("p", { className: "small text-muted mb-1", children: "Date" }), _jsx("p", { className: "fw-medium mb-0", children: formattedDate })] }), _jsxs("div", { className: "col-12", children: [_jsx("p", { className: "small text-muted mb-1", children: "Time" }), _jsxs("p", { className: "fw-medium mb-0", children: [formattedTime, " (60 min)"] })] })] }) }) })] }), _jsxs("div", { className: "modal-footer border-0", children: [_jsx("button", { type: "button", className: "btn btn-outline-secondary", onClick: onClose, children: "Cancel" }), _jsx("button", { type: "button", className: "btn btn-primary", onClick: onConfirm, children: "Continue" })] })] }) }) }));
};
export default LogoutModal;
