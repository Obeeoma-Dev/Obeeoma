import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const ServiceUtilizationChart = ({ services }) => {
    return (_jsx("div", { children: services.map((service, index) => (_jsxs("div", { style: {
                marginBottom: "1.5rem",
            }, children: [_jsxs("div", { style: {
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "0.5rem",
                    }, children: [_jsx("span", { style: {
                                fontSize: "0.9375rem",
                                fontWeight: "500",
                                color: "#1a1a1a",
                            }, children: service.name }), _jsxs("span", { style: {
                                fontSize: "0.9375rem",
                                fontWeight: "600",
                                color: "#1a1a1a",
                            }, children: [service.percentage, "%"] })] }), _jsx("div", { style: {
                        width: "100%",
                        height: "8px",
                        backgroundColor: "#e9ecef",
                        borderRadius: "4px",
                        overflow: "hidden",
                        position: "relative",
                    }, children: _jsx("div", { style: {
                            width: `${service.percentage}%`,
                            height: "100%",
                            backgroundColor: "#3CB371",
                            borderRadius: "4px",
                            transition: "width 0.3s ease",
                        } }) })] }, index))) }));
};
export default ServiceUtilizationChart;
