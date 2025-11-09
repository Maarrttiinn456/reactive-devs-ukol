type Option<T> = {
    label: string;
    value: T;
};

type InputSelectProps<T> = {
    label: string;
    id: string;
    value: T;
    options: Option<T>[];
    onChange: (value: T) => void;
};

const InputSelect = <T extends string>({
    label,
    id,
    value,
    onChange,
    options,
}: InputSelectProps<T>) => {
    return (
        <div className="flex flex-col gap-y-2">
            <label htmlFor={id} className="text-sm font-medium text-gray-700">
                {label}
            </label>

            <select
                name={id}
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value as T)}
                className="
                        w-full rounded-lg border border-gray-300 bg-white
                        px-3 py-2 text-gray-800 text-sm shadow-sm
                        focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none
                        transition duration-150 ease-in-out
                        hover:border-gray-400
                        "
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default InputSelect;
