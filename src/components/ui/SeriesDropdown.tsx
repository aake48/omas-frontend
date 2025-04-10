import React from "react";

interface DropdownProps {
    id?: string;
    disabled?: boolean;
    options: string[];
    required?: boolean;
    selected?: any;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    value?: any;
    width?: string;
    leftGap?: string;
}

export default function SeriesDropdown({
    id,
    disabled = false,
    options,
    required = false,
    selected,
    onChange,
    width,
    leftGap
}: Readonly<DropdownProps>) {
    return (
        <select
            id={id ?? "dropdown"}
            disabled={disabled}
            required={required}
            className={"py-2 text-xl bg-white placeholder:bg-gray-500 text-black px-3 min-w-0 border rounded-lg mt-2 mb-1 " + width + " " + leftGap}
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
