import { useCallback, useEffect, useMemo, useState } from 'react';

import {
    defaultFilters,
    duePeriodOptions,
    priorityOptions,
    statusOptions,
    topicOptions
} from 'shared/data/task';
import { useDebounce } from 'shared/hooks/fn';
import { Form, Icon, IconButton } from 'shared/ui-components';
import { stripEmptyValues } from 'shared/utils/object';

import styles from './TasksSearch.module.scss';

topicOptions.unshift({
    key: 'all',
    value: '',
    content: 'Все'
});

priorityOptions.unshift({
    key: 'all',
    value: '',
    content: 'Все'
});

statusOptions.unshift({
    key: 'all',
    value: '',
    content: 'Все'
});

duePeriodOptions.unshift({
    key: 'all',
    value: '',
    content: 'Все'
});

export default function TasksSearch({
    user,
    managers,
    onParamsChange,
    ...props
}) {
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState(defaultFilters);

    useEffect(() => {
        onParamsChange?.(stripEmptyValues(filters));
    }, [filters, onParamsChange]);

    useEffect(() => {
        const params = new URLSearchParams(stripEmptyValues(filters)).toString();

        if (history.pushState) {
            const path = window.location.protocol + '//' + window.location.host + window.location.pathname + (params ? `?${params}` : '');
            window.history.pushState({ path }, '', path);
        }
    }, [filters]);

    const handleSearchInput = useCallback(event => {
        setSearch(event.target.value);
    }, []);

    const handleSearchChange = useDebounce(event => {
        const { name, value } = event.target;

        setSearch(value);
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    }, 1000);

    const handleFilterChange = useCallback(event => {
        const { name, value } = event.target;

        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    }, []);

    const handleClearSearch = useCallback(() => {
        setSearch('');
        setFilters(prev => ({ ...prev }));
    }, [setFilters]);

    const handleClearFilter = useCallback(() => {
        setSearch('');
        setFilters(defaultFilters);
    }, []);

    const assigneeOptions = useMemo(() => [
        {
            key: 'all',
            value: '',
            content: 'Все'
        },
        ...(managers || [])
            .filter(m => m.id !== user.id)
            .map(({ id, fullname }) => ({
                key: id,
                value: id,
                label: fullname,
                content: fullname
            }))
    ], [managers, user.id]);

    return (
        <Form className={styles.root} {...props}>
            <Form.Input
                className={styles.search}
                placeholder="Описание"
                name="description"
                defaultValue=""
                start={<Icon name="search" />}
                end={search && (
                    <Icon
                        as="button"
                        name="clear"
                        onClick={handleClearSearch}
                    />
                )}
                onInput={handleSearchInput}
                onChange={handleSearchChange}
            />

            <div className={styles.filters}>
                <Form.Select
                    label="Тема"
                    name="topic"
                    value={filters.topic}
                    options={topicOptions}
                    orientation="horizontal"
                    onChange={handleFilterChange}
                />

                <Form.Select
                    label="Приоритет"
                    name="priority"
                    value={filters.priority}
                    options={priorityOptions}
                    orientation="horizontal"
                    onChange={handleFilterChange}
                />

                <Form.Select
                    label="Статус"
                    name="status"
                    value={filters.status}
                    options={statusOptions}
                    orientation="horizontal"
                    onChange={handleFilterChange}
                />

                <Form.Select
                    label="Исполнитель"
                    name="assigneeId"
                    value={filters.assigneeId}
                    options={assigneeOptions}
                    orientation="horizontal"
                    onChange={handleFilterChange}
                />

                <Form.Select
                    label="Срок выполнения"
                    name="due"
                    value={filters.due}
                    options={duePeriodOptions}
                    orientation="horizontal"
                    onChange={handleFilterChange}
                />

                <IconButton
                    title="Очистить"
                    icon="clear"
                    variant="outlined"
                    onClick={handleClearFilter}
                />
            </div>
        </Form>
    );
}