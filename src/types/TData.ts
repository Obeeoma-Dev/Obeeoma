export interface EmployerUser {
  id: string | number;
  username: string;
  firstName: string;
  lastName: string;
  organizationName: string;
  email: string;
  role: 'admin' | 'employer' | 'employee' | string;
  dateJoined: string; // ISO date string

  company? : {
    id: string | number;
    name: string;
    createdAt: string;
  }
  address?: string;
  phone?: string;
}
//TData
type Employee = {
  firstName: string
  lastName: string
  age: number
  visits: number
  progress: number
  status: string
}