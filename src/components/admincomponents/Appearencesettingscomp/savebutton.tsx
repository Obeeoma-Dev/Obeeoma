// src/components/admincomponents/settingsappearancecomp/SaveButton.tsx
import React from 'react';
import { Button } from 'react-bootstrap';

interface SaveButtonProps {
  onClick: () => void;
}

// This component renders the save button.
const SaveButton: React.FC<SaveButtonProps> = ({ onClick }) => (
  <Button variant="success" onClick={onClick}>
    Save Appearance Settings
  </Button>
);

export default SaveButton;