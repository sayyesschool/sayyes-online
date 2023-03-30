import Input from '../input/Input';

import FromField from './FormField';

export default function FormInput({ label, ...props }) {
    return (
        <FromField label={label}>
            <Input {...props} />
        </FromField>
    );
}