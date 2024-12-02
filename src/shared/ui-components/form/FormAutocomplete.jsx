import Autocomplete from '../autocomplete/Autocomplete';

import FormField from './FormField';

export default function FormAutocomplete({ label, ...props }) {
    return (
        <FormField label={label}>
            <Autocomplete {...props} />
        </FormField>
    );
}