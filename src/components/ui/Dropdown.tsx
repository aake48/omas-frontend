import React from "react";

interface DropdownProps {
  id: string;
  disabled?: boolean;
  options: string[];
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
      required={required}
      className="py-2 px-1 min-w-0 border rounded-lg"
      value={selected ?? "none"}
      onChange={onChange}
    >
      <option value="none" hidden disabled>
        Valitse
      </option>
      {options.map((option) => (
        <option key={option} value={ option}>
          {option}
        </option>
      ))}
    </select>
  );
}
