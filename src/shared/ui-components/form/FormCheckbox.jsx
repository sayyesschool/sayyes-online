import Checkbox from '../checkbox/Checkbox';

import FromField from './FormField';

export default function FormCheckbox({ label, ...props }) {
    return (
        <FromField label={label}>
            <Checkbox {...props} />
        </FromField>
    );
}