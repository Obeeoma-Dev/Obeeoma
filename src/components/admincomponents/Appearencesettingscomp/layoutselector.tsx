// src/components/admincomponents/settingsappearancecomp/LayoutSelector.tsx
import React from 'react';
import { Form } from 'react-bootstrap';

interface LayoutSelectorProps {
  selectedLayout: string;
  onChange: (layout: string) => void;
}

// This component renders radio buttons for selecting dashboard layout.
const LayoutSelector: React.FC<LayoutSelectorProps> = ({ selectedLayout, onChange }) => {
  const layouts = ['Default', 'Compact'];

  return (
    <Form.Group>
      <Form.Label>Dashboard Layout</Form.Label>
      {layouts.map((layout) => (
        <Form.Check
          key={layout}
          type="radio"
          label={layout}
          name="layout"
          value={layout}
          checked={selectedLayout === layout}
          onChange={() => onChange(layout)}
        />
      ))}
    </Form.Group>
  );
};

export default LayoutSelector;