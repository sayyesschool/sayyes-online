import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import ContentEditor from 'shared/components/content-editor';
import { priorityOptions, themeOptions } from 'shared/data/common';
import { useFormData } from 'shared/hooks/form';
import datetime, { atMSK } from 'shared/libs/datetime';
import { Flex, Form, Grid, Surface } from 'shared/ui-components';

import TaskComments from 'crm/components/tasks/task-comments';

const getData = ({
    performer,
    theme = 'other',
    completed = false,
    priority = 'medium',
    note = '',
    dueAt,
    remindAt
} = {}) => ({
    performer,
    theme,
    dueAt: dueAt ? datetime(dueAt).format('YYYY-MM-DDTHH:mm') : undefined,
    remindAt: remindAt
        ? datetime(remindAt).format('YYYY-MM-DDTHH:mm')
        : undefined,
    completed,
    priority,
    note
});

export default function TaskForm({
    user,
    taskRef,
    task,
    managers = [],
    onSubmit,
    ...props
}) {
    const { data, handleChange } = useFormData(
        getData({ performer: user.id, ...task }),
        [task?.id]
    );
    const noteEditorRef = useRef();
    const [comments, setComments] = useState(task?.comments || []);
    const [isDueAtChecked, setIsDueAtChecked] = useState(Boolean(data.dueAt));
    const [isRemindAtChecked, setIsRemindAtChecked] = useState(
        Boolean(data.remindAt)
    );

    const sortedManagers = useMemo(() => {
        if (!managers) return managers;

        return [
            managers.find(m => m.id === user.id),
            ...managers.filter(m => m.id !== user.id)
        ];
    }, [managers, user.id]);

    const handleSubmit = useCallback(() => {
        const content = noteEditorRef.current.getData();

        const dueAt = isDueAtChecked
            ? datetime(data.dueAt).add(data.dueAt, 'minutes').toDate()
            : null;
        const remindAt = isRemindAtChecked
            ? datetime(data.remindAt).add(data.remindAt, 'minutes').toDate()
            : null;
        const refs = task?.refs.length ? task?.refs : taskRef ? [taskRef] : [];

        onSubmit({
            ...data,
            dueAt,
            remindAt,
            refs,
            note: content,
            comments
        });
    }, [
        comments,
        data,
        isDueAtChecked,
        isRemindAtChecked,
        onSubmit,
        task?.refs,
        taskRef
    ]);

    const onChangeDueAtSwitch = useCallback(() => {
        if (isDueAtChecked) {
            setIsRemindAtChecked(false);
        }

        setIsDueAtChecked(prev => !prev);
    }, [isDueAtChecked]);

    const onRemindAtSwitch = useCallback(() => {
        setIsRemindAtChecked(prev => !prev);
    }, []);

    useEffect(() => {
        if (task?.comments) {
            setComments(task.comments);
        }
    }, [task?.comments]);

    return (
        <Form onSubmit={handleSubmit} {...props}>
            <Grid gap="m">
                <Grid.Item
                    lg={8} md={8}
                    sm={12} xs={12}
                >
                    <Flex gap="m" column>
                        <Form.Select
                            label="Тема"
                            name="theme"
                            value={data.theme}
                            options={themeOptions}
                            onChange={handleChange}
                        />

                        <Form.Field label="Описание">
                            <Surface variant="outlined">
                                <ContentEditor ref={noteEditorRef} content={data.note ?? ''} />
                            </Surface>
                        </Form.Field>
                    </Flex>
                </Grid.Item>

                <Grid.Item
                    lg={4} md={4}
                    sm={12} xs={12}
                >
                    <Flex gap="m" column>
                        <Form.Switch
                            label="Выполнена"
                            name="completed"
                            checked={data.completed}
                            onChange={handleChange}
                        />

                        <Form.Select
                            label="Исполнитель"
                            name="performer"
                            value={data.performer}
                            options={sortedManagers?.map(manager => ({
                                key: manager.id,
                                value: manager.id,
                                content: manager.id === user.id ? 'Я' : manager.fullname
                            }))}
                            required
                            onChange={handleChange}
                        />

                        <Form.Select
                            label="Приоритет"
                            name="priority"
                            value={data.priority}
                            options={priorityOptions}
                            onChange={handleChange}
                        />

                        <Flex gap="s" column>
                            <Form.Switch
                                label="Истекает"
                                checked={isDueAtChecked}
                                onChange={onChangeDueAtSwitch}
                            />

                            {isDueAtChecked && (
                                <Form.Input
                                    type="datetime-local"
                                    name="dueAt"
                                    value={data.dueAt}
                                    message={`Московское время: ${atMSK(data.dueAt).format(
                                        'HH:mm'
                                    )}`}
                                    required
                                    onChange={handleChange}
                                />
                            )}
                        </Flex>

                        <Flex gap="s" column>
                            <Form.Switch
                                label="Напоминание"
                                checked={isRemindAtChecked}
                                disabled={!isDueAtChecked}
                                onChange={onRemindAtSwitch}
                            />

                            {isRemindAtChecked && (
                                <Form.Input
                                    type="datetime-local"
                                    name="remindAt"
                                    value={data.remindAt}
                                    required
                                    onChange={handleChange}
                                />
                            )}
                        </Flex>
                    </Flex>
                </Grid.Item>

                <Grid.Item
                    lg={12} md={12}
                    sm={12} xs={12}
                >
                    <Form.Field label="Комментарии">
                        <TaskComments
                            user={user}
                            comments={comments}
                            setComments={setComments}
                        />
                    </Form.Field>
                </Grid.Item>
            </Grid>
        </Form>
    );
}