import React, { useState, useCallback } from 'react';
import {
    MaskedTextField,
    TextField,
    Stack
} from '@fluentui/react';

import useForm from 'shared/hooks/form';
import Form from 'shared/components/form';
import Select from 'app/components/shared/select';
import DatePicker from 'app/components/shared/date-picker';

const defaultData = () => ({
    contact: {},
    status: 'new',
    date: new Date(),
    source: undefined,
    channel: undefined,
    note: undefined
});

const maskFormat = { '*': /[0-9]/ };

export default function RequestForm({ request = defaultData(), onSubmit }) {
    const [data, handleChange] = useForm({
        contact: request.contact,
        status: request.status,
        date: request.date,
        source: request.source,
        channel: request.channel,
        note: request.note
    });

    function handleSubmit() {
        data.contact.phone = data.contact?.phone.replace(/ /gm, '');

        onSubmit(data);
    }

    console.log(data);

    return (
        <Form id="request-form" onSubmit={handleSubmit}>
            <Stack tokens={{ childrenGap: 8 }}>
                <TextField
                    name="contact.name"
                    value={data.contact.name}
                    label="Имя"
                    required
                    onChange={handleChange}
                />

                <MaskedTextField
                    name="contact.phone"
                    value={data.contact.phone}
                    label="Телефон"
                    required
                    mask="* *** *** ** **"
                    maskFormat={maskFormat}
                    onChange={handleChange}
                />

                <Select
                    name="status"
                    label="Статус"
                    options={[
                        { key: 'new', text: 'Новая' },
                        { key: 'pending', text: 'В обработке' },
                        { key: 'resolved', text: 'Успешная' },
                        { key: 'rejected', text: 'Отказ' },
                        { key: 'postponed', text: 'Отложенная' },
                    ]}
                    selectedKey={data.status}
                    onChange={handleChange}
                />

                <DatePicker
                    name="date"
                    value={data.date}
                    label="Дата"
                    onChange={handleChange}
                />

                <Select
                    name="channel"
                    label="Канал связи"
                    options={[
                        { key: '', text: 'Не известен' },
                        { key: 'site', text: 'Сайт' },
                        { key: 'call', text: 'Звонок' },
                        { key: 'whatsapp', text: 'WhatsApp' },
                        { key: 'instagram', text: 'Instagram' },
                    ]}
                    selectedKey={data.channel}
                    onChange={handleChange}
                />

                <Select
                    name="source"
                    label="Источник"
                    options={[
                        { key: '', text: 'Не известен' },
                        { key: 'instagram', text: 'Инстаграм' },
                        { key: 'whatsapp', text: 'WhatsApp' },
                        { key: 'yandex', text: 'Яндекс' },
                        { key: 'google', text: 'Google' },
                        { key: 'referral', text: 'Рекомендация' }
                    ]}
                    selectedKey={data.source}
                    onChange={handleChange}
                />

                <TextField
                    name="note"
                    value={data.note}
                    label="Примечание"
                    multiline
                    onChange={handleChange}
                />
            </Stack>
        </Form>
    );
}