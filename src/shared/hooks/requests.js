import { useEffect } from 'react';

import { useStore } from 'shared/hooks/store';
import { actions as meetingActions } from 'shared/store/modules/meetings';

export function useRequests(query) {
    const [meetings, actions] = useStore(state => state.meetings, meetingActions);

    useEffect(() => {
        if (!meetings) {
            actions.getMeetings(query);
        }
    }, []);

    return [meetings, actions];
}

export function useMeeting(id) {
    const [meeting, actions] = useStore(state => state.meeting, meetingActions);

    useEffect(() => {
        if (!meeting) {
            actions.getMeeting(id);
        }

        return () => actions.unsetMeeting();
    }, [id]);

    return [meeting, actions];
}