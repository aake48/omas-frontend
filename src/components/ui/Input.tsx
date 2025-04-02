"use client";

import React from "react";

interface InputProps {
  id: string;
  placeholder: string;
  required: boolean;
  type: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  value?: string;
}

export default function Input({
  id,
  placeholder,
  required = false,
  type,
  onChange,
  disabled = false,
  value,
}: Readonly<InputProps>) {
  return (
    <input
      className="py-2 px-1 min-w-0 border rounded-lg"
      type={type}
      id={id}
      placeholder={placeholder}
      required={required}
      onChange={onChange}
      disabled={disabled}
      value={value}
    />
  );
}
