import { useEffect } from 'react';

import { useStore } from 'shared/hooks/store';
import { actions as enrollmentActions } from 'app/store/modules/enrollments';

export function useEnrollments() {
    const [enrollments, actions] = useStore(state => state.enrollments.list, enrollmentActions);

    useEffect(() => {
        if (!enrollments) {
            actions.getEnrollments();
        }
    }, [enrollments]);

    return [enrollments, actions];
}

export function useEnrollment(id) {
    const [enrollment, actions] = useStore(state => state.enrollments.single, enrollmentActions);

    useEffect(() => {
        if (!id) return;

        if (!enrollment) {
            actions.getEnrollment(id);
        }
    }, [id]);

    return [enrollment, actions];
}