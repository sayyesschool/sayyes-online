import { forwardRef, useImperativeHandle, useRef } from 'react';

import useForm from 'shared/hooks/form';
import { Flex, Form, Text } from 'shared/ui-components';
import PeopleSelect from 'shared/components/user-select';

import { useStore } from 'app/hooks/store';

import './index.scss';

const defaultRequest = {
    status: 'new',
    contact: {},
    channel: '',
    source: '',
    utm: {},
    note: undefined
};

export default forwardRef(RequestForm);

function RequestForm({ request = {}, onSubmit, ...props }, ref) {
    const formRef = useRef();

    const [managers] = useStore('managers.list');

    const { data, handleChange } = useForm({
        ...defaultRequest,
        ...request,
        client: request.client?.id,
        manager: request.manager?.id
    });

    useImperativeHandle(ref, () => ({
        get form() { return formRef.current; },
        get data() { return data; }
    }));

    function handleSubmit() {
        data.contact.phone = data.contact?.phone.replace(/ /gm, '');

        onSubmit(data);
    }

    return (
        <Form ref={formRef} className="request-form" onSubmit={handleSubmit} {...props}>
            <Form.Select
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
                required
                onChange={handleChange}
            />

            <Form.Input
                name="description"
                value={data.description}
                label="Описание"
                onChange={handleChange}
            />

            <Form.Input
                name="contact.name"
                value={data.contact.name}
                label="Имя"
                onChange={handleChange}
            />

            <Form.Input
                name="contact.phone"
                value={data.contact.phone}
                label="Телефон"
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
                required
                onChange={handleChange}
            />

            <Form.Select
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
                onChange={handleChange}
            />

            <Form.Select
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
                onChange={handleChange}
            />

            <Form.Textarea
                name="note"
                value={data.note}
                label="Примечание"
                onChange={handleChange}
            />

            <Flex as="fieldset" column>
                <Text as="legend">UTM</Text>

                <Form.Input
                    name="utm.source"
                    value={data.utm.source}
                    label="Source"
                    onChange={handleChange}
                />

                <Form.Input
                    name="utm.medium"
                    value={data.utm.medium}
                    label="Medium"
                    onChange={handleChange}
                />

                <Form.Input
                    name="utm.campaign"
                    value={data.utm.campaign}
                    label="Campaign"
                    onChange={handleChange}
                />

                <Form.Input
                    name="utm.term"
                    value={data.utm.term}
                    label="Term"
                    onChange={handleChange}
                />

                <Form.Input
                    name="utm.content"
                    value={data.utm.content}
                    label="Content"
                    onChange={handleChange}
                />
            </Flex>
        </Form>
    );
}