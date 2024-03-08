"use client";

interface InputProps {
  id: string;
  placeholder: string;
  required: boolean;
  type: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export default function Input({
  id,
  placeholder,
  required = false,
  type,
  onChange,
  disabled = false,
}: InputProps) {
  return (
    <input
      className="py-2 px-1 min-w-0 border rounded-lg"
      type={type}
      id={id}
      placeholder={placeholder}
      required={required}
      onChange={onChange}
      disabled={disabled}
    />
  );
}
