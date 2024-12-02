import Checkbox from '../checkbox/Checkbox';

import FormField from './FormField';

export default function FormCheckbox({ label, ...props }) {
    return (
        <FormField label={label} orientation="horizontal">
            <Checkbox {...props} />
        </FormField>
    );
}