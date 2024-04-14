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
    removeRegistration
};

export const meetingsReducer = createReducer(null, {
    [getMeetings]: (state, action) => action.data,
    [createMeeting]: (state, action) => state ? [...state, action.data] : [action.data],
    [updateMeeting]: (state, action) => state.map(meeting => meeting.id === action.data.id ? ({ ...meeting, ...action.data }) : meeting),
    [deleteMeeting]: (state, action) => state.filter(m => m.id !== action.data.id)
});

export const meetingReducer = createReducer(null, {
    [getMeeting]: (state, action) => action.data,
    [unsetMeeting]: (state, action) => null,
    [updateMeeting]: (state, action) => ({
        ...state,
        ...action.meeting
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
    })
});

export default combineReducers({
    list: meetingsReducer,
    single: meetingReducer
});