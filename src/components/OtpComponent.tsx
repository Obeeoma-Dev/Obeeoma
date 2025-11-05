import React, { useMemo } from 'react';
import './OtpInput.css'; 
import { RE_DIGIT } from '../constants'; 

export type Props = {
  value: string;
  valueLength: number;
  onChange: (value: string) => void;
};

export default function OtpInput({ value, valueLength, onChange }: Props) {
  
  // Convert the value string to an array of digits for individual inputs
  const valueItems = useMemo(() => {
    const valueArray = value.split('');
    const items: Array<string> = [];

    for (let i = 0; i < valueLength; i++) {
      const char = valueArray[i];
      items.push(RE_DIGIT.test(char) ? char : '');
    }
    return items;
  }, [value, valueLength]);

  // --- Focus/Navigation Helpers ---
  const focusToNextInput = (target: HTMLElement) => {
    const nextElementSibling =
      target.nextElementSibling as HTMLInputElement | null;

    if (nextElementSibling) {
      nextElementSibling.focus();
    }
  };
  
  const focusToPrevInput = (target: HTMLElement) => {
    const previousElementSibling =
      target.previousElementSibling as HTMLInputElement | null;

    if (previousElementSibling) {
      previousElementSibling.focus();
    }
  };
  

  const inputOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const target = e.target;
    let targetValue = target.value;
    const isTargetValueDigit = RE_DIGIT.test(targetValue);
    
    // --- Input Validation and Handling ---

    // Block non-digit input entirely if value isn't empty
    if (!isTargetValueDigit && targetValue !== '') {
        return;
    }
    
    // Only proceed to delete/overwrite if the next input is empty
    const nextInputEl = target.nextElementSibling as HTMLInputElement | null;
    if (!isTargetValueDigit && nextInputEl && nextInputEl.value !== '') {
        return;
    }

    // Treat non-digit input (which is only possible if it's an empty string) as ' ' for state
    targetValue = isTargetValueDigit ? targetValue : ' ';

    const newValue =
      value.substring(0, idx) + targetValue + value.substring(idx + 1);

    onChange(newValue);

    if (targetValue.length === 1 && isTargetValueDigit) {
      focusToNextInput(target);
    }
  };

  const inputOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    const target = e.target as HTMLInputElement;
    const targetValue = target.value;

    // --- Arrow Key Navigation ---
    if (key === 'ArrowRight' || key === 'ArrowDown') {
      e.preventDefault();
      return focusToNextInput(target);
    }

    if (key === 'ArrowLeft' || key === 'ArrowUp') {
      e.preventDefault();
      return focusToPrevInput(target);
    }
    // ----------------------------

    // --- Backspace Handling ---
    if (e.key === 'Backspace' && targetValue === '') {
      e.preventDefault();
      focusToPrevInput(target);
    }
    
  };

  const inputOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const { target } = e;

    // Keep focusing back until previous input element has value
    const prevInputEl =
      target.previousElementSibling as HTMLInputElement | null;

    if (prevInputEl && prevInputEl.value === '') {
      return prevInputEl.focus();
    }

    // Select all text in the current field (for easy overwrite)
    target.setSelectionRange(0, target.value.length);
  };
  


  return (
    <div className="otp-group">
      {valueItems.map((digit, idx) => (
        <input
          key={idx}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="\d{1}"
          
          maxLength={1} 
          className="otp-input"
          value={digit}
          onChange={(e) => inputOnChange(e, idx)}
          onKeyDown={inputOnKeyDown}
          onFocus={inputOnFocus}
        />
      ))}
    </div>
  );
}