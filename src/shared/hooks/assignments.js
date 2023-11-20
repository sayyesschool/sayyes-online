import { useEffect } from 'react';

import { useStore, useActions } from 'shared/hooks/store';
import { actions as assignmentActions } from 'shared/store/modules/assignments';

export function useAssignments() {
    const [assignments, actions] = useStore(
        state => state?.assignments?.list ?? state.assignments,
        assignmentActions
    );

    useEffect(() => {
        if (!assignments) {
            actions.getAssignments();
        }
    }, [assignments]);

    return [assignments, actions];
}

export function useAssignment(id) {
    const [assignment, actions] = useStore(
        state => state?.assignments?.single ?? state.assignment,
        assignmentActions
    );

    useEffect(() => {
        if (!id) return;

        if (!assignment) {
            actions.getAssignment(id);
        }

        return () => actions.unsetAssignment();
    }, [id]);

    return [assignment, actions];
}

export function useAssignmentActions() {
    return useActions(assignmentActions);
}