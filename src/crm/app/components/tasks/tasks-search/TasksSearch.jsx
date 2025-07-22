import { useCallback, useMemo, useState } from 'react';

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

    const assigneeOptions = useMemo(() => managers
        ?.map(({ id, fullname }) => {
            const label = id === user.id ? 'Я' : fullname;

            return {
                key: id,
                value: id,
                label: label,
                content: label
            };
        })
        .concat({
            key: 'all',
            value: '',
            content: 'Все'
        }), [managers, user.id]);

    const searchDescription = useDebounce(value => {
        setFilters(prev =>
            stripEmptyValues({
                ...prev,
                description: value
            })
        );
    }, 1000);

    const handleSearchChange = useCallback(event => {
        const value = event.target.value;

        setSearch(value);

        if (value) {
            searchDescription(value);
        }
    }, [searchDescription]);

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
        setFilters(prev => ({ ...prev, description: '' }));
        setSearch('');
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
                    name="duePeriod"
                    value={filters.duePeriod}
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