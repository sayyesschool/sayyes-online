import { useEffect } from 'react';

import { useStore } from 'shared/hooks/store';
import { createAssignment } from 'shared/store/modules/assignments';
import { actions as enrollmentActions } from 'shared/store/modules/enrollments';
import { createPost } from 'shared/store/modules/posts';
import { hasKey } from 'shared/utils/object';

const actionsToBind = {
    ...enrollmentActions,
    createAssignment,
    createPost
};

export function useEnrollments(query) {
    const [enrollments, actions] = useStore(
        state => state && hasKey(state.enrollments, 'list')
            ? state.enrollments.list
            : state.enrollments,
        actionsToBind
    );

    useEffect(() => {
        if (!enrollments) {
            actions.getEnrollments(query);
        }
    }, [enrollments]);

    return [enrollments, actions];
}

export function useEnrollment(id) {
    const [enrollment, actions] = useStore(
        state => (state.enrollments && 'single' in state.enrollments)
            ? state.enrollments.single
            : state.enrollment,
        actionsToBind
    );

    const enrollmentId = enrollment?.id;

    useEffect(() => {
        if (!id || enrollmentId === id) return;

        actions.unsetEnrollment();
        actions.getEnrollment(id);
    }, [enrollmentId, id]);

    return [enrollment, actions];
}