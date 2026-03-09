import { useForm, Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { employerAPI } from "../../../api/apiConfig";
import { useToast } from "../../../hooks/use-toast";
import { useState } from "react";
import { UserPlus, Mail, Phone, Building, Upload } from "lucide-react";
import RHFPhoneInput from "../../RHPhoneInput";

const employeeSchema = z.object({
  email: z.email("Please enter a valid email address").trim(),
  phone: z
    .string()
    .min(8, "Phone number must be at least 8 digits")
    .max(9, "Phone number too long")
    .optional(),
  department: z.string().min(1, "Please select a department"),
});

type EmployeeFormData = z.infer<typeof employeeSchema>;

interface AddEmployeeFormProps {
  showModal: boolean;
  onClose: () => void;
  onEmployeeAdded: () => void;
}

const AddEmployeeForm = ({
  showModal,
  onClose,
  onEmployeeAdded,
}: AddEmployeeFormProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
  });

  const onSubmit = async (data: EmployeeFormData) => {
    console.log("Form data:", data);
    try {
      setIsLoading(true);
      // Transforming form data to match API expectations
      const apiData = {
        email: data.email,
        phone: data.phone,
        department: data.department,
      };

      await employerAPI.inviteEmployee(apiData);
      toast({
        title: "Success",
        description: "Employee invitation sent!",
        message: "Employee invitation sent successfully!",
      });

      reset();
      onEmployeeAdded();
      onClose();
    } catch (error) {
      console.error("Error adding employee:", error);
      toast({
        title: "Error",
        description: "Failed to add employee. Please try again.",
        message: "Failed to add employee. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!showModal) return null;

  return (
    <div
      className="modal fade show d-block"
      tabIndex={-1}
      role="dialog"
      style={{
        backgroundColor: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(4px)",
      }}
    >
      <div
        className="modal-dialog modal-dialog-centered modal-lg"
        role="document"
      >
        <div
          className="modal-content border-0 shadow-lg"
          style={{
            borderRadius: "16px",
            background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
          }}
        >
          <div className="modal-header border-0 pb-0">
            <div className="d-flex align-items-center">
              <div
                className="p-2 rounded-circle me-3"
                style={{ backgroundColor: "rgba(34, 197, 94, 0.1)" }}
              >
                <UserPlus size={24} style={{ color: "#22C55E" }} />
              </div>
              <div>
                <h4 className="modal-title fw-bold mb-0 text-dark">
                  Invite New Employee
                </h4>
                <p className="text-muted small mb-0">
                  Send an invitation to join your organization
                </p>
              </div>
            </div>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
              aria-label="Close"
              style={{ filter: "none" }}
            />
          </div>

          <div className="modal-body px-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row g-3">
                <div className="col-12">
                  <label
                    htmlFor="employee-email"
                    className="form-label fw-semibold text-dark mb-2"
                  >
                    <Mail
                      size={16}
                      className="me-2"
                      style={{ color: "#22C55E" }}
                    />
                    Email Address <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    className={`form-control form-control-lg ${errors.email ? "is-invalid" : ""}`}
                    id="employee-email"
                    placeholder="employee@company.com"
                    style={{
                      borderRadius: "8px",
                      border: "2px solid #e9ecef",
                      transition: "all 0.2s ease",
                    }}
                    {...register("email")}
                  />
                  {errors.email && (
                    <div className="invalid-feedback d-block mt-2">
                      {errors.email.message}
                    </div>
                  )}
                </div>

                <div className="col-12">
                  <label
                    htmlFor="department"
                    className="form-label fw-semibold text-dark mb-2"
                  >
                    <Building
                      size={16}
                      className="me-2"
                      style={{ color: "#22C55E" }}
                    />
                    Department <span className="text-danger">*</span>
                  </label>
                  <select
                    className={`form-select form-select-lg ${errors.department ? "is-invalid" : ""}`}
                    id="department"
                    style={{
                      borderRadius: "8px",
                      border: "2px solid #e9ecef",
                      transition: "all 0.2s ease",
                    }}
                    {...register("department")}
                  >
                    <option value="">Select department</option>
                    <option value="Marketing"> Marketing</option>
                    <option value="HR"> Human Resources</option>
                    <option value="Finance"> Finance</option>
                    <option value="Engineering"> Engineering</option>
                    <option value="Operations"> Operations</option>
                    <option value="Sales"> Sales</option>
                    <option value="Customer Service">Customer Service</option>
                    <option value="Other"> Other</option>
                  </select>
                  {errors.department && (
                    <div className="invalid-feedback d-block mt-2">
                      {errors.department.message}
                    </div>
                  )}
                </div>
              </div>  
            </form>
          </div>

          <div className="modal-footer border-0 pt-0">
            <button
              type="button"
              className="btn btn-outline-secondary px-4 py-2"
              onClick={handleClose}
              disabled={isLoading}
              style={{ borderRadius: "8px" }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn px-4 py-2 d-flex align-items-center"
              disabled={isLoading}
              onClick={handleSubmit(onSubmit)}
              style={{
                backgroundColor: "#22C55E",
                borderColor: "#22C55E",
                color: "white",
                borderRadius: "8px",
                fontWeight: "600",
                minWidth: "140px",
              }}
            >
              {isLoading ? (
                <>
                  <div
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                  ></div>
                  Sending...
                </>
              ) : (
                <>
                  <UserPlus
                    size={18}
                    className="me-2"
                    style={{ color: "white" }}
                  />
                  Send Invite
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeForm;
