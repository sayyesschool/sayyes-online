import { forwardRef, useImperativeHandle, useRef } from 'react';

import { useFormData } from 'shared/hooks/form';
import UserSelect from 'shared/components/user-select';
import { Flex, Form, Text } from 'shared/ui-components';
import { requestChannelOptions, requestStatusOptions, requestSourceOptions } from 'shared/data/request';

import { useStore } from 'app/hooks/store';

const defaultRequest = {
    status: 'new',
    contact: {},
    channel: '',
    source: '',
    utm: {},
    note: undefined
};

function RequestForm({ request = {}, onSubmit, ...props }, ref) {
    const [managers] = useStore('managers.list');

    const formRef = useRef();

    const { data, handleChange } = useFormData({
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
        <Form ref={formRef} className="Form" onSubmit={handleSubmit} {...props}>
            <Form.Select
                name="status"
                value={data.status}
                label="Статус"
                options={requestStatusOptions}
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
                <UserSelect
                    name="client"
                    label="Клиент"
                    value={data.client}
                    options={[{
                        key: request.client.id,
                        value: request.client.id,
                        label: request.client.fullname
                    }]}
                    disabled
                />
            }

            <UserSelect
                name="manager"
                value={data.manager}
                label="Менеджер"
                options={managers?.map(manager => ({
                    key: manager.id,
                    value: manager.id,
                    label: manager.fullname
                }))}
                required
                onChange={handleChange}
            />

            <Form.Select
                name="channel"
                value={data.channel}
                label="Канал связи"
                options={requestChannelOptions}
                onChange={handleChange}
            />

            <Form.Select
                name="source"
                value={data.source}
                label="Источник"
                options={requestSourceOptions}
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

export default forwardRef(RequestForm);