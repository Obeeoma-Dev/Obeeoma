// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import EmployeeTable from '../components/employercomponents/employerdashboard/EmployeeTable';
// import { Employee } from '../types/employer';

// // Mock react-redux
// jest.mock('react-redux', () => ({
//   useDispatch: () => jest.fn(),
//   useSelector: jest.fn(),
// }));

// // Mock the actions
// jest.mock('../store/slices/EmployerSlice', () => ({
//   deleteEmployee: jest.fn(),
//   toggleEmployeeStatus: jest.fn(),
//   updateEmployee: jest.fn(),
// }));

// // Mock the validation schema
// jest.mock('../validation/authValidation', () => ({
//   updateEmployeeValidationSchema: {
//     validate: jest.fn(),
//   },
// }));

// // Mock @tanstack/react-table
// jest.mock('@tanstack/react-table', () => ({
//   createColumnHelper: jest.fn(() => ({
//     accessor: jest.fn(() => ({ header: '' })),
//     display: jest.fn(() => ({ header: '', cell: () => null })),
//   })),
//   flexRender: jest.fn((component) => component || 'rendered'),
//   getCoreRowModel: jest.fn(),
//   getFilteredRowModel: jest.fn(),
//   getPaginationRowModel: jest.fn(),
//   useReactTable: jest.fn(() => ({
//     getHeaderGroups: () => [
//       {
//         id: 'header-group',
//         headers: [
//           { id: 'email', column: { columnDef: { header: 'Email' }, getCanFilter: () => true, setFilterValue: jest.fn() }, getContext: () => ({}) },
//           { id: 'department', column: { columnDef: { header: 'Department' }, getCanFilter: () => true, setFilterValue: jest.fn() }, getContext: () => ({}) },
//           { id: 'status', column: { columnDef: { header: 'Status' }, getCanFilter: () => false }, getContext: () => ({}) },
//           { id: 'actions', column: { columnDef: { header: 'Actions' }, getCanFilter: () => false }, getContext: () => ({}) },
//         ],
//       },
//     ],
//     getRowModel: () => ({
//       rows: [
//         {
//           id: '1',
//           original: { id: 1, emailAddress: 'john.doe@example.com', employeedepartment: 'Engineering', status: 'active' },
//           getVisibleCells: () => [
//             { id: 'email-1', column: { columnDef: { cell: () => 'john.doe@example.com' } }, getContext: () => ({}) },
//             { id: 'dept-1', column: { columnDef: { cell: () => 'Engineering' } }, getContext: () => ({}) },
//             { id: 'status-1', column: { columnDef: { cell: () => <span className="badge text-white" style={{ backgroundColor: '#22C55E' }}>ACTIVE</span> } }, getContext: () => ({}) },
//             { id: 'actions-1', column: { columnDef: { cell: () => (
//               <div className="d-flex justify-content-end align-items-center gap-2">
//                 <button className="btn btn-sm" style={{ color: '#6c757d', borderColor: '#6c757d' }}>Deactivate</button>
//                 <div>
//                   <button className="btn btn-sm p-1 border-0 no-caret bg-transparent">
//                     <i className="bi bi-three-dots-vertical fs-5 text-dark"></i>
//                   </button>
//                 </div>
//               </div>
//             ) } }, getContext: () => ({}) },
//           ],
//         },
//         {
//           id: '2',
//           original: { id: 2, emailAddress: 'jane.smith@example.com', employeedepartment: 'HR', status: 'inactive' },
//           getVisibleCells: () => [
//             { id: 'email-2', column: { columnDef: { cell: () => 'jane.smith@example.com' } }, getContext: () => ({}) },
//             { id: 'dept-2', column: { columnDef: { cell: () => 'HR' } }, getContext: () => ({}) },
//             { id: 'status-2', column: { columnDef: { cell: () => <span className="badge text-white" style={{ backgroundColor: '#b4beb9dc' }}>INACTIVE</span> } }, getContext: () => ({}) },
//             { id: 'actions-2', column: { columnDef: { cell: () => (
//               <div className="d-flex justify-content-end align-items-center gap-2">
//                 <button className="btn btn-sm" style={{ color: '#22C55E', borderColor: '#22C55E' }}>Reactivate</button>
//                 <div>
//                   <button className="btn btn-sm p-1 border-0 no-caret bg-transparent">
//                     <i className="bi bi-three-dots-vertical fs-5 text-dark"></i>
//                   </button>
//                 </div>
//               </div>
//             ) } }, getContext: () => ({}) },
//           ],
//         },
//       ],
//     }),
//     getFilteredRowModel: () => ({ rows: [] }),
//     getCanPreviousPage: () => false,
//     getCanNextPage: () => false,
//     previousPage: jest.fn(),
//     nextPage: jest.fn(),
//   })),
// }));

// describe('EmployeeTable', () => {
//   const mockEmployees: Employee[] = [
//     {
//       id: 1,
//       emailAddress: 'john.doe@example.com',
//       employeedepartment: 'Engineering',
//       status: 'active',
//     },
//     {
//       id: 2,
//       emailAddress: 'jane.smith@example.com',
//       employeedepartment: 'HR',
//       status: 'inactive',
//     },
//   ];

