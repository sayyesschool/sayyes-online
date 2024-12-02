import Radio from '../radio/Radio';
import RadioGroup from '../radio/RadioGroup';

import FormField from './FormField';

export default function FormRadioGroup({
    label,
    items,

    ...props
}) {
    return (
        <FormField label={label}>
            <RadioGroup {...props}>
                {items.map(item => (
                    <Radio key={item.key} {...item} />
                ))}
            </RadioGroup>
        </FormField>
    );
}