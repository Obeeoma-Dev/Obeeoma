import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Define the form schema with Zod
const employeeSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits").max(15, "Phone number too long"),
  department: z.string().min(1, "Please select a department"),
});

type EmployeeFormData = z.infer<typeof employeeSchema>;

interface AddEmployeeFormProps {
  showModal: boolean;
  onClose: () => void;
  onEmployeeAdded: () => void;
}

const AddEmployeeForm = ({ showModal, onClose, onEmployeeAdded }: AddEmployeeFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
  });

  const onSubmit = async (data: EmployeeFormData) => {
    try {
      setIsLoading(true);
      console.log("Employee data:", data);
      // TODO: Replace with actual API call
      // await employerAPI.inviteEmployee(data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      reset();
      onEmployeeAdded();
      onClose();
    } catch (error) {
      console.error("Error adding employee:", error);
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
                <label htmlFor="phone" className="form-label fw-medium">Phone number:</label>
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
              
              <div className="form-group mb-3">
                <a href="#" className="text-decoration-none" title="Upload an excel document">
                  Try bulk add
                </a>
                <input type="file" className="form-control-file mt-1" id="upload-excel" />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button 
              type="button" 
              className="btn btn-success" 
              onClick={handleSubmit(onSubmit)}
              disabled={isLoading}
            >
              {isLoading ? 'Adding...' : 'Add Employee'}
            </button>
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={handleClose}
              disabled={isLoading}
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