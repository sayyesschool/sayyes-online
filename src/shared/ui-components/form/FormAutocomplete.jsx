import Autocomplete from '../autocomplete/Autocomplete';

import FromField from './FormField';

export default function FormAutocomplete({ label, ...props }) {
    return (
        <FromField label={label}>
            <Autocomplete {...props} />
        </FromField>
    );
}