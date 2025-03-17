import React from "react";

interface DropdownProps {
    id?: string;
    name?: string;
    disabled?: boolean;
    options: string[];
    required?: boolean;
    selected?: any;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    value?: any;
}

export default function Dropdown({
    id,
    name,
    disabled = false,
    options,
    required = false,
    selected,
    onChange,
}: DropdownProps) {
    return (
        <select
            id={id ? id : "dropdown"}
            name={name ? name : "dropdown"}
            disabled={disabled}
            required={required}
            className="py-2 text-xl bg-white placeholder:bg-gray-500 border-slate-500 text-black px-3 min-w-0 border rounded-lg"
            value={selected ?? "none"}
            onChange={onChange}
        >
            <option key={"default"} value="none" hidden disabled>
                Valitse
            </option>
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
}
