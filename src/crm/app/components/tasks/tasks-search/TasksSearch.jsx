import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import {
    defaultFilters,
    duePeriodOptions as _duePeriodOptions,
    priorityOptions as _priorityOptions,
    statusOptions as _statusOptions,
    topicOptions as _topicOptions
} from 'shared/data/task';
import { Form, Icon, IconButton } from 'shared/ui-components';
import { debounce } from 'shared/utils/fn';
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
    user,
    managers,
    onParamsChange,
    ...props
}) {
    const onParamsChangeRef = useRef(debounce(onParamsChange, 1000));

    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState(defaultFilters);

    useEffect(() => {
        onParamsChange?.(stripEmptyValues(filters));
    }, []);

    useEffect(() => {
        onParamsChangeRef?.current(stripEmptyValues(filters));
    }, [filters]);

    useEffect(() => {
        const params = new URLSearchParams(stripEmptyValues(filters)).toString();

        if (params && history.pushState) {
            const path = window.location.protocol + '//' + window.location.host + window.location.pathname + '?' + params;
            window.history.pushState({ path }, '', path);
        }
    }, [filters]);

    const handleSearchChange = useCallback(event => {
        const { name, value } = event.target;

        setSearch(value);

        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    }, []);

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