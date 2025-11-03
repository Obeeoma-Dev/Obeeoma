export type GetEmployeeInput = { id: string }

export type CreateEmployeeInput = { 
  emailAddress: string;
  department: string,
}

export type Employee = {
  id: string;
  emailAddress: string;
  department: string;
  createdOn: string;
  createdBy: string
}
