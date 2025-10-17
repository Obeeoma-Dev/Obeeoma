// src/components/admincomponents/settingsappearancecomp/ThemeSelector.tsx
import React from 'react';
import { Form } from 'react-bootstrap';

interface ThemeSelectorProps {
  selectedTheme: string;
  onChange: (theme: string) => void;
}

// This component renders radio buttons for selecting the theme.
const ThemeSelector: React.FC<ThemeSelectorProps> = ({ selectedTheme, onChange }) => {
  const themes = ['Light', 'Dark', 'System'];

  return (
    <Form.Group>
      <Form.Label>Theme</Form.Label>
      {themes.map((theme) => (
        <Form.Check
          key={theme}
          type="radio"
          label={theme}
          name="theme"
          value={theme}
          checked={selectedTheme === theme}
          onChange={() => onChange(theme)}
        />
      ))}
    </Form.Group>
  );
};

export default ThemeSelector;