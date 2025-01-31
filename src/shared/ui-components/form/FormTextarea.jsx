import Textarea from '../textarea/Textarea';

import FormField from './FormField';

export default function FormTextarea({ label, orientation, ...props }) {
    return (
        <FormField label={label} orientation={orientation}>
            <Textarea {...props} />
        </FormField>
    );
}