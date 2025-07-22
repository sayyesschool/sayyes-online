import { useCallback, useEffect, useMemo, useState } from 'react';

import {
    duePeriodOptions as _duePeriodOptions,
    priorityOptions as _priorityOptions,
    statusOptions as _statusOptions,
    topicOptions as _topicOptions
} from 'shared/data/task';
import { useDebounce } from 'shared/hooks/fn';
import { Form, Icon, IconButton } from 'shared/ui-components';
import { stripEmptyValues } from 'shared/utils/object';

import styles from './TasksSearch.module.scss';

const topicOptions = _topicOptions.concat({
    key: 'all',
    value: '',
    content: 'Все'
});

const priorityOptions = _priorityOptions.concat({
    key: 'all',
    value: '',
    content: 'Все'
});

const statusOptions = _statusOptions.concat({
    key: 'all',
    value: '',
    content: 'Все'
});

const duePeriodOptions = _duePeriodOptions.concat({
    key: 'all',
    value: '',
    content: 'Все'
});

export default function TasksSearch({
    filters,
    user,
    managers,
    defaultFilters,
    setFilters,
    ...props
}) {
    const [search, setSearch] = useState('');

    useEffect(() => {
        const params = new URLSearchParams(stripEmptyValues(filters)).toString();

        if (params && history.pushState) {
            const path = window.location.protocol + '//' + window.location.host + window.location.pathname + '?' + params;
            window.history.pushState({ path }, '', path);
        }
    }, [filters]);

    const assigneeOptions = useMemo(() => managers
        ?.filter(m => m.id !== user.id)
        .map(({ id, fullname }) => ({
            key: id,
            value: id,
            label: fullname,
            content: fullname
        }))
        .concat({
            key: 'all',
            value: '',
            content: 'Все'
        }), [managers, user.id]);

    const debouncedSearch = useDebounce(params => {
        setFilters(prev =>
            stripEmptyValues({
                ...prev,
                ...params
            })
        );
    }, 1000);

    const handleSearchChange = useCallback(event => {
        const { name, value } = event.target;

        setSearch(value);

        debouncedSearch({ [name]: value });
    }, [debouncedSearch]);

    const handleFilterChange = useCallback(event => {
        const { name, value } = event.target;

        setFilters(filter => {
            const newFilter = {
                ...filter,
                [name]: value
            };

            return stripEmptyValues(newFilter);
        });
    }, [setFilters]);

    const handleClearSearch = useCallback(() => {
        setSearch('');
        setFilters(prev => ({ ...prev, description: '' }));
    }, [setFilters]);

    const handleClearFilter = useCallback(() => {
        setFilters(defaultFilters);
        setSearch('');
    }, [defaultFilters, setFilters]);

    return (
        <Form className={styles.root} {...props}>
            <Form.Input
                className={styles.search}
                placeholder="Описание"
                name="description"
                value={search}
                start={<Icon name="search" />}
                end={search && (
                    <Icon
                        as="button" name="clear"
                        onClick={handleClearSearch}
                    />
                )}
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
                    name="completed"
                    value={filters.completed}
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
                    value={filters.dueDate}
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