type InputTextProps = {
    label: string;
    id: string;
    value: string;
    onChange: (e: string) => void;
};

const InputText = ({ label, id, value, onChange }: InputTextProps) => {
    return (
        <div className="flex flex-col gap-y-2">
            <label htmlFor={id}>{label}</label>
            <input
                type="text"
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                name={id}
                className="border px-3 py-2"
            />
        </div>
    );
};

export default InputText;
