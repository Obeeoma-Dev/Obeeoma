import React, { useMemo } from 'react';
import { RE_DIGIT } from '../constants'; 

export type Props = {
  value: string;
  valueLength: number;
  onChange: (value: string) => void;
};

export default function OtpInput({ value, valueLength, onChange }: Props) {
  const valueItems = useMemo(() => {
    const valueArray = value.split('');
    const items: Array<string> = [];

    for (let i = 0; i < valueLength; i++) {
      const char = valueArray[i];

      if (RE_DIGIT.test(char)) {
        items.push(char);
      } else {
        items.push('');
      }
    }
    return items;
  }, [value, valueLength]);


  const inputOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const target = e.target;
    let targetValue = target.value;
    const isTargetValueDigit = RE_DIGIT.test(targetValue);
    const targetValueLength = targetValue.length;

    
    if (targetValueLength === 1) {
      if (!isTargetValueDigit) {
        targetValue = '';
      }
      
      const newValue =
        value.substring(0, idx) + targetValue + value.substring(idx + 1);

      onChange(newValue);

      
      if (isTargetValueDigit) {
        const nextElementSibling =
          target.nextElementSibling as HTMLInputElement | null;

        if (nextElementSibling) {
          nextElementSibling.focus();
        }
      }
    } 
    
    else if (targetValueLength === valueLength) {
      if (Array.from(targetValue).every(char => RE_DIGIT.test(char))) {
        onChange(targetValue);
        target.blur();
      }
    }
  };

  const inputOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    // On Backspace with an empty input, focus the previous one
    if (e.key === 'Backspace' && target.value === '') {
      const previousElementSibling =
        target.previousElementSibling as HTMLInputElement | null;

      if (previousElementSibling) {
        previousElementSibling.focus();
      }
    }
  };

  const inputOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const { target } = e;

  
    const prevInputEl =
      target.previousElementSibling as HTMLInputElement | null;

    if (prevInputEl && prevInputEl.value === '') {
      return prevInputEl.focus();
    }

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

  