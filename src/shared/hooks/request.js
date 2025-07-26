import { useEffect, useMemo, useRef } from 'react';

export function useRequest(fn, deps) {
    const memoedFn = useMemo(() => fn, [...deps]);
    const isPending = useRef(false);

    useEffect(() => {
        if (isPending.current) return;

        isPending.current = true;
        memoedFn().finally(() => {
            isPending.current = false;
        });
    }, [memoedFn]);
}