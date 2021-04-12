import { useState, useCallback } from 'react';

export function useBoolean(state) {
    const [value, setValue] = useState(state);

    return [
        value,
        useCallback(newValue => setValue(oldValue => typeof newValue === 'boolean' ? newValue : !oldValue), [])
    ];
}