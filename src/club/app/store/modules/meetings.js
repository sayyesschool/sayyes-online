export const GET_MEETINGS = 'GET_MEETINGS';
export const REGISTER_FOR_MEETING = 'REGISTER_FOR_MEETING';
export const UNREGISTER_FROM_MEETING = 'UNREGISTER_FROM_MEETING';

export const actions = {
    GET_MEETINGS,
    REGISTER_FOR_MEETING,
    UNREGISTER_FROM_MEETING
};

export function getMeetings() {
    return {
        type: GET_MEETINGS,
        request: {
            method: 'get',
            url: '/meetings'
        }
    };
}

export function registerForMeeting(meetingId) {
    if (typeof window.ym === 'function') {
        window.ym(YANDEX_METRIKA_ID, 'reachGoal', 'purchase');
    }

    if (typeof window.gtag === 'function') {
        window.gtag('event', 'click', { event_category: 'purchase' });
    }

    return {
        type: REGISTER_FOR_MEETING,
        request: {
            method: 'post',
            url: `/meetings/${meetingId}/registration`
        }
    };
}

export function unregisterFromMeeting(meetingId) {
    return {
        type: UNREGISTER_FROM_MEETING,
        request: {
            method: 'delete',
            url: `/meetings/${meetingId}/registration`
        }
    };
}

export const actionCreators = {
    getMeetings,
    registerForMeeting,
    unregisterFromMeeting
};

export default function reducer(state = [], action) {
    switch (action.type) {
        case GET_MEETINGS:
            return action.meetings;

        case REGISTER_FOR_MEETING:
        case UNREGISTER_FROM_MEETING:
            return state.map(meeting => meeting.id === action.data.meeting.id ? action.data.meeting : meeting);

        default:
            return state;
    }
}