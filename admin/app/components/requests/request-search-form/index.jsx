import React, { useCallback } from 'react';
import {
    Layout,
    Select,
    TextField
} from 'mdc-react';
import moment from 'moment';

import useForm from 'shared/hooks/form';
import Form from 'shared/components/form';

import { useStore } from 'app/hooks/store';
import PeopleSelect from 'app/components/shared/people-select';

import './index.scss';

export default function RequestSearchForm({ onSubmit }) {
    const [managers] = useStore('managers.list');
    const [data, handleChange, getData] = useForm({
        query: '',
        statuses: [],
        createdAt: '',
        manager: ''
    });

    const handleSubmit = useCallback(() => {
        getData(data => onSubmit(data));
    }, []);

    return (
        <Form id="request-search-form" onSubmit={handleSubmit}>
            <Layout column>
                <TextField
                    type="search"
                    name="query"
                    value={data.query}
                    label="Имя, телефон или email"
                    filled
                    onChange={handleChange}
                />

                <Select
                    name="statuses"
                    value={data.statuses}
                    label="Статус"
                    filled
                    multiple
                    options={[
                        { key: 'new', value: 'new', text: 'Новая' },
                        { key: 'pending', value: 'pending', text: 'В обработке' },
                        { key: 'resolved', value: 'resolved', text: 'Успешная' },
                        { key: 'rejected', value: 'rejected', text: 'Отказ' },
                        { key: 'postponed', value: 'postponed', text: 'Отложенная' }
                    ]}
                    onChange={handleChange}
                />

                <TextField
                    type="date"
                    name="createdAt"
                    value={moment(data.createdAt).format('YYYY-MM-DD')}
                    label="Дата создания"
                    filled
                    onChange={handleChange}
                />

                <PeopleSelect
                    name="manager"
                    value={data.manager}
                    label="Менеджер"
                    filled
                    options={(managers || []).map(manager => ({
                        key: manager.id,
                        value: manager.id,
                        text: manager.fullname
                    }))}
                    required
                    onChange={handleChange}
                />
            </Layout>
        </Form>
    );
}