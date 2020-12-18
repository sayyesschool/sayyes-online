import { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

export function useState(mapState = state => state) {
    return useSelector(mapState, shallowEqual);
}

export function useActions(mapDispatch = Function.prototype) {
    const dispatch = useDispatch();

    return useMemo(() => bindActionCreators(mapDispatch, dispatch), []);
}

export function useStore(mapState = state => state, mapDispatch) {
    const state = useState(mapState);
    const actions = useActions(mapDispatch);

    return [state, actions];
}

export function useSlice(path) {
    const [parent, child] = path.split('.');
    const state = store.useState(state => child ? state[parent][child] : state[parent]);
    const actions = store.useActions(modules[parent]);

    return [state, actions];
}

export { useStore as default, useSelector };