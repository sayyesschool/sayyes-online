import { useState, useEffect, useLayoutEffect } from 'react';

export function onCreated(fn) {
    const [created, setCreated] = useState(false);

    useEffect(() => {
        if (!created) return;

        setCreated(true);

        return fn();
    }, [created]);
}

export function onMounted(fn) {
    useEffect(() => fn(), []);
}

export function onUpdated(fn, deps) {
    const [created, setCreated] = useState(false);

    useEffect(() => {
        if (!created) return setCreated(true);

        return fn();
    }, deps);
}

export function onDOMUpdated(fn, deps) {
    useLayoutEffect(() => fn(), deps);
}

export function onDestroyed(fn) {
    useEffect(() => () => fn(), []);
}