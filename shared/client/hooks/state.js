import { useState, useCallback } from 'react';

export function useBoolean(state = false) {
    const [value, setValue] = useState(state);

    return [
        value,
        useCallback(newValue => setValue(oldValue => typeof newValue === 'boolean' ? newValue : !oldValue), [])
    ];
}