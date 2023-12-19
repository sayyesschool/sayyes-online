import { hasKey } from 'shared/utils/object';

export function selectList(slice) {
    return state => state && hasKey(state[slice], 'list') ?
        state[slice].list :
        state[slice];
}

export function selectSingle(slice) {
    return state => state && hasKey(state[slice], 'single') ?
        state[slice].single :
        state[slice.slice(0, -1)];
}