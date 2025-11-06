// src/components/admincomponents/settingsappearancecomp/AccentColorSelector.tsx
import React from 'react';
import { Form } from 'react-bootstrap';

interface AccentColorSelectorProps {
  selectedColor: string;
  onChange: (color: string) => void;
}

// This component renders radio buttons for selecting an accent color.
const AccentColorSelector: React.FC<AccentColorSelectorProps> = ({ selectedColor, onChange }) => {
  const colors = ['Green', 'Red', 'Blue', 'Purple'];

  return (
    <Form.Group>
      <Form.Label>Accent Color</Form.Label>
      {colors.map((color) => (
        <Form.Check
          key={color}
          type="radio"
          label={color}
          name="accentColor"
          value={color}
          checked={selectedColor === color}
          onChange={() => onChange(color)}
        />
      ))}
    </Form.Group>
  );
};

export default AccentColorSelector;