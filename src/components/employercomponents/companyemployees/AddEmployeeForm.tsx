import { useForm } from "react-hook-form";
import { useFetch } from "../../../hooks/useFetch";
import { Employee } from "../../../api/companyEmployee/types";
<<<<<<< HEAD

//import * as z from "zod";
import {employerAPI} from "../../../api/apiConfig";
=======
//import * as z from "zod";
>>>>>>> syda

//adding employee prop to notify parent component when a new employee is added
//this will help us refresh the employee list after the employer tries adding a new employee
// interface AddEmployeeFormProps {
//   onEmployeeAdded: (employee: Employee) => void;
// }

const AddEmployeeForm = () => {
<<<<<<< HEAD
  const { commonFetch, isLoading } = useFetch<Employee>({ url: employerAPI.inviteEmployee.toString(), method: 'POST' });
=======
  const { commonFetch, isLoading } = useFetch<Employee>({ url: 'https://api-0904.onrender.com/api/v1/dashboard/employees/', method: 'POST' });
>>>>>>> syda

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
<<<<<<< HEAD
                  <label className="form-label fw-medium">Email</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Enter employee email address"
=======
                  <label className="form-label fw-medium">Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Enter employee name"
>>>>>>> syda
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
