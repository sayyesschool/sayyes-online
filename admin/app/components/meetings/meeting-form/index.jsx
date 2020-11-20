import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
    FormField,
    Layout,
    Select, SelectOption,
    Switch,
    TextField
} from 'mdc-react';
import moment from 'moment';

import api from 'shared/services/api';

import useForm from 'shared/hooks/form';
import Form from 'shared/components/form';
import FileInput from 'shared/components/file-input';

import './index.scss';

export default function MeetingForm({ meeting = {}, onSubmit }) {
    const fileInputRef = useRef();
    const [data, setData] = useForm({
        title: meeting.title,
        date: moment(meeting.date).format('YYYY-MM-DDTHH:mm'),
        host: meeting.host && meeting.host.id,
        level: meeting.level,
        duration: meeting.duration,
        free: meeting.free,
        published: meeting.published,
        image: meeting.image,
        description: meeting.description
    });
    const [hosts, setHosts] = useState([]);

    useEffect(() => {
        api.get('/admin/api/users?role=host')
            .then(({ data }) => setHosts(data));
    }, []);

    const handleSubmit = useCallback(() => {
        const file = fileInputRef.current.input.files[0];

        if (file) {
            file.path = `meetings/`;
        }

        getData(data => onSubmit(Object.assign(data, {
            date: moment(data.date).utc().format('YYYY-MM-DDTHH:mm:ss[Z]'),
            file
        })));
        fileInputRef.current.reset();
    }, []);

    return (
        <Form id="meeting-form" onSubmit={handleSubmit}>
            <Layout column>
                <TextField
                    name="title"
                    value={data.title}
                    label="Тема"
                    filled
                    required
                    onChange={setData}
                />

                <TextField
                    type="datetime-local"
                    name="date"
                    value={data.date}
                    label="Когда"
                    filled
                    required
                    onChange={setData}
                />

                <Select
                    name="host"
                    value={data.host}
                    label="Ведущий"
                    filled
                    onChange={setData}
                >
                    {hosts.map(host =>
                        <SelectOption
                            key={host.id}
                            value={host.id}
                        >
                            {host.fullname}
                        </SelectOption>
                    )}
                </Select>

                <Select
                    name="level"
                    value={data.level}
                    label="Уровень"
                    filled
                    onChange={setData}
                >
                    {['Beginner', 'Elementary', 'Intermediate', 'Pre-Intermediate', 'Upper-Intermediate', 'Advanced'].map(level =>
                        <SelectOption
                            key={level}
                            value={level}
                        >
                            {level}
                        </SelectOption>
                    )}
                </Select>

                <FormField label="Бесплатно">
                    <Switch
                        name="free"
                        checked={data.free}
                        onChange={setData}
                    />
                </FormField>

                <FormField label="Опубликована">
                    <Switch
                        name="published"
                        checked={data.published}
                        onChange={setData}
                    />
                </FormField>

                <TextField
                    type="number"
                    name="duration"
                    value={data.duration}
                    label="Продолжительность, мин"
                    filled
                    required
                    onChange={setData}
                />

                <FileInput
                    ref={fileInputRef}
                    name="file"
                    label="Изображение"
                    url={data.image && STATIC_URL + meeting.imageUrl}
                    caption={data.image}
                />

                <TextField
                    name="description"
                    value={data.description}
                    label="Описание"
                    filled
                    textarea
                    onChange={setData}
                />
            </Layout>
        </Form>
    );
}

MeetingForm.defaultProps = {
    meeting: {
        title: '',
        date: new Date(),
        host: {},
        level: '',
        duration: 60,
        free: false,
        published: false,
        image: '',
        description: ''
    }
};