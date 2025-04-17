import React, { useState } from "react";
import { useField } from "formik";
import { Eye, EyeOff } from "lucide-react"; // Lucide-kuvakkeet, voit vaihtaa muihin

interface CustomInputProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
}

export default function CustomInput({ label, type, ...props }: Readonly<CustomInputProps>) {
  const [field, meta] = useField(props);
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="relative">
      {meta.touched && meta.error && (
        <span
          className={`absolute ${type !== "date" ? "-bottom-5" : "-bottom-[60px]"} left-1 text-sm bg-red-100 rounded-b-md p-1 text-red-700`}
        >
          {meta.error}
        </span>
      )}
      <label
        htmlFor={field.name}
        className={`font-light left-2 md:text-xl text-md transition-all ${
          meta.touched && meta.error ? "text-red-500" : "text-black"
        }`}
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={field.name}
          {...field}
          {...props}
          type={inputType}
          value={field.value ?? ""}
          className={`block z-50 my-2 w-full hover:bg-slate-100 focus:bg-slate-100 text-black rounded-lg border transition-colors duration-300 md:text-xl text-md px-3 py-2 pr-10 ${
            meta.touched && meta.error ? "border-red-500" : "border-slate-500"
          }`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[50%] translate-y-[-50%] text-slate-600 hover:text-black"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
    </div>
  );
}
