import { useCallback } from 'react';

import { useManagers } from 'shared/hooks/managers';
import { useTask } from 'shared/hooks/tasks';
import { useUser } from 'shared/hooks/user';
import { Button, Surface } from 'shared/ui-components';

import TaskForm from 'crm/components/tasks/task-form';

import styles from './TaskPage.module.scss';

export default function TaskPage({ match }) {
    const [user] = useUser();
    const [managers] = useManagers();
    const [task, actions] = useTask(match.params.taskId);

    const handleUpdate = useCallback(data => {
        return actions.updateTask(task.id, data);
    }, [actions, task?.id]);

    const handleSaveClick = useCallback(() => {
        document.getElementById('task-form')?.requestSubmit?.();
    }, []);

    return (
        <Surface className={styles.root}>
            <TaskForm
                id="task-form"
                user={user}
                task={task}
                managers={managers}
                onSubmit={handleUpdate}
            />

            <Button
                type="button"
                content="Сохранить"
                sx={{ mt: 2, width: '100%' }}
                onClick={handleSaveClick}
            />
        </Surface>
    );
}