import React from 'react';
import { Controller, Control } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';

interface CustomPhoneInputProps {
    control: Control<any>;
    name: string;
    inputStyle?: React.CSSProperties;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

const RHFPhoneInput: React.FC<CustomPhoneInputProps> = ({
    control,
    name,
    inputStyle,
    ...props
}) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <PhoneInput
                    {...field}
                    {...props}
                    country="us"
                    enableSearch={true}
                    inputStyle={{
                        ...inputStyle,
                        width: '100%',
                        borderColor: error ? '#dc3545' : inputStyle?.borderColor
                    }}
                    onChange={(value: string) => {
                        field.onChange(value);
                    }}
                />
            )}
        />
    );
};

export default RHFPhoneInput;