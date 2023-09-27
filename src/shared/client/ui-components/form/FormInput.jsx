import Input from '../input/Input';

import FormField from './FormField';

export default function FormInput({ label, message, ...props }) {
    return (
        <FormField label={label} message={message}>
            <Input {...props} />
        </FormField>
    );
}