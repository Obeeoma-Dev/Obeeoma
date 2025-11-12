// Inside AddEmployeeForm.tsx

import React from 'react';

// 1. Define the props interface
interface AddEmployeeFormProps {
  onClose: () => void; // A function that takes no arguments and returns nothing
  // Add other props here if needed, e.g., onSubmit
}

// 2. Use the interface in the component function signature
const AddEmployeeForm: React.FC<AddEmployeeFormProps> = ({ onClose }) => {
  // ... form logic ...
  
  return (
    <div className="card p-4">
      <h5 className="card-title">Add New Employee</h5>
      {/* Example button to close the form */}
      <button className="btn btn-sm btn-outline-secondary float-end" onClick={onClose}>
        Close Form
      </button>
      {/* ... your actual form elements ... */}
    </div>
  );
};

export default AddEmployeeForm;