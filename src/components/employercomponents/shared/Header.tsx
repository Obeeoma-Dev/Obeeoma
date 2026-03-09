import { ReactNode, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Search, Bell, Menu, User } from "lucide-react";
import { RootState } from "../../../store/store";
import { AppDispatch } from "../../../store/store";
import { fetchCurrentEmployer } from "../../../store/slices/EmployerSlice";
import { Badge } from "react-bootstrap";

interface HeaderProps {
  title: string;
  showSearch?: boolean;
  onMenuToggle: () => void;
  additionalContent?: ReactNode;
}
const PRIMARY_COLOR = "#22C55E";

const Header = ({
  title,
  showSearch = false,
  onMenuToggle,
  additionalContent,
}: HeaderProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentEmployer, isLoading } = useSelector(
    (state: RootState) => state.employer,
  );

  useEffect(() => {
    dispatch(fetchCurrentEmployer());
  }, [dispatch]);

  return (
    <header className="bg-white border-bottom sticky-top z-30">
      <div className="container-fluid">
        <div className="row align-items-center py-3">
          <div className="col-auto d-lg-none">
            <button
              onClick={onMenuToggle}
              className="btn btn-link p-2"
              style={{ fontFamily: "heading", color: PRIMARY_COLOR }}
            >
              <Menu size={24} />
            </button>
          </div>

          <div className="col">
            <div className="d-flex align-items-center gap-3">
              <h1
                className="h4 fw-bold mb-0 "
                style={{ fontFamily: "heading", color: PRIMARY_COLOR }}
              >
                {title}{" "}
              </h1>
              {additionalContent}
            </div>
          </div>

          <div className="col-auto">
            <div className="d-flex align-items-center gap-3">
              {showSearch && (
                <div
                  className="position-relative d-none d-md-block"
                  style={{ maxWidth: "300px" }}
                >
                  <Search
                    className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
                    size={16}
                  />
                  <input
                    type="search"
                    placeholder="Search..."
                    className="form-control ps-5 bg-light"
                  />
                </div>
              )}

              <div className="d-flex align-items-center gap-3">
                <div className="text-end d-none d-md-block">
                  <div
                    className="text-muted small"
                    style={{ fontSize: "0.8rem" }}
                  >
                    {isLoading ? "Loading..." : "Employer"}
                  </div>
                  <div
                    className="fw-600 text-dark"
                    style={{ fontSize: "0.9rem" }}
                  >
                    {currentEmployer?.organizationName ||
                      currentEmployer?.firstName ||
                      "Employer Dashboard"}
                  </div>
                </div>

                <div
                  className="bg-success rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: PRIMARY_COLOR,
                  }}
                >
                  <User size={22} color="#fff" />
                </div>
              </div>

              <button className="btn btn-link position-relative p-2 text-dark ms-2">
                <Bell size={20} />
                <Badge
                  bg="danger"
                  pill
                  className="position-absolute top-0 start-100 translate-middle text-white"
                  style={{
                    fontSize: "0.65rem",
                    width: "1.2rem",
                    height: "1.2rem",
                  }}
                >
                  2
                </Badge>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

// import { ReactNode } from "react";
// import { Search, Bell, Menu } from "lucide-react";

// interface HeaderProps {
//   title: string;
//   showSearch?: boolean;
//   onMenuToggle: () => void;
//   additionalContent?: ReactNode;
// }
// const PRIMARY_COLOR = "#22C55E";

// const Header = ({
//   title,
//   showSearch = false,
//   onMenuToggle,
//   additionalContent,
// }: HeaderProps) => {
//   return (
//     <header className="bg-white border-bottom sticky-top z-30">
//       <div className="container-fluid">
//         <div className="row align-items-center py-3">
//           <div className="col-auto d-lg-none">
//             <button
//               onClick={onMenuToggle}
//               className="btn btn-link p-2"
//               style={{ fontFamily: "heading", color: PRIMARY_COLOR }}
//             >
//               <Menu size={24} />
//             </button>
//           </div>

//           <div className="col">
//             <div className="d-flex align-items-center gap-3">
//               <h1
//                 className="h4 fw-bold mb-0 "
//                 style={{ fontFamily: "heading", color: PRIMARY_COLOR }}
//               >
//                 {title}{" "}
//               </h1>
//               {additionalContent}
//             </div>
//           </div>

//           <div className="col-auto">
//             <div className="d-flex align-items-center gap-3">
//               {showSearch && (
//                 <div
//                   className="position-relative d-none d-md-block"
//                   style={{ maxWidth: "300px" }}
//                 >
//                   <Search
//                     className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
//                     size={16}
//                   />
//                   <input
//                     type="search"
//                     placeholder="Search..."
//                     className="form-control ps-5 bg-light"
//                   />
//                 </div>
//               )}

//               <button className="btn btn-link position-relative p-2 text-dark">
//                 <Bell size={20} />
//                 <span
//                   className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-primary p-1"
//                   style={{ backgroundColor: PRIMARY_COLOR, color: "3CB371" }}
//                 ></span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;
