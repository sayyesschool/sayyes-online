import React from 'react';
import {
    Button,
    Layout,
    Select,
    TextField,
    Typography
} from 'mdc-react';
import moment from 'moment';

import useForm from 'shared/hooks/form';
import Form from 'shared/components/form';

import { useStore } from 'app/hooks/store';
import PeopleSelect from 'app/components/shared/people-select';

import './index.scss';

export default function RequestForm({ request = {}, onSubmit }) {
    const [managers] = useStore('managers.list');
    const [data, handleChange] = useForm({
        status: 'new',
        contact: {},
        channel: '',
        source: '',
        utm: {},
        note: undefined,
        ...request,
        client: request.client?.id,
        manager: request.manager?.id
    });

    function handleSubmit() {
        data.contact.phone = data.contact?.phone.replace(/ /gm, '');

        onSubmit(data);
    }

    return (
        <Form id="request-form" onSubmit={handleSubmit}>
            <Layout column>
                <TextField
                    name="description"
                    value={data.description}
                    label="Описание"
                    filled
                    onChange={handleChange}
                />

                <TextField
                    name="contact.name"
                    value={data.contact.name}
                    label="Имя"
                    filled
                    onChange={handleChange}
                />

                <TextField
                    name="contact.phone"
                    value={data.contact.phone}
                    label="Телефон"
                    filled
                    onChange={handleChange}
                />

                <Select
                    name="status"
                    value={data.status}
                    label="Статус"
                    options={[
                        { key: 'new', value: 'new', text: 'Новая' },
                        { key: 'processing', value: 'processing', text: 'В обработке' },
                        { key: 'resolved', value: 'resolved', text: 'Успешная' },
                        { key: 'rejected', value: 'rejected', text: 'Отказ' },
                        { key: 'postponed', value: 'postponed', text: 'Отложенная' },
                    ]}
                    filled
                    required
                    onChange={handleChange}
                />

                {data.client &&
                    <PeopleSelect
                        name="client"
                        label="Клиент"
                        value={data.client}
                        options={[{
                            key: request.client.id,
                            value: request.client.id,
                            text: request.client.fullname
                        }]}
                        filled
                        disabled
                    />
                }

                <PeopleSelect
                    name="manager"
                    value={data.manager}
                    label="Менеджер"
                    options={managers.map(manager => ({
                        key: manager.id,
                        value: manager.id,
                        text: manager.fullname
                    }))}
                    filled
                    required
                    onChange={handleChange}
                />

                <Select
                    name="channel"
                    value={data.channel}
                    label="Канал связи"
                    options={[
                        { key: 'null', value: '', text: '' },
                        { key: 'site', value: 'site', text: 'Сайт' },
                        { key: 'call', value: 'call', text: 'Звонок' },
                        { key: 'whatsapp', value: 'whatsapp', text: 'WhatsApp' },
                        { key: 'instagram', value: 'instagram', text: 'Instagram' },
                    ]}
                    filled
                    onChange={handleChange}
                />

                <Select
                    name="source"
                    value={data.source}
                    label="Источник"
                    options={[
                        { key: 'null', value: '', text: '' },
                        { key: 'instagram', value: 'instagram', text: 'Инстаграм' },
                        { key: 'whatsapp', value: 'whatsapp', text: 'WhatsApp' },
                        { key: 'yandex', value: 'yandex', text: 'Яндекс' },
                        { key: 'google', value: 'google', text: 'Google' },
                        { key: 'referral', value: 'referral', text: 'Рекомендация' }
                    ]}
                    filled
                    onChange={handleChange}
                />

                <TextField
                    name="note"
                    value={data.note}
                    label="Примечание"
                    filled
                    textarea
                    onChange={handleChange}
                />

                <Layout element="fieldset" column>
                    <Typography element="legend" type="subtitle2">UTM</Typography>

                    <TextField
                        name="utm.source"
                        value={data.utm.source}
                        label="Source"
                        filled
                        onChange={handleChange}
                    />

                    <TextField
                        name="utm.medium"
                        value={data.utm.medium}
                        label="Medium"
                        filled
                        onChange={handleChange}
                    />

                    <TextField
                        name="utm.campaign"
                        value={data.utm.campaign}
                        label="Campaign"
                        filled
                        onChange={handleChange}
                    />

                    <TextField
                        name="utm.term"
                        value={data.utm.term}
                        label="Term"
                        filled
                        onChange={handleChange}
                    />

                    <TextField
                        name="utm.content"
                        value={data.utm.content}
                        label="Content"
                        filled
                        onChange={handleChange}
                    />
                </Layout>
            </Layout>
        </Form>
    );
}