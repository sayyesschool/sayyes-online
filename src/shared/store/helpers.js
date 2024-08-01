export { combineReducers } from 'redux';

import * as store from 'shared/hooks/store';

export function createActions(actions, prefix = '') {
    return Object.entries(actions)
        .reduce((acc, [name, action]) => {
            acc[name] = createAction(prefix + name, action);

            return acc;
        }, {});
}

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
    return function(state = initialState, action) {
        return Object.entries(caseReducers)
            .filter(([key]) => key === action.type)
            .reduce((state, [key, reducer]) => reducer(state, action), state);
    };
}

export function configureActions(modules) {
    return name => {
        const actions = store.useActions(modules[name]);

        return actions;
    };
}

export function configureStore(modules) {
    return name => {
        const [parent, child] = name.split('.');
        const state = store.useState(state => child ? state[parent][child] : state[parent]);
        const actions = store.useActions(modules[parent]);

        return [state, actions];
    };
}