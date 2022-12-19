import { useEffect, useRef } from 'react';

import useLocalDataTrack from 'app/hooks/useLocalDataTrack';
import useRemoteDataTrack from 'app/hooks/useRemoteDataTrack';

import './index.scss';

export function PointerProvider({ ...props }) {
    const dataTrack = useLocalDataTrack();

    useEffect(() => {
        function handleMouseMove(event) {
            const { pageX: x, pageY: y } = event;

            dataTrack.send(JSON.stringify({
                mouseX: x,
                mouseY: y
            }));
        }

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [dataTrack]);

    return (
        <div className="pointer" />
    );
}

export function PointerConsumer({ ...props }) {
    const pointerRef = useRef();

    const dataTrack = useRemoteDataTrack();

    useEffect(() => {
        dataTrack?.on('message', data => {
            const { mouseX, mouseY } = JSON.parse(data);

            pointerRef.current.style.top = `${mouseY}px`;
            pointerRef.current.style.left = `${mouseX}px`;
        });
    }, [dataTrack]);

    return (
        <div ref={pointerRef} className="pointer" />
    );
}

export default {
    Provider: PointerProvider,
    Consumer: PointerConsumer
};