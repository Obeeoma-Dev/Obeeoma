const AddEmployeeForm = () => {
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
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-medium">Reports</label>
                  <select className="form-select">
                    <option>Select report type</option>
                    <option>Wellness Report</option>
                    <option>Performance Report</option>
                    <option>Attendance Report</option>
                  </select>
                </div>
                <button className="btn btn-primary">
                  Add Employee
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