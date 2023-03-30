import Radio from '../radio/Radio';
import RadioGroup from '../radio/RadioGroup';

import FromField from './FormField';

export default function FormRadioGroup({
    label,
    items,

    ...props
}) {
    return (
        <FromField label={label}>
            <RadioGroup {...props}>
                {items.map(item => (
                    <Radio {...item} />
                ))}
            </RadioGroup>
        </FromField>
    );
}