import { useCallback, useEffect, useMemo, useState } from 'react';

import FormDialog from 'shared/components/form-dialog';
import LoadingIndicator from 'shared/components/loading-indicator';
import { useManagers } from 'shared/hooks/managers';
import { useTasks } from 'shared/hooks/tasks';
import { useUser } from 'shared/hooks/user';
import { FormField } from 'shared/ui-components';

import TaskComments from 'crm/components/tasks/task-comments';
import TaskForm from 'crm/components/tasks/task-form';
import TasksTable from 'crm/components/tasks/tasks-table';

import styles from './Tasks.module.scss';

const filterFns = {
    own: (task, userId) => task.ownerId === userId && !task.assigneeId,
    assignedToMe: (task, userId) => task.assigneeId === userId,
    assignedByMe: (task, userId) => task.assignerId === userId
};

export default function Tasks({
    entity,
    query = {},
    filter,
    showRefs,
    isFormOpen,
    setFormOpen
}) {
    const [user] = useUser();
    const [managers] = useManagers();
    const [tasks = [], actions] = useTasks(entity ? {
        'refs.id': entity.id,
        ...query
    } : query);

    const [task, setTask] = useState();
    const [comments, setComments] = useState(task?.comments || []);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        if (task?.comments) {
            setComments(task.comments);
        }
    }, [task?.comments]);

    const assignees = useMemo(() => {
        return managers?.filter(m => m.id !== user.id) ?? [];
    }, [managers, user.id]);

    const handleSubmit = useCallback(data => {
        setLoading(true);

        if (entity) {
            data.refs = [{
                id: entity.id,
                entity: entity.type
            }];
        }

        if (data.assigneeId) {
            data.assignerId = user.id;
        }

        data.ownerId = user.id;

        data.comments = comments;

        return actions
            .createTask(data)
            .then(() => setFormOpen(false))
            .finally(() => setLoading(false));
    }, [entity, user, comments, actions, setFormOpen, setLoading]);

    const handleCheck = useCallback(task => {
        return actions
            .updateTask(task.id, { completed: !task.completed });
    }, [actions]);

    const handleUpdate = useCallback(data => {
        setLoading(true);

        data.comments = comments;

        if (data.assigneeId) {
            data.assignerId = user.id;
        } else {
            data.assignerId = null;
        }

        return actions
            .updateTask(task.id, data)
            .then(() => setFormOpen(false))
            .finally(() => setLoading(false));
    }, [actions, comments, user, setFormOpen, setLoading, task?.id]);

    const handleDelete = useCallback(id => {
        setLoading(true);

        return actions
            .deleteTask(id)
            .then(() => setFormOpen(false))
            .finally(() => setLoading(false));
    }, [actions, setFormOpen, setLoading]);

    const handleEdit = useCallback(task => {
        setTask(task);
        setFormOpen(true);
    }, [setFormOpen]);

    const handleFormClose = useCallback(() => {
        setTask();
        setComments([]);
        setFormOpen(false);
    }, [setFormOpen]);

    if (!tasks) return <LoadingIndicator />;

    const filteredTasks = filter ? tasks?.filter(task => filterFns[filter]?.(task, user.id)) : tasks;
    const sortedTasks = filteredTasks.toSorted((a, b) => Number(a.completed) - Number(b.completed));

    return (
        <div className={styles.root}>
            {Boolean(sortedTasks?.length) && (
                <TasksTable
                    tasks={sortedTasks}
                    user={user}
                    showRefs={showRefs}
                    onCheck={handleCheck}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}

            <FormDialog
                className={styles.modal}
                title={task?.id ? undefined : 'Новая задача'}
                open={isFormOpen}
                onClose={handleFormClose}
            >
                <TaskForm
                    id="task-form"
                    task={task}
                    assignees={assignees}
                    onSubmit={task?.id ? handleUpdate : handleSubmit}
                >
                    <FormField label="Комментарии">
                        <TaskComments
                            comments={comments}
                            user={user}
                            onChange={setComments}
                        />
                    </FormField>
                </TaskForm>
            </FormDialog>
        </div>
    );
}