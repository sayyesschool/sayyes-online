import { createAction, createReducer, combineReducers } from 'shared/store/utils';

export const getMeetings = createAction('GET_MEETINGS', (params = {}) => {
    const query = Object.entries(params).map(([k, v]) => `${k}=${v}`).join('&');

    return {
        request: {
            method: 'get',
            url: '/meetings' + (query ? `?${query}` : '')
        }
    };
});

export const getMeeting = createAction('GET_MEETING', id => ({
    request: {
        method: 'get',
        url: `/meetings/${id}`
    }
}));

export const createMeeting = createAction('CREATE_MEETING', data => ({
    request: {
        method: 'post',
        url: '/meetings',
        body: data
    }
}));

export const updateMeeting = createAction('UPDATE_MEETING', (id, data) => ({
    request: {
        method: 'put',
        url: `/meetings/${id}`,
        body: data
    }
}));

export const deleteMeeting = createAction('DELETE_MEETING', id => ({
    request: {
        method: 'delete',
        url: `/meetings/${id}`
    }
}));

export const setMeeting = createAction('SET_MEETING', meeting => ({
    meeting
}));

export const unsetMeeting = createAction('UNSET_MEETING');

export const addRegistration = createAction('ADD_REGISTRATION', (id, data) => ({
    request: {
        method: 'post',
        url: `/meetings/${id}/registrations`,
        body: data
    }
}));

export const updateRegistration = createAction('UPDATE_REGISTRATION', (meetingId, registrationId, action) => ({
    request: {
        method: 'put',
        url: `/meetings/${meetingId}/registrations/${registrationId}`,
        body: { action }
    }
}));

export const removeRegistration = createAction('REMOVE_REGISTRATION', (meetingId, registrationId) => ({
    request: {
        method: 'delete',
        url: `/meetings/${meetingId}/registrations/${registrationId}`
    }
}));

export default combineReducers({
    list: createReducer(null, {
        [getMeetings]: (state, action) => action.data,
        [createMeeting]: (state, action) => state ? [...state, action.data] : [action.data],
        [updateMeeting]: (state, action) => state.map(meeting => meeting.id === action.data.id ? ({ ...meeting, ...action.data }) : meeting),
        [deleteMeeting]: (state, action) => state.filter(m => m.id !== action.data.id)
    }),
    single: createReducer(null, {
        [getMeeting]: (state, action) => action.data,
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
    })
});