import React from 'react';
import {
    Button,
    Layout,
    Select,
    TextField
} from 'mdc-react';
import moment from 'moment';

import useForm from 'shared/hooks/form';
import Form from 'shared/components/form';
import { useStore } from 'app/store';
import PeopleSelect from 'app/components/shared/people-select';

import './index.scss';

export default function RequestSearchForm({ onSubmit }) {
    const [managers] = useStore('managers.list');
    const [data, handleChange] = useForm({
        query: '',
        statuses: []
    });

    function handleSubmit() {
        onSubmit(data);
    }

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
                    options={[
                        { key: 'new', value: 'new', text: 'Новая' },
                        { key: 'pending', value: 'pending', text: 'В обработке' },
                        { key: 'resolved', value: 'resolved', text: 'Успешная' },
                        { key: 'rejected', value: 'rejected', text: 'Отказ' },
                        { key: 'postponed', value: 'postponed', text: 'Отложенная' },
                    ]}
                    multiple
                    onChange={handleChange}
                />

                {data.createAt &&
                    <TextField
                        type="datetime-local"
                        name="createdAt"
                        value={moment(data.createdAt).format('YYYY-MM-DDTHH:mm')}
                        label="Дата создания"
                        filled
                        onChange={handleChange}
                    />
                }

                <PeopleSelect
                    name="manager"
                    value={data.manager}
                    label="Менеджер"
                    options={(managers || []).map(manager => ({
                        key: manager.id,
                        value: manager.id,
                        text: manager.fullname
                    }))}
                    required
                    onChange={handleChange}
                />
            </Layout>

            <Layout>
                <Button type="button">Очистить</Button>
                <Button type="submit" outlined>Искать</Button>
            </Layout>
        </Form >
    );
}