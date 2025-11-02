import React from 'react';
import './OtpInput.css' // Assuming the import is to a CSS file for styling

export default function OtpInput() {
  return (
    <div className="otp-group">
      {[1, 2, 3, 4, 5, 6].map((digit, idx) => (
        <input
          key={idx}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="\d{1}"
          maxLength={1} // The image shows maxLength={6} but only 1 digit is intended per box
          className="otp-input"
        />
      ))}
    </div>
  );
}