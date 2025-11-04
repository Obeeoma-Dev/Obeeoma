import { useState } from "react";
import { useForm } from "react-hook-form";
//import * as z from "zod";
import {employerAPI} from "../../../api/apiConfig";

//adding employee prop to notify parent component when a new employee is added
//this will help us refresh the employee list after the employer tries adding a new employee
// interface AddEmployeeFormProps {
//   onEmployeeAdded: (employee: Employee) => void;
// }

const AddEmployeeForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  // existing form setup (if any)
  // For example, using useForm from react-hook-form:
  const createForm = useForm();

  const handleSubmit = async () => {
    const values = createForm.getValues();

    // Call the API function directly if available, otherwise fall back to a fetch to a string endpoint
    try {
      setIsLoading(true);
      if (typeof employerAPI.inviteEmployee === "function") {
        // assume inviteEmployee accepts the payload directly
        await employerAPI.inviteEmployee();
      } else {
        // fallback: treat employerAPI as a string URL
        await fetch(employerAPI as unknown as string, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
      }
      createForm.reset();
      // TODO: notify parent via prop if needed
    } finally {
      setIsLoading(false);
    }
  };

    return (
    <div className="row mt-5">
      <div className="col-12">
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4">
            <h3 className="h5 fw-semibold mb-4">Add Employee</h3>
            <div className="row">
              <div className="col-12 col-md-6">
                <div className="mb-3">
                  <label className="form-label fw-medium">Email</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Enter employee email address"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-medium">Department</label>
                  <select className="form-select">
                    <option>Select department</option>
                    <option>Marketing</option>
                    <option>HR</option>
                    <option>Finance</option>
                    <option>Engineering</option>
                    <option>Other</option>
                  </select>
                </div>
                <button className="btn btn-success"
                  onClick={handleSubmit}
                  disabled={isLoading} >
                  {isLoading ? 'Adding...' : 'Add Employee'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeForm;
