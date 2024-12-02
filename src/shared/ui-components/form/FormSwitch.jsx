import Switch from '../switch/Switch';

import FormField from './FormField';

export default function FormSwitch({ label, ...props }) {
    return (
        <FormField label={label} orientation="horizontal">
            <Switch {...props} />
        </FormField>
    );
}