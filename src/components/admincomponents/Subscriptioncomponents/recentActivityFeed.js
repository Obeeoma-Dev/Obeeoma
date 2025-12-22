import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ListGroup } from "react-bootstrap";
const RecentActivityFeed = ({ activities }) => {
    return (_jsxs("div", { className: "mb-4", children: [_jsx("h5", { children: "Recent Activity" }), _jsx(ListGroup, { children: activities.map((activity, index) => (_jsx(ListGroup.Item, { children: activity }, index))) })] }));
};
export default RecentActivityFeed;
