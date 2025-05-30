import { useCallback, useRef } from 'react';

import ContentEditor from 'shared/components/content-editor';
import ImageField from 'shared/components/image-field';
import { levelOptions } from 'shared/data/common';
import { meetingStatusOptions } from 'shared/data/meeting';
import { useFormData } from 'shared/hooks/form';
import datetime, { atMSK } from 'shared/libs/datetime';
import { Flex, Form, Grid, Surface } from 'shared/ui-components';

const getFormData = ({
    title = '',
    startDate = new Date(),
    duration = 50,
    level = '',
    status = 'scheduled',
    hostId = '',
    online = false,
    free = false,
    published = false,
    image = {},
    description = '',
    materialsUrl = ''
} = {}) => ({
    title,
    startDate: datetime(startDate).format('YYYY-MM-DDTHH:mm'),
    level: level?.toString(),
    duration,
    status,
    hostId,
    online,
    free,
    published,
    image,
    description,
    materialsUrl
});

export default function MeetingForm({
    meeting,
    hosts = [],
    onSubmit,
    ...props
}) {
    const { data, setData, handleChange } = useFormData(
        getFormData(meeting),
        [meeting?.id]
    );

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

        const startDate = datetime(data.startDate).toDate();
        const endDate = datetime(data.startDate).add(data.duration, 'minutes').toDate();

        onSubmit({
            ...data,
            startDate,
            endDate,
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
            onSubmit={handleSubmit}
            {...props}
        >
            <Grid gap="m">
                <Grid.Item
                    lg={4}
                    md={4}
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
                            name="startDate"
                            value={data.startDate}
                            message={`Московское время: ${atMSK(data.startDate).format('HH:mm')}`}
                            required
                            onChange={handleChange}
                        />

                        <Form.Input
                            label="Продолжительность"
                            type="number"
                            name="duration"
                            value={data.duration}
                            required
                            onChange={handleChange}
                        />

                        <Form.Select
                            label="Ведущий"
                            name="hostId"
                            value={data.hostId}
                            options={hosts?.map(host => ({
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

                        <Form.Select
                            label="Статус"
                            name="status"
                            value={data.status}
                            options={meetingStatusOptions}
                            onChange={handleChange}
                        />

                        {!meeting?.id &&
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

                        <Form.Input
                            type="url"
                            name="materialsUrl"
                            value={data.materialsUrl}
                            label="Ссылка на материалы"
                            onChange={handleChange}
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