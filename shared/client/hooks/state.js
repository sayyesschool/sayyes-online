import { useState, useCallback } from 'react';

export function useBoolean(state) {
    const [value, setValue] = useState(state);

    return [
        value,
        useCallback(value => setValue(v => (typeof value === 'boolean' && value) || !v), [])
    ];
}