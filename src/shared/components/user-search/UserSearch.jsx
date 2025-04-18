import { useCallback, useState } from 'react';

import UserSelect from 'shared/components/user-select';
import { useDebounce } from 'shared/hooks/fn';
import http from 'shared/services/http';
import { AutocompleteOption, ListItemContent, Text } from 'shared/ui-components';

export default function UserSearch({ onResult, ...props }) {
    const [query, setQuery] = useState('');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const search = useDebounce(query => {
        setLoading(true);

        http.get(`/api/users?q=${query}&role=learner`)
            .then(res => setUsers(res.data))
            .finally(() => setLoading(false));
    }, 1000);

    const handleInputChange = useCallback((event, value, reason) => {
        if (reason === 'reset') return;

        setQuery(value);
        search(value);
    }, [search]);

    const handleChange = useCallback((event, userId) => {
        onResult?.(userId);
    }, [onResult]);

    const options = users.map(user => ({
        value: user.id,
        label: user.fullname,
        content: {
            primary: user.fullname,
            secondary: user.email
        }
    }));

    return (
        <UserSelect
            options={options}
            loading={loading}
            placeholder="Имя, фамилия, телефон или email"
            forcePopupIcon={options.length > 0}
            renderOption={(props, option) => (
                <AutocompleteOption key={option.value} {...props}>
                    <ListItemContent>
                        {option.content.primary}

                        <Text
                            content={option.content.secondary}
                            type="body-sm"
                        />
                    </ListItemContent>
                </AutocompleteOption>
            )}
            freeSolo
            onInputChange={handleInputChange}
            onChange={handleChange}
            {...props}
        />
    );
}