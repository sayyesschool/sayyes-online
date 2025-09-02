import { useCallback, useRef, useState } from 'react';

import LoadingIndicator from 'shared/components/loading-indicator';
import {
    requestStatusOptions as _requestStatusOptions
} from 'shared/data/request';
import { useSetting } from 'shared/store/settings';
import { Form, Icon, IconButton } from 'shared/ui-components';
import { debounce } from 'shared/utils/fn';
import { stripEmptyValues } from 'shared/utils/object';

import styles from './RequestsSearch.module.scss';

const defaultFilters = {
    type: '',
    status: '',
    channel: '',
    source: '',
    from: '',
    to: ''
};

export default function RequestsSearch({ onSubmit, onClear, ...props }) {
    const [requestTypes = {}] = useSetting('request.types');
    const [requestChannels = {}] = useSetting('request.channels');
    const [requestSources = {}] = useSetting('request.sources');

    const [query, setQuery] = useState('');
    const [filters, setFilters] = useState(defaultFilters);
    const [isLoading, setLoading] = useState(false);

    const onSubmitRef = useRef(debounce(data => {
        setLoading(true);
        onSubmit(data).finally(() => setLoading(false));
    }, 1000));

    const handleSearchChange = useCallback(event => {
        const value = event.target.value;

        setQuery(value);

        onSubmitRef.current?.(value ? { query: value } : {});
    }, []);

    const handleFilterChange = useCallback(event => {
        const { name, value } = event.target;

        setFilters(filter => {
            const newFilter = {
                ...filter,
                [name]: value
            };

            onSubmitRef.current?.(stripEmptyValues(newFilter));

            return newFilter;
        });
    }, []);

    const handleClearSearch = useCallback(() => {
        setQuery('');
        onClear();
    }, [onClear]);

    const handleClearFilter = useCallback(() => {
        setFilters(defaultFilters);
        onClear();
    }, [onClear]);

    const requestStatusOptions = _requestStatusOptions.concat({
        key: 'all',
        value: '',
        content: 'Все'
    });

    const requestTypeOptions = Object.entries(requestTypes).map(([key, value]) => ({
        key: key,
        value: key,
        content: value
    })).concat({
        key: 'all',
        value: '',
        content: 'Все'
    });

    const requestChannelOptions = Object.entries(requestChannels).map(([key, value]) => ({
        key: key,
        value: key,
        content: value
    })).concat({
        key: 'all',
        value: '',
        content: 'Все'
    });

    const requestSourceOptions = Object.entries(requestSources).map(([key, value]) => ({
        key: key,
        value: key,
        content: value
    })).concat({
        key: 'all',
        value: '',
        content: 'Все'
    });

    const hasActiveFilters = Object.values(filters).some(Boolean);

    return (
        <Form
            className={styles.root}
            {...props}
        >
            <Form.Input
                className={styles.search}
                start={<Icon name="search" />}
                name="query"
                value={query}
                placeholder="Имя, телефон или email"
                end={query && (isLoading ?
                    <LoadingIndicator size="sm" /> :
                    <Icon
                        as="button"
                        name="clear"
                        onClick={handleClearSearch}
                    />
                )}
                onChange={handleSearchChange}
            />

            <div className={styles.filters}>
                <Form.Select
                    label="Тип"
                    name="type"
                    value={filters.type}
                    options={requestTypeOptions}
                    orientation="horizontal"
                    onChange={handleFilterChange}
                />

                <Form.Select
                    label="Статус"
                    name="status"
                    value={filters.status}
                    options={requestStatusOptions}
                    orientation="horizontal"
                    onChange={handleFilterChange}
                />

                <Form.Select
                    label="Канал"
                    name="channel"
                    value={filters.channel}
                    options={requestChannelOptions}
                    orientation="horizontal"
                    onChange={handleFilterChange}
                />

                <Form.Select
                    label="Источник"
                    name="source"
                    value={filters.source}
                    options={requestSourceOptions}
                    orientation="horizontal"
                    onChange={handleFilterChange}
                />

                <Form.Input
                    label="От"
                    type="date"
                    name="from"
                    value={filters.from}
                    orientation="horizontal"
                    onChange={handleFilterChange}
                />

                <Form.Input
                    label="До"
                    type="date"
                    name="to"
                    value={filters.to}
                    orientation="horizontal"
                    onChange={handleFilterChange}
                />

                {hasActiveFilters &&
                    <IconButton
                        icon="clear"
                        title="Очистить"
                        variant="soft"
                        color="primary"
                        onClick={handleClearFilter}
                    />
                }
            </div>
        </Form>
    );
}