import { useEffect } from 'react';

import { useStore } from 'shared/hooks/store';
import { actions as meetingActions } from 'shared/store/modules/meetings';
import { selectList, selectSingle } from 'shared/store/selectors';

export function useMeetings(query) {
    const [meetings, actions] = useStore(selectList('meetings'), meetingActions);

    useEffect(() => {
        if (!meetings) {
            actions.getMeetings(query);
        }
    }, []);

    return [meetings, actions];
}

export function useMeeting(id) {
    const [meeting, actions] = useStore(selectSingle('meetings'), meetingActions);
    const meetingId = meeting?.id;

    useEffect(() => {
        if (meetingId === id) return;

        actions.getMeeting(id);
    }, [meetingId, id, actions]);

    useEffect(() => {
        return () => actions.unsetMeeting();
    }, [actions]);

    return [meeting, actions];
}