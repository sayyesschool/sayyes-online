import Autocomplete from '../autocomplete/Autocomplete';

import FormField from './FormField';

export default function FormAutocomplete({ label, orientation, ...props }) {
    return (
        <FormField label={label} orientation={orientation}>
            <Autocomplete {...props} />
        </FormField>
    );
}