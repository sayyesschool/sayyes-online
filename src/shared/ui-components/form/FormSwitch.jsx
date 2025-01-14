import Switch from '../switch/Switch';

import FormField from './FormField';

export default function FormSwitch({ label, orientation = 'horizontal', ...props }) {
    return (
        <FormField label={label} orientation={orientation}>
            <Switch {...props} />
        </FormField>
    );
}