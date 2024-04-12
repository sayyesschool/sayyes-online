import { useMemo } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { bindActionCreators } from 'redux';

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

export { useStore as default, useSelector };