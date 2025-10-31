import { useFetch } from "../../hooks/useFetch";
import { CreateEmployeeInput, GetEmployeeInput, Employee } from "./types"


export const useGetEmployee = () => {
 // adding <Employee> after useFetch will give the "data" value the type Employee. 
 // This really helps to flesh out the quality of life for the API and is part
 // of creating something that is self documenting. We put Employee because we know
 // that is what this endpoint will always return. 
  const { commonFetch, isLoading, data } = useFetch<Employee>({
    url: "https://api-0904.onrender.com/api/v1/employees/get",
  });

  // using typescript to define the input here means no mistakes can be
  // made downstream when actually using our API layer
  const getEmployee = (input: GetEmployeeInput) => commonFetch({ input, method: "GET" });

  return { getEmployee, isLoading, data };
};

export const useCreateEmployee = () => {
  const { commonFetch, isLoading, data } = useFetch<Employee>({
    url: "https://api-0904.onrender.com/api/v1/employees/create",
  });

  const createEmployee = (input: CreateEmployeeInput ) => commonFetch({ input, method: "POST" });

  return { createEmployee, isLoading, data };
};