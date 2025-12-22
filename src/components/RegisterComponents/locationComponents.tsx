import React, { FC } from "react";
import Form from "react-bootstrap/Form";
import AsyncSelect from "react-select/async";

// --- 1. INTERFACES AND TYPES ---
export interface LocationOption {
  label: string;
  value: string;
}

export interface SearchableLocationProps {
  onSelectLocation: (location: LocationOption | null) => void;
  // The currently selected value (controlled component pattern)
  value: LocationOption | null;
}

// --- 2. SIMULATE EXTERNAL API CALL ---
/**
 * A mock function to simulate fetching data from a Geo-Location API
 * based on the user's input (inputValue).
 */
const mockFetchLocations = (inputValue: string): Promise<LocationOption[]> => {
  // Mock dataset that includes African, European, and US locations
  const MOCK_DATA: LocationOption[] = [
    { label: "New York, USA", value: "US-NY" },
    { label: "California, USA", value: "US-CA" },
    { label: "Lagos, Nigeria", value: "NG-LAGOS" },
    { label: "Abuja, Nigeria", value: "NG-ABUJA" },
    { label: "Accra, Ghana", value: "GH-ACCRA" },
    { label: "Dakar, Senegal", value: "SN-DAKAR" },
    { label: "Nairobi, Kenya", value: "KE-NAIROBI" },
    { label: "Johannesburg, S. Africa", value: "ZA-JHB" },
    { label: "London, UK", value: "GB-LON" },
    { label: "Paris, France", value: "FR-PARIS" },
    { label: "Berlin, Germany", value: "DE-BERLIN" },
    { label: "Cairo, Egypt", value: "EG-CAIRO" },
  ];

  if (!inputValue || inputValue.length < 2) {
    return Promise.resolve([]); // Do not search if input is too short
  }

  const lowerCaseInput = inputValue.toLowerCase();

  // Simulate network delay
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredOptions = MOCK_DATA.filter((location) =>
        location.label.toLowerCase().includes(lowerCaseInput),
      );
      resolve(filteredOptions);
    }, 500); // 500ms debounce/API delay
  });
};

const customStyles = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: (provided: any, state: any) => ({
    ...provided,
    // Mimic Bootstrap's Form.Control height/padding/border
    minHeight: "calc(1.5em + 0.75rem + 2px)",
    padding: "0",
    borderRadius: ".25rem",
    borderColor: state.isFocused ? "#80bdff" : provided.borderColor,
    boxShadow: state.isFocused
      ? "0 0 0 0.2rem rgba(0, 123, 255, 0.25)"
      : provided.boxShadow,
    "&:hover": {
      borderColor: state.isFocused ? "#80bdff" : provided.borderColor,
    },
  }),
  // Remove default padding inside the control to make it align with Form.Control
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  valueContainer: (provided: any) => ({
    ...provided,
    padding: "0.375rem 0.75rem",
  }),
  indicatorSeparator: () => ({ display: "none" }),
};

export const SearchableLocationDropdown: FC<SearchableLocationProps> = ({
  onSelectLocation,
  value,
}) => {
  //AsyncSelect handles debouncing internally.

  const loadOptions = (
    inputValue: string,
    callback: (options: LocationOption[]) => void,
  ) => {
    mockFetchLocations(inputValue).then(callback);
  };

  // The onChange handler for AsyncSelect
  const handleSelectChange = (selectedOption: LocationOption | null) => {
    // selectedOption is null if the user clears the selection
    onSelectLocation(selectedOption);
  };

  return (
    <Form.Group className="mb-3">
      <Form.Label>🌍 Search for Location (Country/City)</Form.Label>
      <AsyncSelect<LocationOption> // Explicitly typing AsyncSelect for better safety
        cacheOptions
        defaultOptions
        loadOptions={loadOptions}
        onChange={handleSelectChange}
        value={value}
        isClearable
        placeholder="Start typing a city or country..."
        styles={customStyles}
        // Helpers for react-select to work with LocationOption type
        getOptionLabel={(option) => option.label}
        getOptionValue={(option) => option.value}
      />
      <Form.Text muted>
        Type at least 2 characters to see search results.
      </Form.Text>
    </Form.Group>
  );
};
// import React from 'react';
// import Form from 'react-bootstrap/Form';
// import AsyncSelect from 'react-select/async';
// import { FC } from 'react';

// export interface LocationOption {
//   label: string; // The display name (e.g., "Lagos, Nigeria")
//   value: string; // The unique identifier (e.g., "NG-LAGOS")
// }

