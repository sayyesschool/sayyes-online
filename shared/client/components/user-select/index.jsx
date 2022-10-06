import { useState } from 'react';

import api from 'shared/services/api';
import FormDropdown from 'shared/ui-components/form/dropdown';

export default function UserSelect({ resolveUrl, ...props }) {
    const [results, setResults] = useState();

    const onResolveStudentSuggestions = (query, selectedItems) => {
        if (query) {
            return api.get(`${resolveUrl}?search=${query}`)
                .then(res => res.data)
                .then(data => data.map(item => ({ text: item.fullname })));
        } else {
            return [];
        }
    };

    return (
        <FormDropdown
            className="user-select"
            //placeholder="Start typing a name"
            noResultsMessage="We couldn't find any matches."
            multiple
            search
            fluid
            {...props}
        />
    );
}