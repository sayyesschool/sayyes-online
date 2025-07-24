import { useMemo, useRef } from 'react';

import { debounce, throttle } from '@/shared/utils/fn';

export function useDebounce(fn, delay, deps = []) {
    const fnRef = useRef(fn);

    const debounced = useMemo(() => debounce(fnRef.current, delay), [delay, ...deps]);

    return debounced;
}

export function useThrottle(fn, delay, deps = []) {
    const fnRef = useRef(fn);

    const throttled = useMemo(() => throttle(fnRef.current, delay), [delay, ...deps]);

    return throttled;
}