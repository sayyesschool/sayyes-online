import { createReducer } from 'shared/store/helpers';

import { getSetting, getSettings, setSetting } from './actions';

export default createReducer(null, {
    [getSettings]: (state, action) => action.data,

    [getSetting]: (state, action) => ({
        ...state,
        [action.data.key]: action.data.value
    }),

    [setSetting]: (state, action) => ({
        ...state,
        [action.data.key]: action.data.value
    })
});