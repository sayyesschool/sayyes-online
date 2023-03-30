import Textarea from '../textarea/Textarea';

import FromField from './FormField';

export default function FormTextarea({ label, ...props }) {
    return (
        <FromField label={label}>
            <Textarea {...props} />
        </FromField>
    );
}