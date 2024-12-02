import { useCallback, useRef } from 'react';

import moment from 'moment';

import ContentEditor from 'shared/components/content-editor';
import ImageField from 'shared/components/image-field';
import { levelOptions } from 'shared/data/common';
import { useFormData } from 'shared/hooks/form';
import { Flex, Form, Grid, Surface } from 'shared/ui-components';

const defaultMeeting = {
    title: '',
    date: new Date(),
    level: undefined,
    duration: 60,
    free: false,
    published: false,
    image: '',
    description: ''
};

export default function MeetingForm({
    meeting = defaultMeeting,
    hosts = [],
    onSubmit
}) {
    const { data, setData, handleChange } = useFormData({
        ...defaultMeeting,
        title: meeting.title,
        date: moment(meeting.date).format('YYYY-MM-DDTHH:mm'),
        hostId: meeting.hostId,
        level: meeting.level?.toString(),
        duration: meeting.duration,
        free: meeting.free,
        published: meeting.published,
        image: meeting.image,
        description: meeting.description
    });

    const fileInputRef = useRef();
    const contentEditorRef = useRef();

    const handleSubmit = useCallback(() => {
        const file = fileInputRef.current.file;
        const content = contentEditorRef.current.getData();

        if (file && !data.file?.delete) {
            file.path = 'meetings';
            data.file = file;
            data.image = data.image || {};
        }

        onSubmit({
            ...data,
            date: moment(data.date).utc().format('YYYY-MM-DDTHH:mm:ss[Z]'),
            description: content
        });

        fileInputRef.current.reset();
    }, [data, onSubmit]);

    const handleDeleteImage = useCallback(image => {
        setData(data => ({
            ...data,
            image: null,
            file: {
                url: image.url,
                delete: true
            }
        }));

        return Promise.resolve();
    }, [setData]);

    return (
        <Form
            id="meeting-form"
            onSubmit={handleSubmit}
        >
            <Grid gap="m">
                <Grid.Item
                    lg={4} md={4}
                    sm={12}
                >
                    <Flex gap="s" column>
                        <Form.Input
                            label="Тема"
                            name="title"
                            value={data.title}
                            required
                            onChange={handleChange}
                        />

                        <Form.Input
                            label="Когда"
                            type="datetime-local"
                            name="date"
                            value={data.date}
                            required
                            onChange={handleChange}
                        />

                        <Form.Select
                            label="Ведущий"
                            name="hostId"
                            value={data.hostId}
                            options={hosts.map(host => ({
                                key: host.id,
                                value: host.id,
                                content: host.fullname
                            }))}
                            onChange={handleChange}
                        />

                        <Form.Select
                            label="Уровень"
                            name="level"
                            value={data.level}
                            options={levelOptions}
                            onChange={handleChange}
                        />

                        {!meeting.id &&
                            <Form.Switch
                                label="Онлайн"
                                name="online"
                                checked={data.online}
                                disabled={data.id}
                                onChange={handleChange}
                            />
                        }

                        <Form.Switch
                            label="Бесплатно"
                            name="free"
                            checked={data.free}
                            onChange={handleChange}
                        />

                        <Form.Switch
                            label="Опубликована"
                            name="published"
                            checked={data.published}
                            onChange={handleChange}
                        />

                        <Form.Input
                            type="number"
                            name="duration"
                            value={data.duration}
                            label="Продолжительность, мин"
                            onChange={handleChange}
                        />

                        <Form.Input
                            type="url"
                            name="materialsUrl"
                            value={data.materialsUrl}
                            label="Ссылка на материалы"
                            onChange={handleChange}
                        />
                    </Flex>
                </Grid.Item>

                <Grid.Item
                    lg={8}
                    md={8}
                    sm={12}
                >
                    <Flex gap="m" column>
                        <ImageField
                            ref={fileInputRef}
                            name="file"
                            label="Изображение"
                            image={data.image}
                            cropperOptions={{
                                aspectRatio: 16 / 9
                            }}
                            onDelete={handleDeleteImage}
                        />

                        <Form.Field label="Описание">
                            <Surface variant="outlined">
                                <ContentEditor
                                    ref={contentEditorRef}
                                    content={data.description ?? ''}
                                />
                            </Surface>
                        </Form.Field>
                    </Flex>
                </Grid.Item>
            </Grid>
        </Form>
    );
}