import { combineReducers, createAction, createReducer } from 'shared/store/helpers';

export const getTickets = createAction('GET_TICKETS', () => ({
    request: {
        method: 'get',
        path: 'tickets'
    }
}));

export const getTicket = createAction('GET_TICKET', id => ({
    request: {
        method: 'get',
        path: `tickets/${id}`
    }
}));

export const setTicket = createAction('SET_TICKET', ticket => ({
    ticket
}));

export const unsetTicket = createAction('UNSET_TICKET');

export const ticketsReducer = createReducer(null, {
    [getTickets]: (state, action) => action.data
});

export const ticketReducer = createReducer(null, {
    [getTicket]: (state, action) => action.data,
    [setTicket]: (state, action) => action.ticket,
    [unsetTicket]: (state, action) => null
});

export default combineReducers({
    list: ticketsReducer,
    single: ticketReducer
});