import { useCallback } from 'react';
import moment from 'moment';

import useForm from 'shared/hooks/form';
import Form from 'shared/ui-components/form';
import PeopleSelect from 'shared/components/user-select';

import { useStore } from 'app/hooks/store';

import './index.scss';

export default function RequestSearchForm({ onSubmit, ...props }) {
    const [managers] = useStore('managers.list');

    const { data, handleChange, getData } = useForm({
        query: '',
        statuses: [],
        createdAt: '',
        manager: ''
    });

    const handleSubmit = useCallback(() => {
        getData(data => onSubmit(data));
    }, []);

    return (
        <Form className="request-search-form" onSubmit={handleSubmit} {...props}>
            <Form.Input
                type="search"
                name="query"
                value={data.query}
                placeholder="Имя, телефон или email"
                onChange={handleChange}
            />

            <Form.Select
                name="statuses"
                value={data.statuses}
                placeholder="Статус"
                options={[
                    { key: 'new', value: 'new', header: 'Новая' },
                    { key: 'pending', value: 'pending', header: 'В обработке' },
                    { key: 'resolved', value: 'resolved', header: 'Успешная' },
                    { key: 'rejected', value: 'rejected', header: 'Отказ' },
                    { key: 'postponed', value: 'postponed', header: 'Отложенная' }
                ]}
                multiple
                onChange={handleChange}
            />

            <Form.Input
                type="date"
                name="createdAt"
                value={moment(data.createdAt).format('YYYY-MM-DD')}
                placeholder="Дата создания"
                onChange={handleChange}
            />

            <PeopleSelect
                name="manager"
                value={data.manager}
                placeholder="Менеджер"
                options={(managers || []).map(manager => ({
                    key: manager.id,
                    value: manager.id,
                    content: manager.fullname
                }))}
                onChange={handleChange}
            />
        </Form>
    );
}