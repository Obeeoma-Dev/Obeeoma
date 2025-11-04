import { useState } from "react";

const DEFAULT_FETCH_OPTIONS = {};

type UseFetchProps = {
  url: string | any;
  method: "GET" | "POST" | "PUT" | "DELETE";
};

type CommonFetch = {
  /** the variables that the endpoint expects to receive */
  input?: Record<string, unknown>;
  /** this allows us to override any default fetch options on a 
  case by case basis. we think of it like an escape hatch. */
  fetchOptions?: RequestInit;
}

// <T> turns this into a generic component. We will take advantage of this 
// by assigning the `data` variable the type T. This way, when we use the hook,
// we can specify what type we expect the data to be. 
export function useFetch<T> ({ url, method }: UseFetchProps) {
  const [isLoading, setIsLoading] = useState(false);
  // assigning the generic type T to our data value here
  const [data, setData] = useState<T | null>(null);

  const commonFetch = async ({
    input,
    fetchOptions = {},
  }: CommonFetch) => {
    setIsLoading(true);

    const response = await fetch(url, {
      method,
      ...DEFAULT_FETCH_OPTIONS, // this should be defined as a const in a separate file
      ...fetchOptions, // this allows you to override any default fetch options on a case by case basis
      body: JSON.stringify(input),
    });

    const data = await response.json();

    setIsLoading(false);
    setData(data);
  };

  return { isLoading, commonFetch, data };};