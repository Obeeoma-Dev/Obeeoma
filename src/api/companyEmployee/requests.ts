import { useFetch } from "../../hooks/useFetch";
import { CreateEmployeeInput, GetEmployeeInput, Employee } from "./types"


export const useGetEmployee = () => {
 // adding <Employee> after useFetch will give the "data" value the type Employee. 

  const { commonFetch, isLoading, data } = useFetch<Employee>({
    url: "https://api-0904.onrender.com/api/v1/employees/get",
    method: "GET" 
  });

  const getEmployee = (input: GetEmployeeInput) => commonFetch({ input});
  return { getEmployee, isLoading, data };
};

export const useCreateEmployee = () => {
  const { commonFetch, isLoading, data } = useFetch<Employee>({
    url: "https://api-0904.onrender.com/api/v1/employees/create",
    method: "POST" 
  });

  const createEmployee = (input: CreateEmployeeInput ) => commonFetch({ input });
  return { createEmployee, isLoading, data };
};