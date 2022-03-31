import { useState, useCallback } from 'react';

export function useBoolean(initialValue = false) {
    const [value, setValue] = useState(initialValue);

    return [
        value,
        useCallback(newValue => {
            return setValue(oldValue => typeof newValue === 'boolean' ? newValue : !oldValue);
        }, [])
    ];
}

export function useObject(initialState = {}) {
    const [state, setState] = useState(initialState);

    const updateState = useCallback((key, value) => {
        if (typeof key === 'object') {
            return setState(state => ({ ...state, ...key }));
        } else if (typeof key === 'string') {
            return setState(state => ({
                ...state,
                [key]: value
            }));
        }
    }, []);

    return [
        state,
        setState,
        updateState
    ];
}