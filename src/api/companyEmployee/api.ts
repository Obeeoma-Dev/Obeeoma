// import { useGetEmployee, useCreateEmployee } from "./requests";

// export const useEmployeeApi = () => {
//   const {
//     getEmployee,
//     isLoading: getEmployeeLoading,
//     data: getEmployeeData,
//   } = useGetEmployee();

//   const {
//     createEmployee,
//     isLoading: createEmployeeLoading,
//     data: createEmployeeData,
//   } = useCreateEmployee();

//   return {
//     getEmployee: {
//       query: getEmployee,
//       isLoading: getEmployeeLoading,
//       data: getEmployeeData,
//     },
//     createEmployee: {
//       mutation: createEmployee,
//       isLoading: createEmployeeLoading,
//       data: createEmployeeData,
//     },
//   };
// };