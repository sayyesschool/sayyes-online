import { useEffect } from 'react';

import { useStore } from 'shared/hooks/store';
import { actions as _actions } from 'shared/store/modules/tasks';
import { selectList, selectSingle } from 'shared/store/selectors';

export function useTasks(query) {
    const [tasks, actions] = useStore(selectList('tasks'), _actions);

    useEffect(() => {
        actions.getTasks(query);
    }, [query]);

    return [tasks, actions];
}

export function useTask(id) {
    const [task, actions] = useStore(selectSingle('tasks'), _actions);
    const taskId = task?.id;

    useEffect(() => {
        if (taskId === id) return;

        actions.getTask(id);
    }, [taskId, id, actions]);

    useEffect(() => {
        return () => actions.unsetTask();
    }, [actions]);

    return [task, actions];
}