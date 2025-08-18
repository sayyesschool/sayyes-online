import { useEffect } from 'react';

import { useActions, useStore } from 'shared/hooks/store';
import { actions as assignmentActions } from 'shared/store/modules/assignments';
import { hasKey } from 'shared/utils/object';

export function useAssignments(query) {
    const [assignments, actions] = useStore(
        state => state && hasKey(state.assignments, 'list') ?
            state.assignments.list :
            state.assignments,
        assignmentActions
    );

    useEffect(() => {
        if (!assignments && query) {
            actions.getAssignments(query);
        }
    }, [actions, assignments, query]);

    return [assignments, actions];
}

export function useAssignment(id) {
    const [assignment, actions] = useStore(
        state => state && hasKey(state.assignments, 'single') ?
            state.assignments.single :
            state.assignment,
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