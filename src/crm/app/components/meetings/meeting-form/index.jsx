import { useCallback, useEffect, useRef, useState } from 'react';
import moment from 'moment';

import api from 'shared/services/api';

import useForm from 'shared/hooks/form';
import Form from 'shared/ui-components/form';
import FileInput from 'shared/components/file-input';

import './index.scss';

const defaultMeeting = {
    title: '',
    date: new Date(),
    host: {},
    level: '',
    duration: 60,
    free: false,
    published: false,
    image: '',
    description: ''
};

const levelOptions = [
    { key: 'elementary', value: 'Elementary', text: 'Elementary' },
    { key: 'beginner', value: 'Beginner', text: 'Beginner' },
    { key: 'intermediate', value: 'Intermediate', text: 'Intermediate' },
    { key: 'pre-intermediate', value: 'Pre-intermediate', text: 'Pre-Intermediate' },
    { key: 'upper-intermediate', value: 'Upper-intermediate', text: 'Upper-Intermediate' },
    { key: 'advanced', value: 'Advanced', text: 'Advanced' }
];

const levels = ['Beginner', 'Elementary', 'Intermediate', 'Pre-Intermediate', 'Upper-Intermediate', 'Advanced'];

export default function MeetingForm({ meeting = defaultMeeting, onSubmit }) {
    const fileInputRef = useRef();
    const contentEditorRef = useRef();

    const { data, setData } = useForm({
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

        data.date = moment(data.date).tz('Europe/Moscow', true).utc().format('YYYY-MM-DDTHH:mm:ss[Z]');
        data.description = content;

        if (file) {
            file.path = 'meetings/';
        }

        // if (file) {
        //     upload(file, {
        //         filename: meeting.id,
        //         folder: 'meetings'
        //     }).then(response => {
        //         data.thumbnailUrl = response.url;
        //         onSubmit(data);
        //     });
        // } else {
        //     onSubmit(data);
        // }

        getData(data => onSubmit(Object.assign(data, {
            date: moment(data.date).utc().format('YYYY-MM-DDTHH:mm:ss[Z]'),
            file
        })));
        fileInputRef.current.reset();
    }, []);

    return (
        <Form id="meeting-form" onSubmit={handleSubmit}>
            <Form.Input
                label="Тема"
                name="title"
                value={data.title}
                required
                onChange={setData}
            />

            <Form.Input
                label="Когда"
                type="datetime-local"
                name="date"
                value={data.date}
                required
                onChange={setData}
            />

            <Form.Select
                label="Ведущий"
                name="host"
                value={data.host}
                options={hosts.map(host => ({
                    key: host.id,
                    value: host.id,
                    content: host.fullname
                }))}
                onChange={setData}
            />

            <Form.Select
                label="Уровень"
                name="level"
                value={data.level}
                options={levels.map(level => ({
                    key: level,
                    value: level,
                    content: level
                }))}
                onChange={setData}
            />

            <Form.Switch
                label="Бесплатно"
                name="free"
                checked={data.free}
                onChange={setData}
            />

            <Form.Switch
                label="Опубликована"
                name="published"
                checked={data.published}
                onChange={setData}
            />

            <Form.Input
                type="number"
                name="duration"
                value={data.duration}
                label="Продолжительность, мин"
                filled
                required
                onChange={setData}
            />

            <Form.Input
                type="url"
                name="materialsUrl"
                value={data.materialsUrl}
                label="Ссылка на материалы"
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

            <Form.Field label="Описание">
                <ContentEditor
                    ref={contentEditorRef}
                    content={data.description}
                />
            </Form.Field>

            {/* {!meeting.id &&
                <Form.Field label="Онлайн">
                    <Switch
                        name="online"
                        checked={data.online}
                        disabled={data.id}
                        onChange={setData}
                    />
                </Form.Field>
            } */}
        </Form>
    );
}