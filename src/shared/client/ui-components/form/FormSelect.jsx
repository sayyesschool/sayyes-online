import Select from '../select/Select';

import FromField from './FormField';

export default function FormSelect({ label, ...props }) {
    return (
        <FromField label={label}>
            <Select {...props} />
        </FromField>
    );
}