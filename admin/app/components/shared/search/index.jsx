import { useCallback, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    CircularProgress,
    Icon,
    Menu, MenuItem,
    TextField
} from 'mdc-react';

import Form from 'shared/components/form';

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
        <Form className="search">
            <TextField
                ref={anchorRef}
                value={query}
                leadingIcon={<Icon>search</Icon>}
                trailingIcon={isLoading ?
                    <span><CircularProgress size="small" indeterminate /></span>
                    :
                    (query && <Icon onClick={handleClear}>clear</Icon>)
                }
                placeholder="Поиск пользователя"
                filled
                onInput={handleInput}
                onChange={handleChange}
            />

            <Menu
                anchorRef={anchorRef.current}
                open={isMenuOpen}
                fixed
                belowAnchor
                fullWidth
                onClose={handleMenuClose}
            >
                {results.map(item =>
                    <MenuItem
                        key={item.id}
                        component={Link}
                        to={item.url}
                        primaryText={item.fullname}
                        secondaryText={item.roleLabel}
                    />
                )}
            </Menu>
        </Form>
    );
}

function throttle(fn, ms) {
    let timeout;
    let cache = {};

    return (...args) => {
        cache.lastArgs = args;

        if (!timeout) {
            timeout = setTimeout(() => {
                fn(...cache.lastArgs);
                clearTimeout(timeout);
                timeout = null;
            }, ms);
        }
    };
};