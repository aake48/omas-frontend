import React from "react";

interface InputProps {
  id: string;
  placeholder: string;
  required: boolean;
  type: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}
export default function Input({
  id,
  placeholder,
  required,
  type,
  onChange,
  value,
}: InputProps) {
  return (
    <input
      className="py-2 px-1 min-w-0 border rounded-lg"
      type={type}
      id={id}
      placeholder={placeholder}
      required={required}
      onChange={onChange}
      value={value}
    />
  );
}
