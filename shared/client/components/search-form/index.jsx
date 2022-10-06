import { useCallback, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Input, List, Popup, } from '@fluentui/react-northstar';

import Form from 'shared/components/form';
import Icon from 'shared/ui-components/icon';
import { throttle } from 'shared/utils/fn';

import './index.scss';

export default function Search() {
    const anchorRef = useRef();

    const [query, setQuery] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [results, setResults] = useState([]);

    const getResults = useMemo(() => throttle(query => {
        setLoading(true);
        fetch(`/admin/api/users?search=${query}`)
            .then(res => res.json())
            .then(res => {
                setResults(res.data);
                setMenuOpen(true);
                setLoading(false);
                anchorRef.current.control.focus();
            });
    }, 1000), []);

    const handleMenuClose = useCallback(() => setMenuOpen(false), []);

    const handleChange = useCallback((event, value) => {
        getResults(value);
    }, []);

    const handleInput = useCallback(event => {
        setQuery(event.target.value);
    }, []);

    const handleClear = useCallback(() => {
        setQuery('');
        setMenuOpen(false);
    }, []);

    return (
        <Form className="search-form">
            <Input
                ref={anchorRef}
                value={query}
                icon={<Icon>search</Icon>}
                placeholder="Поиск пользователя"
                clearable
                fluid
                onInput={handleInput}
                onChange={handleChange}
            />

            <Popup
                open={isMenuOpen}
                content={
                    <List>
                        {results.map(item =>
                            <List.Item
                                key={item.id}
                                as={Link}
                                to={item.url}
                                header={item.fullname}
                                content={item.roleLabel}
                            />
                        )}
                    </List>
                }
                trapFocus
                onOpenChange={(e, { open }) => setOpen(open)}
            />
        </Form>
    );
}