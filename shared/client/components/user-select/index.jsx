import { useState } from 'react';
import { FormDropdown } from '@fluentui/react-northstar';

import api from 'shared/services/api';

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