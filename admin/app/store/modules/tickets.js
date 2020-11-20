import { createAction, createReducer, combineReducers } from 'shared/store/utils';

export const getTickets = createAction('GET_TICKETS', () => ({
    request: {
        method: 'get',
        url: '/tickets'
    }
}));

export default combineReducers({
    list: createReducer(null, {
        [getTickets]: (state, action) => action.data
    }),
    single: createReducer(null, {

    })
});