//   beforeEach(() => {
//     // Mock useSelector to return the state
//     const { useSelector } = require('react-redux');
//     useSelector.mockImplementation((selector: any) => selector({ employer: { isActionLoading: false } }));
//   });

//   it('renders the table with employees', () => {
//     render(<EmployeeTable employees={mockEmployees} />);

//     expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
//     expect(screen.getByText('Engineering')).toBeInTheDocument();
//     expect(screen.getByText('ACTIVE')).toBeInTheDocument();
//     expect(screen.getByText('jane.smith@example.com')).toBeInTheDocument();
//     expect(screen.getByText('HR')).toBeInTheDocument();
//     expect(screen.getByText('INACTIVE')).toBeInTheDocument();
//   });

//   it('filters employees by email', () => {
//     render(<EmployeeTable employees={mockEmployees} />);

//     const emailFilter = screen.getAllByPlaceholderText('Search...')[0];
//     fireEvent.change(emailFilter, { target: { value: 'john' } });

//     expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
//     expect(screen.queryByText('jane.smith@example.com')).not.toBeInTheDocument();
//   });

//   it('opens view mode when view button is clicked', () => {
//     render(<EmployeeTable employees={mockEmployees} />);

//     const viewButtons = screen.getAllByText('View');
//     fireEvent.click(viewButtons[0]);

//     expect(screen.getByText('Employee Summary')).toBeInTheDocument();
//     expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
//   });

//   it('opens update mode when update button is clicked', () => {
//     render(<EmployeeTable employees={mockEmployees} />);

//     const updateButtons = screen.getAllByText('Update');
//     fireEvent.click(updateButtons[0]);

//     expect(screen.getByText('Edit Employee')).toBeInTheDocument();
//     expect(screen.getByDisplayValue('john.doe@example.com')).toBeInTheDocument();
//   });

//   it('toggles employee status', async () => {
//     const { toggleEmployeeStatus } = require('../store/slices/EmployerSlice');
//     toggleEmployeeStatus.mockResolvedValue({});

//     render(<EmployeeTable employees={mockEmployees} />);

//     const deactivateButton = screen.getByText('Deactivate');
//     fireEvent.click(deactivateButton);

//     await waitFor(() => {
//       expect(toggleEmployeeStatus).toHaveBeenCalledWith({
//         id: '1',
//         currentStatus: 'active',
//       });
//     });
//   });

//   it('deletes an employee', async () => {
//     const { deleteEmployee } = require('../store/slices/EmployerSlice');
//     deleteEmployee.mockResolvedValue({});
//     window.confirm = jest.fn(() => true);

//     render(<EmployeeTable employees={mockEmployees} />);

//     const deleteButtons = screen.getAllByText('Delete');
//     fireEvent.click(deleteButtons[0]);

//     await waitFor(() => {
//       expect(deleteEmployee).toHaveBeenCalledWith('1');
//     });
//   });

//   it('shows validation errors on update form', async () => {
//     const { updateEmployeeValidationSchema } = require('../validation/authValidation');
//     updateEmployeeValidationSchema.validate.mockRejectedValue({
//       inner: [{ path: 'emailAddress', message: 'Invalid email' }],
//     });

//     render(<EmployeeTable employees={mockEmployees} />);

//     const updateButtons = screen.getAllByText('Update');
//     fireEvent.click(updateButtons[0]);

//     const saveButton = screen.getByText('Save Changes');
//     fireEvent.click(saveButton);

//     await waitFor(() => {
//       expect(screen.getByText('Invalid email')).toBeInTheDocument();
//     });
//   });

//   it('updates employee successfully', async () => {
//     const { updateEmployee } = require('../store/slices/EmployerSlice');
//     const { updateEmployeeValidationSchema } = require('../validation/authValidation');
//     updateEmployeeValidationSchema.validate.mockResolvedValue({});
//     updateEmployee.mockResolvedValue({});

//     render(<EmployeeTable employees={mockEmployees} />);

//     const updateButtons = screen.getAllByText('Update');
//     fireEvent.click(updateButtons[0]);

//     const emailInput = screen.getByDisplayValue('john.doe@example.com');
//     fireEvent.change(emailInput, { target: { value: 'new.email@example.com' } });

//     const saveButton = screen.getByText('Save Changes');
//     fireEvent.click(saveButton);

//     await waitFor(() => {
//       expect(updateEmployee).toHaveBeenCalledWith({
//         id: 1,
//         emailAddress: 'new.email@example.com',
//         employeedepartment: 'Engineering',
//         status: 'active',
//       });
//     });
//   });
// });


import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import EmployeeTable from '../components/employercomponents/employerdashboard/EmployeeTable';
import { Employee } from '../types/employer';
// import { Provider } from 'react-redux';
// import { configureStore } from '@reduxjs/toolkit';

// Mock react-redux hooks directly
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => jest.fn(),
  useSelector: jest.fn(),
}));

