import { useCallback, useRef, useState } from 'react';

import LoadingIndicator from '@/shared/components/loading-indicator/LoadingIndicator';
import { requestStatusOptions as _requestStatusOptions } from 'shared/data/request';
import { Button, Flex, Form, Icon } from 'shared/ui-components';
import { debounce } from 'shared/utils/fn';
import { stripEmptyValues } from 'shared/utils/object';

const requestStatusOptions = _requestStatusOptions.concat({
    key: 'all',
    value: '',
    content: 'Все'
});

export default function RequestSearchForm({ onSubmit, onClear, ...props }) {
    const [query, setQuery] = useState('');
    const [filter, setFilter] = useState({ status: '', from: '', to: '' });
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

        setFilter(filter => {
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
        setFilter({ status: '', from: '', to: '' });
        onClear();
    }, [onClear]);

    return (
        <Form
            className="RequestSearchForm"
            {...props}
        >
            <Flex gap="smaller" justify="space-between">
                <Form.Input
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

                <Flex gap="medium">
                    <Form.Select
                        label="Статус"
                        name="status"
                        value={filter.status}
                        options={requestStatusOptions}
                        orientation="horizontal"
                        onChange={handleFilterChange}
                    />

                    <Form.Input
                        label="От"
                        type="date"
                        name="from"
                        value={filter.from}
                        orientation="horizontal"
                        onChange={handleFilterChange}
                    />

                    <Form.Input
                        label="До"
                        type="date"
                        name="to"
                        value={filter.to}
                        orientation="horizontal"
                        onChange={handleFilterChange}
                    />

                    {(filter.status || filter.from || filter.to) &&
                        <Button
                            content="Очистить"
                            variant="plain"
                            onClick={handleClearFilter}
                        />
                    }
                </Flex>
            </Flex>
        </Form>
    );
}