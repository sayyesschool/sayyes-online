import { useEffect, useLayoutEffect, useState } from 'react';

export function useCreated(fn) {
    const [created, setCreated] = useState(false);

    if (!created) fn();

    useEffect(() => setCreated(true), []);

    return created;
}

export function useMounted(fn) {
    useEffect(() => fn(), []);
}

export function useUpdated(fn, deps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        if (!mounted) return setMounted(true);

        return fn();
    }, deps);
}

export function useRendered(fn, deps) {
    useLayoutEffect(() => fn(), deps);
}

export function useUnmounted(fn) {
    useEffect(() => () => fn(), []);
}