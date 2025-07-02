import { useCallback, useState } from 'react';

import FormDialog from 'shared/components/form-dialog';
import LoadingIndicator from 'shared/components/loading-indicator';
import { useTasks } from 'shared/hooks/tasks';

import TaskForm from 'crm/components/tasks/task-form';
import TasksTable from 'crm/components/tasks/tasks-table';

export default function TasksContent({
    user,
    taskRef,
    managers,
    isFormOpen,
    filters,
    setFormOpen,
    setLoading
}) {
    const [tasks, actions] = useTasks(filters);
    const [task, setTask] = useState();

    const handleFormClose = useCallback(() => {
        setTask();
        setFormOpen(false);
    }, [setFormOpen]);

    const handleSubmit = useCallback(data => {
        setLoading(true);

        return actions
            .createTask(data)
            .then(() => setFormOpen(false))
            .finally(() => setLoading(false));
    }, [actions, setFormOpen, setLoading]);

    const handleUpdate = useCallback(data => {
        setLoading(true);

        return actions
            .updateTask(task.id, data)
            .then(() => setFormOpen(false))
            .finally(() => setLoading(false));
    }, [actions, setFormOpen, setLoading, task?.id]);

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

    if (!tasks) return <LoadingIndicator />;

    return (
        <>
            {Boolean(tasks?.length) && (
                <TasksTable
                    user={user}
                    tasks={tasks}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}

            <FormDialog
                title={task?.id ? 'Изменить задачу' : 'Новая задача'}
                open={isFormOpen}
                onClose={handleFormClose}
            >
                <TaskForm
                    id="task-form"
                    user={user}
                    taskRef={taskRef}
                    task={task}
                    managers={managers}
                    onSubmit={task?.id ? handleUpdate : handleSubmit}
                />
            </FormDialog>
        </>
    );
}