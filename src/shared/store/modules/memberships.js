import { combineReducers, createAction, createReducer } from 'shared/store/helpers';

import { registerForMeeting, unregisterFromMeeting } from './meetings';

export const getMemberships = createAction('GET_MEMBERSHIPS', () => ({
    request: {
        method: 'get',
        path: 'memberships'
    }
}));

export const getMembership = createAction('GET_MEMBERSHIP', id => ({
    request: {
        method: 'get',
        path: `memberships/${id}`
    }
}));

export const createMembership = createAction('CREATE_MEMBERSHIP', data => ({
    request: {
        method: 'post',
        path: 'memberships',
        body: data
    }
}));

export const updateMembership = createAction('UPDATE_MEMBERSHIP', (id, data) => ({
    request: {
        method: 'put',
        path: `memberships/${id}`,
        body: data
    }
}));

export const deleteMembership = createAction('DELETE_MEMBERSHIP', id => ({
    request: {
        method: 'delete',
        path: `memberships/${id}`
    }
}));

export const setMembership = createAction('SET_MEMBERSHIP', membership => ({
    membership
}));

export const unsetMembership = createAction('UNSET_MEMBERSHIP');

export const actions = {
    getMemberships,
    getMembership,
    createMembership,
    updateMembership,
    deleteMembership,
    setMembership,
    unsetMembership
};

export const membershipsReducer = createReducer(null, {
    [getMemberships]: (state, action) => action.data,
    [createMembership]: (state, action) => state ? [...state, action.data] : [action.data],
    [updateMembership]: (state, action) => state?.map(m => m.id !== action.data.id ? m : {
        ...m,
        ...action.data
    }),
    [deleteMembership]: (state, action) => state?.filter(m => m.id !== action.data.id),

    [registerForMeeting]: (state, action) =>
        state?.map(m => m.id !== action.data.membershipId ? m : registerForMeetingUpdate(m, action.data)),
    [unregisterFromMeeting]: (state, action) =>
        state?.map(m => m.id !== action.data.membershipId ? m : unregisterFromMeetingUpdate(m, action.data))
});

export const membershipReducer = createReducer(null, {
    [getMembership]: (state, action) => action.data,
    [setMembership]: (state, action) => action.data,
    [updateMembership]: (state, action) => ({
        ...state,
        ...action.data
    }),
    [deleteMembership]: () => null,
    [unsetMembership]: () => null,

    [registerForMeeting]: (state, action) =>
        state?.id !== action.data.membershipId ? state : registerForMeetingUpdate(state, action.data),
    [unregisterFromMeeting]: (state, action) =>
        state?.id !== action.data.membershipId ? state : unregisterFromMeetingUpdate(state, action.data)
});

export default combineReducers({
    list: membershipsReducer,
    single: membershipReducer
});

function registerForMeetingUpdate(meeting, data) {
    const registrationsCount = meeting.registrationsCount + (data.isFree ? 0 : 1);
    const isFull = meeting.limit && registrationsCount === meeting.limit;
    const isValid = !meeting.isExpired && !isFull;

    return {
        ...meeting,
        registrationIds: meeting.registrationIds.concat(data.id),
        registrationsCount,
        registrations: meeting.registrations.concat(data),
        isValid
    };
}

function unregisterFromMeetingUpdate(meeting, data) {
    const registrationsCount = meeting.registrationsCount - (data.isFree ? 0 : 1);
    const isFull = meeting.limit && registrationsCount === meeting.limit;
    const isValid = !meeting.isExpired && !isFull;

    return {
        ...meeting,
        registrationIds: meeting.registrationIds.filter(id => id !== data.meetingId),
        registrationsCount,
        registrations: meeting.registrations.filter(r => r.id !== data.id),
        isValid
    };
}