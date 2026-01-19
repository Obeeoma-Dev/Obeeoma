// PatientSearchFilter.tsx
// Provides search input and filter controls for patient engagement table

import React, { useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import "./engagement.css"


const PatientSearchFilter: React.FC = () => {
  // Local state to hold search input value
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Handler for input change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value);
  };

  // Handler for search button click (stubbed for now)
  const handleSearch = (): void => {
    // TODO: Implement search logic or lift state to parent
    console.log("Searching for:", searchTerm);
  };

  return (
    <Form className="mb-3">
      <InputGroup>
        {/* Search input field */}
        <Form.Control
          type="text"
          placeholder="Search patients by name or organization..."
          value={searchTerm}
          onChange={handleChange}
          aria-label="Search patients"
        />

        {/* Search button */}
        <Button className="btn-search" onClick={handleSearch}>
          Search
        </Button>
      </InputGroup>
    </Form>
  );
};

export default PatientSearchFilter;
