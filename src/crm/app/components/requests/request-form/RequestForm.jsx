import { forwardRef, useImperativeHandle, useRef } from 'react';

import UserSelect from 'shared/components/user-select';
import { requestStatusOptions } from 'shared/data/request';
import { useFormData } from 'shared/hooks/form';
import { useSetting } from 'shared/store/settings';
import { Flex, Form, Text } from 'shared/ui-components';

const defaultRequest = {
    status: 'new',
    type: '',
    channel: '',
    source: '',
    contact: {},
    utm: {},
    note: ''
};

function RequestForm({ request = {}, managers, onSubmit, ...props }, ref) {
    const [requestTypes = {}] = useSetting('request.types');
    const [requestChannels = {}] = useSetting('request.channels');
    const [requestSources = {}] = useSetting('request.sources');

    const formRef = useRef();

    const { data, handleChange } = useFormData({
        ...defaultRequest,
        ...request,
        learnerId: request.learner?.id,
        managerId: request.manager?.id
    });

    useImperativeHandle(ref, () => ({
        get form() { return formRef.current; },
        get data() { return data; }
    }));

    function handleSubmit() {
        data.contact.phone = data.contact?.phone.replace(/ /gm, '');

        onSubmit(data);
    }

    const requestTypeOptions = Object.entries(requestTypes)
        .concat([['', '[Не указан]']])
        .map(([key, value]) => ({
            key: key,
            value: key,
            content: value
        }));

    const requestChannelOptions = Object.entries(requestChannels)
        .concat([['', '[Не указан]']])
        .map(([key, value]) => ({
            key: key,
            value: key,
            content: value
        }));

    const requestSourceOptions = Object.entries(requestSources)
        .concat([['', '[Не указан]']])
        .map(([key, value]) => ({
            key: key,
            value: key,
            content: value
        }));

    return (
        <Form
            ref={formRef}
            className="Form"
            onSubmit={handleSubmit}
            {...props}
        >
            <Form.Select
                name="status"
                value={data.status}
                label="Статус"
                options={requestStatusOptions}
                required
                onChange={handleChange}
            />

            <Form.Input
                name="contact.name"
                value={data.contact?.name}
                label="Имя"
                onChange={handleChange}
            />

            <Form.Input
                name="contact.email"
                value={data.contact?.email}
                label="Эл. почта"
                onChange={handleChange}
            />

            <Form.Input
                name="contact.phone"
                value={data.contact?.phone}
                label="Телефон"
                onChange={handleChange}
            />

            <Form.Select
                name="type"
                value={data.type}
                label="Тип"
                options={requestTypeOptions}
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

            {data.learnerId &&
                <UserSelect
                    name="learnerId"
                    label="Ученик"
                    value={data.learnerId}
                    options={[{
                        key: request.learner.id,
                        value: request.learner.id,
                        label: request.learner.fullname
                    }]}
                    disabled
                />
            }

            <UserSelect
                name="managerId"
                value={data.managerId}
                label="Менеджер"
                options={managers?.map(manager => ({
                    key: manager.id,
                    value: manager.id,
                    label: manager.fullname
                }))}
                required
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