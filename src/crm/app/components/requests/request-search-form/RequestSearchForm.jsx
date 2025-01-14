import { useCallback, useEffect } from 'react';

import { useThrottle } from 'shared/hooks/fn';
import { useFormData } from 'shared/hooks/form';
import { Button, Flex, Form, Icon } from 'shared/ui-components';

export default function RequestSearchForm({ onSubmit, onClear, ...props }) {
    const { data, handleChange, getData, setData } = useFormData({
        query: '',
        status: '',
        from: '',
        to: '',
        manager: ''
    });

    const submit = useThrottle(() => getData(data => {
        if (
            !data.query &&
            !data.status &&
            !data.from &&
            !data.to
        ) return;

        onSubmit(Object.entries(data).reduce((acc, [key, value]) => {
            return value ? { ...acc, [key]: encodeURIComponent(value) } : acc;
        }, {}));
    }), 2000);

    useEffect(() => {
        submit();
    }, [data, submit]);

    const handleClearSearch = useCallback(() => {
        setData(data => ({ ...data, query: '' }));
        onClear();
    }, [setData, onClear]);

    const handleClearFilter = useCallback(() => {
        setData(data => ({ ...data, status: '', from: '', to: '' }));
        onClear();
    }, [setData, onClear]);

    return (
        <Form
            className="RequestSearchForm"
            {...props}
        >
            <Flex gap="smaller" justify="space-between">
                <Form.Input
                    start={<Icon name="search" />}
                    name="query"
                    value={data.query}
                    placeholder="Имя, телефон или email"
                    end={data.query &&
                        <Icon
                            as="button"
                            name="clear"
                            onClick={handleClearSearch}
                        />
                    }
                    onChange={handleChange}
                />

                <Flex gap="medium">
                    <Form.Select
                        label="Статус"
                        name="status"
                        value={data.status}
                        options={[
                            { key: '', value: '', content: 'Все' },
                            { key: 'new', value: 'new', content: 'Новая' },
                            { key: 'pending', value: 'pending', content: 'В обработке' },
                            { key: 'resolved', value: 'resolved', content: 'Успешная' },
                            { key: 'rejected', value: 'rejected', content: 'Отказ' },
                            { key: 'postponed', value: 'postponed', content: 'Отложенная' }
                        ]}
                        orientation="horizontal"
                        onChange={handleChange}
                    />

                    <Form.Input
                        label="От"
                        type="date"
                        name="from"
                        value={data.from}
                        orientation="horizontal"
                        onChange={handleChange}
                    />

                    <Form.Input
                        label="До"
                        type="date"
                        name="to"
                        value={data.to}
                        orientation="horizontal"
                        onChange={handleChange}
                    />

                    {(data.status || data.from || data.to) &&
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