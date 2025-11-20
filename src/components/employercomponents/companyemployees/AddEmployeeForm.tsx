import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "../../../hooks/use-toast";
import { inviteEmployee, fetchEmployeeInvites } from "../../../store/slices/EmployerSlice";
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from "../../../store/store";
import { useState } from "react";

const employeeSchema = z.object({
  email: z.email("Please enter a valid email address").trim(),
  phone: z.string().min(10, "Phone number must be at least 10 digits").max(15, "Phone number too long").optional(),
  department: z.string().min(1, "Please select a department"),
  otherDepartment: z.string().optional(),
});

type EmployeeFormData = z.infer<typeof employeeSchema>;

interface AddEmployeeFormProps {
  showModal: boolean;
  onClose: () => void;
  onEmployeeAdded: () => void;
  companyId?: string;
}

const AddEmployeeForm = ({ showModal, onClose, onEmployeeAdded }: AddEmployeeFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { toast } = useToast();
  const { isActionLoading, error } = useSelector((state: RootState) => state.employer);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");

  const {
    register, handleSubmit, formState: { errors }, reset, watch,
    } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
  });

  const onSubmit = async (data: EmployeeFormData) => {
    try {
      // Transform form data to match API expectations (use email directly, not emailAddress)
      const result = await dispatch(inviteEmployee({
        email: data.email,
        department: data.department,
        
        onSuccess: () => {
          reset();
          onEmployeeAdded();
        },
      }) as any);

      // Check if the thunk was fulfilled
      if (inviteEmployee.fulfilled.match(result)) {
        toast({
          title: "Success",
          description: "Employee invitation sent!",
          message: "Employee invitation sent successfully!",
        });

        reset();
        onEmployeeAdded();
        onClose();
        
        // Refresh the employee invites list
        dispatch(fetchEmployeeInvites());
      } else if (inviteEmployee.rejected.match(result)) {
        toast({
          title: "Error",
          description: (result.payload as string) || "Failed to add employee. Please try again.",
          message: (result.payload as string) || "Failed to add employee. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error adding employee:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred.",
        message: "Failed to add employee. Please try again.",
      });
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!showModal) return null;

  return (
    <div className="modal fade show d-block" tabIndex={-1} role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title fw-semibold">Invite Employee</h5>
            <button 
              type="button" 
              className="close border-0 bg-transparent" 
              onClick={handleClose}
              style={{ fontSize: '1.5rem' }}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group mb-3">
                <label htmlFor="employee-email" className="form-label fw-medium">Email address:</label>
                <input 
                  type="email" 
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  id="employee-email"
                  placeholder="Enter employee email"
                  {...register("email")}
                />
                {errors.email && (
                  <div className="invalid-feedback d-block">
                    {errors.email.message}
                  </div>
                )}
              </div>
              
              <div className="form-group mb-3">
                <label htmlFor="phone" className="form-label fw-medium">Phone number (optional):</label>
                <input
                  type="tel"
                  className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                  id="phone"
                  placeholder="Enter phone number"
                  {...register("phone")}
                />
                {errors.phone && (
                  <div className="invalid-feedback d-block">
                    {errors.phone.message}
                  </div>
                )}
              </div>
              
              <div className="form-group mb-3">
                <label htmlFor="department" className="form-label fw-medium">Department:</label>
                <select 
                  className={`form-select ${errors.department ? 'is-invalid' : ''}`}
                  id="department"
                  {...register("department")}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                >
                  <option value="">Select department</option>
                  <option value="Marketing">Marketing</option>
                  <option value="HR">HR</option>
                  <option value="Finance">Finance</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Other">Other</option>
                </select>
                {errors.department && (
                  <div className="invalid-feedback d-block">
                    {errors.department.message}
                  </div>
                )}
              </div>

              {selectedDepartment === "Other" && (
                <div className="form-group mb-3">
                  <label htmlFor="other-department" className="form-label fw-medium">Please specify other department:</label>
                  <textarea
                    className={`form-control ${errors.otherDepartment ? 'is-invalid' : ''}`}
                    id="other-department"
                    placeholder="Enter your department name"
                    rows={3}
                    {...register("otherDepartment")}
                  />
                  {errors.otherDepartment && (
                    <div className="invalid-feedback d-block">
                      {errors.otherDepartment.message}
                    </div>
                  )}
                </div>
              )}
              
              <div className="form-group mt-1 mb-3">
                <button
                  type="button"
                  className="btn btn-link p-0 text-decoration-none"
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
                  Try bulk add
                </button>
                <br />
                <input type="file" className="form-control-file mt-1" id="upload-excel" accept=".xlsx,.xls,.csv" />
              </div>

              <button
                type="submit"
                className="btn btn-success"
                disabled={isActionLoading}
              >
                {isActionLoading ? 'Adding...' : 'Add Employee'}
              </button>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClose}
              disabled={isActionLoading}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeForm;