// /** Defines the props for the SearchableLocationDropdown component. */
// export interface SearchableLocationProps {
//   // Function to call when a new value is selected
//   onSelectLocation: (location: LocationOption | null) => void;
//   // The currently selected value (controlled component pattern)
//   value: LocationOption | null;
// }
// // --- 1. SIMULATE EXTERNAL API CALL ---
// /**
//  * A mock function to simulate fetching data from a Geo-Location API
//  * based on the user's input (inputValue).
//  * In a real app, this would be an actual 'axios' or 'fetch' call.
//  */
// const mockFetchLocations = (inputValue: string): Promise<LocationOption[]> => {
//   // Mock dataset that includes African, European, and US locations
//   const MOCK_DATA: LocationOption[] = [
//     { label: "New York, USA", value: "US-NY" },
//     { label: "California, USA", value: "US-CA" },
//     { label: "Lagos, Nigeria", value: "NG-LAGOS" },
//     { label: "Abuja, Nigeria", value: "NG-ABUJA" },
//     { label: "Accra, Ghana", value: "GH-ACCRA" },
//     { label: "Dakar, Senegal", value: "SN-DAKAR" },
//     { label: "Nairobi, Kenya", value: "KE-NAIROBI" },
//     { label: "Johannesburg, S. Africa", value: "ZA-JHB" },
//     { label: "London, UK", value: "GB-LON" },
//     { label: "Paris, France", value: "FR-PARIS" },
//     { label: "Berlin, Germany", value: "DE-BERLIN" },
//     { label: "Cairo, Egypt", value: "EG-CAIRO" },
//   ];

//   if (!inputValue || inputValue.length < 2) {
//     return Promise.resolve([]); // Do not search if input is too short
//   }

//   const lowerCaseInput = inputValue.toLowerCase();

//   // Simulate network delay
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       const filteredOptions = MOCK_DATA.filter(location =>
//         location.label.toLowerCase().includes(lowerCaseInput)
//       );
//       resolve(filteredOptions);
//     }, 500); // 500ms debounce/API delay
//   });
// };

// const customStyles = {
//   control: (provided: any, state: any) => ({
//     ...provided,
//     // Mimic Bootstrap's Form.Control height/padding/border
//     minHeight: 'calc(1.5em + 0.75rem + 2px)',
//     padding: '0',
//     borderRadius: '.25rem',
//     borderColor: state.isFocused ? '#80bdff' : provided.borderColor,
//     boxShadow: state.isFocused ? '0 0 0 0.2rem rgba(0, 123, 255, 0.25)' : provided.boxShadow,
//     '&:hover': {
//         borderColor: state.isFocused ? '#80bdff' : provided.borderColor,
//     }
//   }),
//   // Remove default padding inside the control to make it align with Form.Control
//   valueContainer: (provided: any) => ({
//     ...provided,
//     padding: '0.375rem 0.75rem',
//   }),
//   indicatorSeparator: () => ({ display: 'none' }),
// };

// // --- 3. THE REACT COMPONENT ---
// export const SearchableLocationDropdown: FC<SearchableLocationProps> = ({
//   onSelectLocation,
//   value,
// }) => {
//   // loadOptions is the function passed to AsyncSelect that handles fetching
//   // It receives the input value and the callback function for loaded options
//   const loadOptions = (inputValue: string, callback: (options: LocationOption[]) => void) => {
//     mockFetchLocations(inputValue).then(callback);
//   };

//   // The onChange handler for AsyncSelect
//   const handleSelectChange = (
//     selectedOption: LocationOption | null,
//   ) => {
//     // selectedOption is null if the user clears the selection
//     onSelectLocation(selectedOption);
//   };

//   return (
//     <Form.Group className="mb-3">
//       <Form.Label>🌍 Search for Location (Country/City)</Form.Label>
//       <AsyncSelect
//         cacheOptions
//         defaultOptions
//         loadOptions={loadOptions}
//         onChange={handleSelectChange}
//         value={value}
//         isClearable
//         placeholder="Start typing a city or country..."
//         styles={customStyles}
//         // TypeScript helper for options
//         getOptionLabel={(option: LocationOption) => option.label}
//         getOptionValue={(option: LocationOption) => option.value}
//       />
//       <Form.Text muted>
//         Type at least 2 characters to see search results.
//       </Form.Text>
//     </Form.Group>
//   );
// };

// // App.tsx or ParentForm.tsx
// // import React, { useState } from 'react';
// // import Container from 'react-bootstrap/Container';
// // import { SearchableLocationDropdown } from './SearchableLocationDropdown';
// // import { LocationOption } from './types';

// // const ParentForm: React.FC = () => {
// //   const [selectedLocation, setSelectedLocation] = useState<LocationOption | null>(null);

// //   const handleLocationChange = (location: LocationOption | null) => {
// //     setSelectedLocation(location);
// //   };

// //   return (
// //     <Container className="p-4">
// //       <h2>Location Selector</h2>
// //       <SearchableLocationDropdown
// //         value={selectedLocation}
// //         onSelectLocation={handleLocationChange}
// //       />

// //       {/* Display the selected value for demonstration */}
// //       <div className="mt-3 p-3 bg-light border">
// //         Selected Value: **{selectedLocation?.value || 'None'}**
// //       </div>
// //     </Container>
// //   );
// // };

// // export default ParentForm;
