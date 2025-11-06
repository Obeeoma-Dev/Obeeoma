import { useForm } from "react-hook-form";
import { useFetch } from "../../../hooks/useFetch";
import { Employee } from "../../../api/companyEmployee/types";
//import * as z from "zod";

//adding employee prop to notify parent component when a new employee is added
//this will help us refresh the employee list after the employer tries adding a new employee
// interface AddEmployeeFormProps {
//   onEmployeeAdded: (employee: Employee) => void;
// }

const AddEmployeeForm = () => {
  const { commonFetch, isLoading } = useFetch<Employee>({ url: 'https://api-0904.onrender.com/api/v1/dashboard/employees/', method: 'POST' });

  // existing form setup (if any)
  // For example, using useForm from react-hook-form:
  const createForm = useForm();

  const handleSubmit = async () => {
    const values = createForm.getValues();

    // Call the fetch function with the form data
    await commonFetch({ input: values });
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
                  <label className="form-label fw-medium">Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Enter employee name"
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
