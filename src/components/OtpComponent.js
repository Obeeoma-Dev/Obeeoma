import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo } from 'react';
import './OtpInput.css';
import { RE_DIGIT } from '../constants';
export default function OtpInput({ value, valueLength, onChange }) {
    // Convert the value string to an array of digits for individual inputs
    const valueItems = useMemo(() => {
        const valueArray = value.split('');
        const items = [];
        for (let i = 0; i < valueLength; i++) {
            const char = valueArray[i];
            items.push(RE_DIGIT.test(char) ? char : '');
        }
        return items;
    }, [value, valueLength]);
    // --- Focus/Navigation Helpers ---
    const focusToNextInput = (target) => {
        const nextElementSibling = target.nextElementSibling;
        if (nextElementSibling) {
            nextElementSibling.focus();
        }
    };
    const focusToPrevInput = (target) => {
        const previousElementSibling = target.previousElementSibling;
        if (previousElementSibling) {
            previousElementSibling.focus();
        }
    };
    const inputOnChange = (e, idx) => {
        const target = e.target;
        let targetValue = target.value;
        const isTargetValueDigit = RE_DIGIT.test(targetValue);
        // --- Input Validation and Handling ---
        // Block non-digit input entirely if value isn't empty
        if (!isTargetValueDigit && targetValue !== '') {
            return;
        }
        // Only proceed to delete/overwrite if the next input is empty
        const nextInputEl = target.nextElementSibling;
        if (!isTargetValueDigit && nextInputEl && nextInputEl.value !== '') {
            return;
        }
        // Treat non-digit input (which is only possible if it's an empty string) as ' ' for state
        targetValue = isTargetValueDigit ? targetValue : ' ';
        const newValue = value.substring(0, idx) + targetValue + value.substring(idx + 1);
        onChange(newValue);
        if (targetValue.length === 1 && isTargetValueDigit) {
            focusToNextInput(target);
        }
    };
    const inputOnKeyDown = (e) => {
        const { key } = e;
        const target = e.target;
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
    const inputOnFocus = (e) => {
        const { target } = e;
        // Keep focusing back until previous input element has value
        const prevInputEl = target.previousElementSibling;
        if (prevInputEl && prevInputEl.value === '') {
            return prevInputEl.focus();
        }
        // Select all text in the current field (for easy overwrite)
        target.setSelectionRange(0, target.value.length);
    };
    return (_jsx("div", { className: "otp-group", children: valueItems.map((digit, idx) => (_jsx("input", { type: "text", inputMode: "numeric", autoComplete: "one-time-code", pattern: "\\d{1}", maxLength: 1, className: "otp-input", value: digit, onChange: (e) => inputOnChange(e, idx), onKeyDown: inputOnKeyDown, onFocus: inputOnFocus }, idx))) }));
}
