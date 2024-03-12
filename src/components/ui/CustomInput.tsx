import React from "react";
import { useField } from "formik";

interface CustomInputProps {
    label: string;
    name: string;
    type: string;
    placeholder: string;
}

export default function Custominput({ label, ...props }: CustomInputProps) {
    const [field, meta] = useField(props);
    return (
        <div className="relative">
            {meta.touched && meta.error && (
                <span className=" absolute right-0 bg-slate-100 rounded-md p-1 text-gray-700">
                    {meta.error}
                </span>
            )}
            <label
                htmlFor={field.name}
                className={` font-light left-2  md:text-xl text-md transition-all ${
                    meta.touched && meta.error ? " text-red-500" : "text-black"
                }`}
            >
                {label}
            </label>
            <input
                id={field.name}
                {...field}
                {...props}
                className={`block my-2 w-full text-black rounded-lg border  transition-colors autofill:bg-secondary autofill:bg-opacity-10 duration-300 md:text-xl text-md px-3 py-2 ${
                    meta.touched && meta.error
                        ? "border-red-500"
                        : "border-slate-500"
                }`}
            />
        </div>
    );
}
