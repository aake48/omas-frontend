import React from 'react';
import { useField } from 'formik';

interface CustomInputProps {
    label: string;
    name: string;
    type: string;
    placeholder: string;
}

export default function Custominput({ label, ...props }: CustomInputProps) {
    const [field, meta] = useField(props);
    return (
        <div>
            <label
                htmlFor={field.name}
                className={` pointer-events-none font-light left-2 text-black md:text-xl text-md transition-all peer-focus:font-medium peer-focus:text-light ${
                    meta.touched && meta.error
                        ? 'peer-placeholder-shown:text-red-500'
                        : 'peer-placeholder-shown:text-light'
                }`}
            >
                {label}
            </label>
            <input
                id={field.name}
                {...field}
                {...props}
                className={`peer block my-2 w-full text-black border-gray-400 rounded-lg border transition-colors autofill:bg-secondary autofill:bg-opacity-10 duration-300 md:text-xl text-md focus:bg-secondary focus:bg-opacity-10 border-transparent border-b-light-active p-3 px-2 py-1 outline-none ${
                    meta.touched && meta.error
                        ? 'border-red-500'
                        : 'border-transparent'
                    }`
                }
                />
                
        </div>
    );
}
