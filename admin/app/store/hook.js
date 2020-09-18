import * as store from 'shared/hooks/store';

import * as modules from './modules';

export function useStore(key) {
    const [parent, child] = key.split('.');
    const state = store.useState(state => child ? state[parent][child] : state[parent]);
    const actions = store.useActions(modules[parent]);

    return [state, actions];
}

export function useActions(key) {
    const actions = store.useActions(modules[key]);

    return actions;
}