import Checkbox from '../checkbox/Checkbox';

import FormField from './FormField';

export default function FormCheckbox({ label, orientation = 'horizontal', ...props }) {
    return (
        <FormField label={label} orientation={orientation}>
            <Checkbox {...props} />
        </FormField>
    );
}