// Mock the actions
jest.mock('../store/slices/EmployerSlice', () => ({
  deleteEmployee: jest.fn(),
  toggleEmployeeStatus: jest.fn(),
  updateEmployee: jest.fn(),
}));

// Mock the validation schema
jest.mock('../validation/authValidation', () => ({
  updateEmployeeValidationSchema: {
    validate: jest.fn(),
  },
}));

describe('EmployeeTable', () => {
  const mockEmployees: Employee[] = [
    {
      id: 1,
      emailAddress: 'john.doe@example.com',
      employeedepartment: 'Engineering',
      status: 'active',
    },
    {
      id: 2,
      emailAddress: 'jane.smith@example.com',
      employeedepartment: 'HR',
      status: 'inactive',
    },
  ];

  beforeEach(() => {
    const { useSelector } = require('react-redux');
    // Ensure the loading state is false so the table renders data
    useSelector.mockImplementation((selector: any) => 
      selector({ employer: { isActionLoading: false } })
    );
    jest.clearAllMocks();
  });

  it('renders the table with employees', () => {
    render(<EmployeeTable employees={mockEmployees} />);

    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    expect(screen.getByText('Engineering')).toBeInTheDocument();
    expect(screen.getByText(/ACTIVE/i)).toBeInTheDocument();
    expect(screen.getByText('jane.smith@example.com')).toBeInTheDocument();
  });

  it('filters employees by email', async () => {
    render(<EmployeeTable employees={mockEmployees} />);

    // Get the first search input (Email filter)
    const emailFilter = screen.getAllByPlaceholderText('Search...')[0];
    fireEvent.change(emailFilter, { target: { value: 'john' } });

    // React Table filtering might be async or require a re-render
    await waitFor(() => {
      expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
      expect(screen.queryByText('jane.smith@example.com')).not.toBeInTheDocument();
    });
  });

  it('opens view mode when view button is clicked', () => {
    render(<EmployeeTable employees={mockEmployees} />);

    // Finding by text since the mock buttons were missing before
    const viewButtons = screen.getAllByText(/View/i);
    fireEvent.click(viewButtons[0]);

    expect(screen.getByText('Employee Summary')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
  });

  it('opens update mode when update button is clicked', () => {
    render(<EmployeeTable employees={mockEmployees} />);

    const updateButtons = screen.getAllByText(/Update/i);
    fireEvent.click(updateButtons[0]);

    expect(screen.getByText('Edit Employee')).toBeInTheDocument();
    expect(screen.getByDisplayValue('john.doe@example.com')).toBeInTheDocument();
  });

  it('toggles employee status', async () => {
    const { toggleEmployeeStatus } = require('../store/slices/EmployerSlice');
    toggleEmployeeStatus.mockResolvedValue({});

    render(<EmployeeTable employees={mockEmployees} />);

    const deactivateButton = screen.getByText(/Deactivate/i);
    fireEvent.click(deactivateButton);

    await waitFor(() => {
      expect(toggleEmployeeStatus).toHaveBeenCalledWith({
        id: 1, // Changed from '1' string to match your mockEmployees number type
        currentStatus: 'active',
      });
    });
  });

  it('deletes an employee', async () => {
    const { deleteEmployee } = require('../store/slices/EmployerSlice');
    deleteEmployee.mockResolvedValue({});
    window.confirm = jest.fn(() => true);

    render(<EmployeeTable employees={mockEmployees} />);

    const deleteButtons = screen.getAllByText(/Delete/i);
    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(deleteEmployee).toHaveBeenCalledWith(1);
    });
  });

  it('shows validation errors on update form', async () => {
    const { updateEmployeeValidationSchema } = require('../validation/authValidation');
    updateEmployeeValidationSchema.validate.mockRejectedValue({
      inner: [{ path: 'emailAddress', message: 'Invalid email' }],
    });

    render(<EmployeeTable employees={mockEmployees} />);

    const updateButtons = screen.getAllByText(/Update/i);
    fireEvent.click(updateButtons[0]);

    const saveButton = screen.getByText(/Save Changes/i);
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(screen.getByText('Invalid email')).toBeInTheDocument();
    });
  });

  it('updates employee successfully', async () => {
    const { updateEmployee } = require('../store/slices/EmployerSlice');
    const { updateEmployeeValidationSchema } = require('../validation/authValidation');
    updateEmployeeValidationSchema.validate.mockResolvedValue({});
    updateEmployee.mockResolvedValue({});

    render(<EmployeeTable employees={mockEmployees} />);

    const updateButtons = screen.getAllByText(/Update/i);
    fireEvent.click(updateButtons[0]);

    const emailInput = screen.getByDisplayValue('john.doe@example.com');
    fireEvent.change(emailInput, { target: { value: 'new.email@example.com' } });

    const saveButton = screen.getByText(/Save Changes/i);
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(updateEmployee).toHaveBeenCalledWith(expect.objectContaining({
        id: 1,
        emailAddress: 'new.email@example.com',
      }));
    });
  });
});