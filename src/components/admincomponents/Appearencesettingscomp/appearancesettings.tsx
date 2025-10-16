// src/pages/Systemadmin/Settingspages/appearancesettings.tsx
import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import ThemeSelector from './themeselector';
import AccentColorSelector from './accentcolourselector';
import LayoutSelector from './layoutselector';
import SaveButton from './savebutton';

// This page renders the full Appearance Settings interface.
const AppearanceSettings: React.FC = () => {
  // Local state for each setting
  const [theme, setTheme] = useState('Light');
  const [accentColor, setAccentColor] = useState('Green');
  const [layout, setLayout] = useState('Default');

  // Placeholder save function (ready to connect to backend)
  const handleSave = () => {
    console.log('Saving settings:', { theme, accentColor, layout });
    // Future: send to backend via API call
  };

  return (
    <Container fluid>
      <Row>
        <Col md={10}>
          
          <Card className="mt-4 p-4">
            <h4>Appearance Settings</h4>
            <ThemeSelector selectedTheme={theme} onChange={setTheme} />
            <AccentColorSelector selectedColor={accentColor} onChange={setAccentColor} />
            <LayoutSelector selectedLayout={layout} onChange={setLayout} />
            <div className="mt-3">
              <SaveButton onClick={handleSave} />
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AppearanceSettings;