import { useCallback, useRef } from 'react';

import { Priority } from 'core/models/task/constants';

import ContentEditor from 'shared/components/content-editor';
import { priorityOptions, topicOptions } from 'shared/data/task';
import { useFormData } from 'shared/hooks/form';
import datetime from 'shared/libs/datetime';
import { Button, Checkbox, Flex, Form, Grid, Surface } from 'shared/ui-components';

const getData = ({
    description = '',
    completed = false,
    topic,
    priority = Priority.Medium,
    ownerId,
    assigneeId,
    dueDate = new Date(),
    reminderDate
} = {}) => ({
    topic,
    description,
    completed,
    priority,
    ownerId,
    assigneeId,
    dueDate: dueDate ? datetime(dueDate).format('YYYY-MM-DD') : undefined,
    reminderDate: reminderDate
        ? datetime(reminderDate).format('YYYY-MM-DDTHH:mm')
        : undefined
});

export default function TaskForm({
    task,
    assignees = [],
    onSubmit,
    children,
    ...props
}) {
    const { data, setData, handleChange } = useFormData(
        getData(task),
        [task?.id]
    );

    const editorRef = useRef();

    const handleSubmit = useCallback(() => {
        const content = editorRef.current.getData();

        onSubmit({
            ...data,
            description: content
        });
    }, [
        data,
        onSubmit
    ]);

    return (
        <Form onSubmit={handleSubmit} {...props}>
            <Grid gap="m">
                <Grid.Item
                    md={6}
                    xs={12}
                >
                    <Flex gap="m" column>
                        {task?.id &&
                            <Checkbox
                                label="Выполнена"
                                name="completed"
                                checked={data.completed}
                                onChange={handleChange}
                            />
                        }

                        <Form.Field label="Описание">
                            <Surface variant="outlined">
                                <ContentEditor
                                    ref={editorRef}
                                    content={data.description}
                                    simple
                                />
                            </Surface>
                        </Form.Field>

                        <Form.Select
                            label="Тема"
                            name="topic"
                            value={data.topic}
                            options={topicOptions}
                            onChange={handleChange}
                        />

                        <Form.Select
                            label="Приоритет"
                            name="priority"
                            value={data.priority}
                            options={priorityOptions}
                            onChange={handleChange}
                        />

                        <Form.Select
                            label="Исполнитель"
                            name="assigneeId"
                            value={data.assigneeId}
                            options={assignees?.map(a => ({
                                key: a.id,
                                value: a.id,
                                content: a.fullname
                            }))}
                            end={data.assigneeId &&
                                <Button
                                    icon="clear"
                                    variant="plain"
                                    size="sm"
                                    onClick={() => setData(data => ({
                                        ...data,
                                        assigneeId: null
                                    }))}
                                />
                            }
                            onChange={handleChange}
                        />

                        <Form.Input
                            label="Срок"
                            type="date"
                            name="dueDate"
                            value={data.dueDate}
                            onChange={handleChange}
                        />

                        {/* <Form.Input
                            label="Напоминание"
                            type="datetime-local"
                            name="reminderDate"
                            value={data.reminderDate}
                            onChange={handleChange}
                        /> */}
                    </Flex>
                </Grid.Item>

                <Grid.Item
                    md={6}
                    xs={12}
                >
                    {children}
                </Grid.Item>
            </Grid>
        </Form>
    );
}