import type { ComponentPropsWithoutRef } from 'react';

type Option = {
    id: number;
    label: string;
    value: string;
};

type InputSelectProp = {
    id: string;
    label: string;
    options: Option[];
    onChange: (value: string) => void;
} & ComponentPropsWithoutRef<'select'>;

const InputSelect = ({
    id,
    label,
    value,
    options,
    onChange,
}: InputSelectProp) => {
    return (
        <div>
            <label
                htmlFor={id}
                className="block text-sm font-medium text-gray-700 mb-2"
            >
                {label}:
            </label>

            <select
                onChange={(e) => onChange(e.target.value)}
                value={value}
                id={id}
                name={id}
                className="
                    block w-full rounded-xl border border-gray-300 bg-white 
                    px-4 py-2 text-gray-800 shadow-sm 
                    focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none
                    transition duration-150 ease-in-out
                "
            >
                {options.map((option) => (
                    <option key={option.id} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default InputSelect;
