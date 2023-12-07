import { REGISTER_FOR_MEETING, UNREGISTER_FROM_MEETING } from './meetings';

export const GET_TICKETS = 'GET_TICKETS';

export const actions = {
    GET_TICKETS
};

export default function reducer(state = [], action) {
    switch (action.type) {
        case GET_TICKETS:
            return action.tickets;

        case REGISTER_FOR_MEETING:
        case UNREGISTER_FROM_MEETING:
            return action.ticket ? state.map(ticket => ticket.id === action.ticket.id ? action.ticket : ticket): state;

        default:
            return state;
    }
}

export function getTickets() {
    return {
        type: GET_TICKETS,
        request: {
            method: 'get',
            url: '/tickets'
        }
    };
}

export const actionCreators = {
    getTickets
};