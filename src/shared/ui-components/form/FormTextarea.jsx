import Textarea from '../textarea/Textarea';

import FormField from './FormField';

export default function FormTextarea({ label, ...props }) {
    return (
        <FormField label={label}>
            <Textarea {...props} />
        </FormField>
    );
}