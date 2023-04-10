import { useCallback } from 'react';
import moment from 'moment';

import { useFormData } from 'shared/hooks/form';
import { Flex, Form } from 'shared/ui-components';

export default function RequestSearchForm({ onSubmit, ...props }) {
    const { data, handleChange, getData } = useFormData({
        query: '',
        status: '',
        createdAt: '',
        manager: ''
    });

    const handleSubmit = useCallback(() => {
        getData(data => onSubmit(data));
    }, []);

    return (
        <Form className="RequestSearchForm" onSubmit={handleSubmit} {...props}>
            <Flex gap="smaller">
                <Form.Input
                    type="search"
                    name="query"
                    value={data.query}
                    placeholder="Имя, телефон или email"
                    onChange={handleChange}
                />

                <Form.Select
                    name="status"
                    value={data.status}
                    placeholder="Статус"
                    options={[
                        { key: 'new', value: 'new', content: 'Новая' },
                        { key: 'pending', value: 'pending', content: 'В обработке' },
                        { key: 'resolved', value: 'resolved', content: 'Успешная' },
                        { key: 'rejected', value: 'rejected', content: 'Отказ' },
                        { key: 'postponed', value: 'postponed', content: 'Отложенная' }
                    ]}
                    onChange={handleChange}
                />

                <Form.Input
                    type="date"
                    name="createdAt"
                    value={moment(data.createdAt).format('YYYY-MM-DD')}
                    placeholder="Дата создания"
                    onChange={handleChange}
                />
            </Flex>
        </Form>
    );
}