import { useCallback, useState } from 'react';

import {
    completedOptions as _completedOptions,
    priorityOptions as _priorityOptions,
    themeOptions as _themeOptions
} from 'shared/data/common';
import { useDebounce } from 'shared/hooks/fn';
import { Form, Icon, IconButton } from 'shared/ui-components';
import { stripEmptyValues } from 'shared/utils/object';

import styles from './TasksSearch.module.scss';

const themeOptions = _themeOptions.concat({
    key: 'all',
    value: '',
    content: 'Все'
});

const priorityOptions = _priorityOptions.concat({
    key: 'all',
    value: '',
    content: 'Все'
});

const completedOptions = _completedOptions.concat({
    key: 'all',
    value: '',
    content: 'Все'
});

const getPerformerOptions = (managers, userId) => {
    return managers
        ?.map(({ id, fullname }) => {
            const label = id === userId ? 'Я' : fullname;

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
        });
};

export default function TasksSearch({
    filters,
    user,
    managers,
    defaultFilters,
    setFilters,
    ...props
}) {
    const [search, setSearch] = useState('');

    const performerOptions = getPerformerOptions(managers, user.id);

    const searchNote = useDebounce(value => {
        setFilters(prev =>
            stripEmptyValues({
                ...prev,
                note: value
            })
        );
    }, 1000);

    const handleSearchChange = useCallback(event => {
        const value = event.target.value;

        setSearch(value);

        if (value) {
            searchNote(value);
        }
    }, [searchNote]);

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
        setFilters(prev => ({ ...prev, note: '' }));
        setSearch('');
    }, [setFilters]);

    const handleClearFilter = useCallback(() => {
        setFilters(defaultFilters);
    }, [defaultFilters, setFilters]);

    return (
        <Form className={styles.root} {...props}>
            <Form.Input
                className={styles.search}
                start={<Icon name="search" />}
                name="note"
                value={search}
                placeholder="Описание"
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
                    name="theme"
                    value={filters.theme}
                    options={themeOptions}
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
                    options={completedOptions}
                    orientation="horizontal"
                    onChange={handleFilterChange}
                />

                <Form.Select
                    label="Исполнитель"
                    name="performer"
                    value={filters.performer}
                    options={performerOptions}
                    orientation="horizontal"
                    onChange={handleFilterChange}
                />

                <IconButton
                    icon="clear"
                    title="Очистить"
                    variant="soft"
                    color="primary"
                    onClick={handleClearFilter}
                />
            </div>
        </Form>
    );
}