import { useEffect, useRef, useState } from 'react';

export function useScript(url, onLoad) {
    const onLoadRef = useRef(onLoad);

    const [isLoaded, setLoaded] = useState(false);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = url;
        script.async = true;

        script.onload = () => {
            setLoaded(true);
            onLoadRef.current?.();
        };

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [url]);

    return { isLoaded };
}