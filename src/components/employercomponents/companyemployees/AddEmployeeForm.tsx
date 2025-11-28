import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { employerAPI } from "../../../api/apiConfig";
import { useToast } from "../../../hooks/use-toast";
import { useState } from "react";
import { UserPlus, Mail, Phone, Building, Upload } from "lucide-react";

const employeeSchema = z.object({
  email: z.email("Please enter a valid email address").trim(),
  phone: z.string().min(10, "Phone number must be at least 10 digits").max(15, "Phone number too long").optional(),
  department: z.string().min(1, "Please select a department"),
});

type EmployeeFormData = z.infer<typeof employeeSchema>;

interface AddEmployeeFormProps {
  showModal: boolean;
  onClose: () => void;
  onEmployeeAdded: () => void;
}

const AddEmployeeForm = ({ showModal, onClose, onEmployeeAdded }: AddEmployeeFormProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register, handleSubmit, formState: { errors }, reset,
    } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
  });

  const onSubmit = async (data: EmployeeFormData) => {
    console.log('Form data:', data);
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
    <div className="modal fade show d-block" tabIndex={-1} role="dialog" style={{
      backgroundColor: 'rgba(0,0,0,0.6)',
      backdropFilter: 'blur(4px)'
    }}>
      <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div className="modal-content border-0 shadow-lg" style={{
          borderRadius: '16px',
          background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
        }}>
          <div className="modal-header border-0 pb-0">
            <div className="d-flex align-items-center">
              <div className="bg-success bg-opacity-10 p-2 rounded-circle me-3">
                <UserPlus size={24} className="text-success" />
              </div>
              <div>
                <h4 className="modal-title fw-bold mb-0 text-dark">Invite New Employee</h4>
                <p className="text-muted small mb-0">Send an invitation to join your organization</p>
              </div>
            </div>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
              aria-label="Close"
              style={{ filter: 'none' }}
            />
          </div>

          <div className="modal-body px-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row g-3">
                <div className="col-12">
                  <label htmlFor="employee-email" className="form-label fw-semibold text-dark mb-2">
                    <Mail size={16} className="me-2 text-primary" />
                    Email Address <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    className={`form-control form-control-lg ${errors.email ? 'is-invalid' : ''}`}
                    id="employee-email"
                    placeholder="employee@company.com"
                    style={{
                      borderRadius: '8px',
                      border: '2px solid #e9ecef',
                      transition: 'all 0.2s ease'
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
                  <label htmlFor="phone" className="form-label fw-semibold text-dark mb-2">
                    <Phone size={16} className="me-2 text-primary" />
                    Phone Number <span className="text-muted">(Optional)</span>
                  </label>
                  <input
                    type="tel"
                    className={`form-control form-control-lg ${errors.phone ? 'is-invalid' : ''}`}
                    id="phone"
                    placeholder="+1 (555) 123-4567"
                    style={{
                      borderRadius: '8px',
                      border: '2px solid #e9ecef',
                      transition: 'all 0.2s ease'
                    }}
                    {...register("phone")}
                  />
                  {errors.phone && (
                    <div className="invalid-feedback d-block mt-2">
                      {errors.phone.message}
                    </div>
                  )}
                </div>

                <div className="col-12">
                  <label htmlFor="department" className="form-label fw-semibold text-dark mb-2">
                    <Building size={16} className="me-2 text-primary" />
                    Department <span className="text-danger">*</span>
                  </label>
                  <select
                    className={`form-select form-select-lg ${errors.department ? 'is-invalid' : ''}`}
                    id="department"
                    style={{
                      borderRadius: '8px',
                      border: '2px solid #e9ecef',
                      transition: 'all 0.2s ease'
                    }}
                    {...register("department")}
                  >
                    <option value="">Select department</option>
                    <option value="Marketing">📈 Marketing</option>
                    <option value="HR">👥 Human Resources</option>
                    <option value="Finance">💰 Finance</option>
                    <option value="Engineering">⚙️ Engineering</option>
                    <option value="Operations">🏭 Operations</option>
                    <option value="Sales">🎯 Sales</option>
                    <option value="Customer Service">🎧 Customer Service</option>
                    <option value="Other">📋 Other</option>
                  </select>
                  {errors.department && (
                    <div className="invalid-feedback d-block mt-2">
                      {errors.department.message}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 p-3 bg-light rounded-3 border">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <Upload size={18} className="text-primary me-2" />
                    <span className="fw-medium text-dark">Bulk Import</span>
                  </div>
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-sm"
                    title="Upload an excel document"
                    onClick={(e) => {
                      e.preventDefault();
                      const input = document.getElementById('upload-excel') as HTMLInputElement | null;
                      if (!input) return;
                      const onChange = () => {
                        const file = input.files?.[0];
                        if (!file) return;
                        toast({
                          title: 'File selected',
                          description: file.name,
                          message: file.name,
                        });
                        input.removeEventListener('change', onChange);
                        // TODO: process or upload the file here (e.g. send to API or parse client-side)
                      };
                      input.addEventListener('change', onChange);
                      input.click();
                    }}
                  >
                    Choose File
                  </button>
                </div>
                <p className="text-muted small mt-2 mb-0">
                  Upload a CSV or Excel file to invite multiple employees at once
                </p>
                <input type="file" className="d-none" id="upload-excel" accept=".xlsx,.xls,.csv" />
              </div>
            </form>
          </div>

          <div className="modal-footer border-0 pt-0">
            <button
              type="button"
              className="btn btn-outline-secondary px-4 py-2"
              onClick={handleClose}
              disabled={isLoading}
              style={{ borderRadius: '8px' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-success px-4 py-2 d-flex align-items-center"
              disabled={isLoading}
              onClick={handleSubmit(onSubmit)}
              style={{
                borderRadius: '8px',
                fontWeight: '600',
                minWidth: '140px'
              }}
            >
              {isLoading ? (
                <>
                  <div className="spinner-border spinner-border-sm me-2" role="status"></div>
                  Sending...
                </>
              ) : (
                <>
                  <UserPlus size={18} className="me-2" />
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
