// FormikPhoneInput.tsx (or whatever file FormikPhoneInput is in)

import React from 'react';
import { FieldProps } from 'formik';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';

// 1. Update the interface to include dropdownStyle (and potentially all other props)
interface CustomPhoneInputProps extends FieldProps {
    inputStyle: React.CSSProperties;
    // Add dropdownStyle here to be explicit
    dropdownStyle?: React.CSSProperties; 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any  
    [key: string]: any; // To accept other props passed by FormikField
}

const FormikPhoneInput: React.FC<CustomPhoneInputProps> = ({
    field,
    form: { touched, errors, setFieldValue }, 
    inputStyle,
    ...props // This captures props like dropdownStyle={9999}
}) => {
    const isInvalid = touched[field.name] && errors[field.name];

    return (
        <PhoneInput
            {...field}
            {...props} // This passes the dropdownStyle prop to react-phone-input-2
            country="us"
            enableSearch={true} 
            inputStyle={{ 
                ...inputStyle, 
                width: '100%',
                borderColor: isInvalid ? '#dc3545' : inputStyle.borderColor
            }}
            
            
            onChange={(value: string) => {
                setFieldValue(field.name, value);
            }}
            onBlur={() => {
                field.onBlur({ target: { name: field.name } });
            }}
        />
    );
};

export default FormikPhoneInput;