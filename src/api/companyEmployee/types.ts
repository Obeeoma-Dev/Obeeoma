export interface CreateEmployeeInput {
  name?: string;
  //email: string;
  department?: string;
  [key: string]: any;
}

export interface GetEmployeeInput {
  id?: number;
  email?: string;
  [key: string]: any;
}

export interface Employee {
  id: number;
  name: string;
  email: string;
  department?: string;
  status?: string;
  [key: string]: any;
}
