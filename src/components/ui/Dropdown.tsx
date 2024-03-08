import React from "react";

interface DropdownProps {
  id: string;
  disabled?: boolean;
  options: any[];
  required?: boolean;
  selected?: any;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: any;
}

export default function Dropdown({
  id,
  disabled = false,
  options,
  required = false,
  selected,
  onChange,
}: DropdownProps) {
  return (
    <select
      id={id}
      disabled={disabled}
      className="py-2 px-1 min-w-0 border rounded-lg"
      value={selected?.id}
      required={required}
      onChange={onChange}
    >
      {options.map((option) => (
        <option key={option.name ?? option} value={option.name ?? option}>
          {option.name ?? option}
        </option>
      ))}
    </select>
  );
}
