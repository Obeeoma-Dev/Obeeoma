import { useState } from "react";
const DEFAULT_FETCH_OPTIONS = {};
// <T> turns this into a generic component. We will take advantage of this 
// by assigning the `data` variable the type T. This way, when we use the hook,
// we can specify what type we expect the data to be. 
export function useFetch({ url, method }) {
    const [isLoading, setIsLoading] = useState(false);
    // assigning the generic type T to our data value here
    const [data, setData] = useState(null);
    const commonFetch = async ({ input, fetchOptions = {}, }) => {
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
    return { isLoading, commonFetch, data };
}
;
