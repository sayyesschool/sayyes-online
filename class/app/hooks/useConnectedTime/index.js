import { useRef, useState, useEffect } from 'react';

export default function useConnectedTime() {
    const timerRef = useRef();

    const [time, setTime] = useState(0);

    useEffect(() => {
        const start = Date.now();

        timerRef.current = setInterval(() => {
            setTime(Date.now() - start);
        }, 1000);

        return () => {
            setTime(undefined);
            clearInterval(timerRef.current);
            timerRef.current = null;
        };
    }, []);

    return time;
}