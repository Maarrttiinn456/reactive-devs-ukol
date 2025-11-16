import Select from 'react-select';
import type { FindPetsByStatusStatusItem } from '../api/api';

type Option = {
    value: FindPetsByStatusStatusItem;
    label: string;
};

type MultiSelectProps = {
    statusOptions: Option[];
    selectedValues: FindPetsByStatusStatusItem[];
    setValues: (value: FindPetsByStatusStatusItem[]) => void;
};

const MultiSelect = ({
    statusOptions,
    selectedValues,
    setValues,
}: MultiSelectProps) => {
    return (
        <Select
            isMulti
            options={statusOptions}
            value={statusOptions.filter((opt) =>
                selectedValues.includes(opt.value)
            )}
            onChange={(newValues) => {
                const values = newValues.map(
                    (v) => v.value as FindPetsByStatusStatusItem
                );
                setValues(values);
            }}
        />
    );
};

export default MultiSelect;
