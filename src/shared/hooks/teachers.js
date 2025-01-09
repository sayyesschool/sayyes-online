import { useEffect } from 'react';

import { useStore } from 'shared/hooks/store';
import { actions as _actions } from 'shared/store/modules/teachers';
import { selectList, selectSingle } from 'shared/store/selectors';

export function useTeachers(query) {
    const [teachers, actions] = useStore(selectList('teachers'), _actions);

    useEffect(() => {
        if (!teachers) {
            actions.getTeachers(query);
        }
    }, []);

    return [teachers, actions];
}

export function useTeacher(id) {
    const [teacher, actions] = useStore(selectSingle('teachers'), _actions);
    const teacherId = teacher?.id;

    useEffect(() => {
        if (teacherId !== id) {
            actions.getTeacher(id);
        }

        return () => actions.unsetTeacher();
    }, [teacherId, id, actions]);

    return [teacher, actions];
}