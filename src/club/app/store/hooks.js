import * as store from 'shared/hooks/store';
import * as modules from 'shared/store/modules';

export function useStore(name) {
    const [parent, child] = name.split('.');
    const state = store.useState(state => child ? state[parent][child] : state[parent]);
    const actions = store.useActions(modules[parent]);

    return [state, actions];
}

export function useActions(name) {
    const actions = store.useActions(modules[name]);

    return actions;
}

export { useStore as default };