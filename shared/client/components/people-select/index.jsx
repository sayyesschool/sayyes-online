import { useState } from 'react';
import {
    Select
} from 'mdc-react';

import api from 'shared/services/api';

export default function PeopleSelect({ resolveUrl, ...props }) {
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
        <Select
            className="people-select"
            filled
            {...props}
        />
    );
}