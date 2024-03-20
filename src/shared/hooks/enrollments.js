import { useEffect } from 'react';

import { useStore } from 'shared/hooks/store';
import { actions as enrollmentActions } from 'shared/store/modules/enrollments';
import { createAssignment } from 'shared/store/modules/assignments';
import { createPost } from 'shared/store/modules/posts';

const actionsToBind = {
    ...enrollmentActions,
    createAssignment,
    createPost
};

export function useEnrollments() {
    const [enrollments, actions] = useStore(state =>
        (state.enrollments && 'list' in state.enrollments) ?
            state.enrollments.list :
            state.enrollments,
        actionsToBind
    );

    useEffect(() => {
        if (!enrollments) {
            actions.getEnrollments();
        }
    }, [enrollments]);

    return [enrollments, actions];
}

export function useEnrollment(id) {
    const [enrollment, actions] = useStore(state =>
        (state.enrollments && 'single' in state.enrollments) ?
            state.enrollments.single :
            state.enrollment,
        actionsToBind
    );

    useEffect(() => {
        if (!id) return;

        if (!enrollment) {
            actions.getEnrollment(id);
        }
    }, [id]);

    return [enrollment, actions];
}