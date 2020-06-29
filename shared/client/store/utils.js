import { combineReducers } from 'redux';

export function createAction(type, fn) {
    function actionCreator(...args) {
        if (!fn) return { type };

        const result = fn(...args);

        if (typeof result !== 'object') {
            throw new TypeError('Function did not return an object');
        }

        return {
            type,
            ...result
        };
    }

    actionCreator.type = type;
    actionCreator.toString = () => `${type}`;
    actionCreator.match = action => action.type === type;

    return actionCreator;
}

export function createReducer(initialState, caseReducers) {
    return function(state, action) {
        if (state === undefined) {
            state = initialState;
        }

        return Object.entries(caseReducers)
            .filter(([key]) => key === action.type)
            .reduce((state, [key, reducer]) => reducer(state, action), state);
    };
}

export { combineReducers };