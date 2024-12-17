import { combineReducers, createAction, createReducer } from 'shared/store/helpers';

export const getMeetings = createAction('GET_MEETINGS', query => {
    return {
        request: {
            method: 'get',
            path: 'meetings',
            query
        }
    };
});

export const getMeeting = createAction('GET_MEETING', id => ({
    request: {
        method: 'get',
        path: `meetings/${id}`
    }
}));

export const createMeeting = createAction('CREATE_MEETING', data => ({
    request: {
        method: 'post',
        path: 'meetings',
        body: data
    }
}));

export const updateMeeting = createAction('UPDATE_MEETING', (id, data) => ({
    request: {
        method: 'put',
        path: `meetings/${id}`,
        body: data
    }
}));

export const deleteMeeting = createAction('DELETE_MEETING', id => ({
    request: {
        method: 'delete',
        path: `meetings/${id}`
    }
}));

export const setMeeting = createAction('SET_MEETING', meeting => ({
    meeting
}));

export const unsetMeeting = createAction('UNSET_MEETING');

export const addRegistration = createAction('ADD_MEETING_REGISTRATION', (id, data) => ({
    request: {
        method: 'post',
        path: `meetings/${id}/registrations`,
        body: data
    }
}));

export const updateRegistration = createAction('UPDATE_MEETING_REGISTRATION', (meetingId, registrationId, action) => ({
    request: {
        method: 'put',
        path: `meetings/${meetingId}/registrations/${registrationId}`,
        body: { action }
    }
}));

export const removeRegistration = createAction('REMOVE_MEETING_REGISTRATION', (meetingId, registrationId) => ({
    request: {
        method: 'delete',
        path: `meetings/${meetingId}/registrations/${registrationId}`
    }
}));

export const registerForMeeting = createAction('REGISTER_FOR_MEETING', meetingId => {
    if (typeof window.ym === 'function') {
        // eslint-disable-next-line no-undef
        window.ym(YANDEX_METRIKA_ID, 'reachGoal', 'purchase');
    }

    if (typeof window.gtag === 'function') {
        window.gtag('event', 'click', { event_category: 'purchase' });
    }

    return {
        request: {
            method: 'post',
            path: `meetings/${meetingId}/registrations`
        }
    };
});

export const unregisterFromMeeting = createAction('UNREGISTER_FROM_MEETING', meetingId => ({
    request: {
        method: 'delete',
        path: `meetings/${meetingId}/registrations`
    }
}));

export const actions = {
    getMeetings,
    getMeeting,
    setMeeting,
    unsetMeeting,
    createMeeting,
    updateMeeting,
    deleteMeeting,
    addRegistration,
    updateRegistration,
    removeRegistration,
    registerForMeeting,
    unregisterFromMeeting
};

function map(fn, update) {
    return (state, action) => state && state.map(item => fn(item, action?.data ?? action) ?
        update(item, action?.data ?? action) :
        item
    );
}

export const meetingsReducer = createReducer(null, {
    [getMeetings]: (state, action) => action.data,
    [createMeeting]: (state, action) => state ? [...state, action.data] : [action.data],
    [updateMeeting]: (state, action) => state?.map(meeting => meeting.id === action.data.id ?
        ({ ...meeting, ...action.data }) : meeting
    ),
    [deleteMeeting]: (state, action) => state?.filter(m => m.id !== action.data.id),
    [registerForMeeting]: (state, action) => state?.map(m => m.id !== action.data.meetingId ? m : ({
        ...m,
        registrations: m.registrations.concat(action.data),
        isRegistered: true
    })),
    [unregisterFromMeeting]: (state, action) => state?.map(m => m.id !== action.data.meetingId ? m : ({
        ...m,
        registrations: m.registrations.filter(r => r.userId !== action.data.userId),
        isRegistered: false
    }))
});

export const meetingReducer = createReducer(null, {
    [getMeeting]: (state, action) => action.data,
    [unsetMeeting]: (state, action) => null,
    [updateMeeting]: (state, action) => ({
        ...state,
        ...action.data
    }),
    [deleteMeeting]: (state, action) => null,
    [addRegistration]: (state, action) => ({
        ...state,
        registrations: state.registrations.concat(action.data)
    }),
    [updateRegistration]: (state, action) => ({
        ...state,
        registrations: state.registrations.map(r => r.id === action.data.id ? action.data : r)
    }),
    [removeRegistration]: (state, action) => ({
        ...state,
        registrations: state.registrations.filter(r => r.id !== action.id.id)
    }),
    [registerForMeeting]: (state, action) => ({
        ...state,
        ...action.meeting
    }),
    [unregisterFromMeeting]: (state, action) => ({
        ...state,
        ...action.meeting
    })
});

export default combineReducers({
    list: meetingsReducer,
    single: meetingReducer
});