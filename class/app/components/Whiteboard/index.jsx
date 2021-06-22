import React, { useRef, useEffect, useCallback } from 'react';
import {
    IconButton
} from 'mdc-react';

import { useUser } from 'shared/hooks/user';

import Whiteboard from 'app/lib/Whiteboard';
import useDataTrack from 'app/hooks/useDataTrack';

import './index.scss';

export default function WhiteboardPage({ children, ...props }) {
    const [user] = useUser();

    const rootRef = useRef();
    const canvasRef = useRef();
    const whiteboardRef = useRef();

    const dataTrack = useDataTrack(user.role === 'teacher' ? 'local' : 'remote');

    useEffect(() => {
        function handleResize() {
            const { width, height } = rootRef.current.getBoundingClientRect();

            canvasRef.current.width = width;
            canvasRef.current.height = height;
            console.log('ROOT RECT', width, height, canvasRef.current);
        }

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        console.log('WHITEBOARD USE_EFFECT', type, dataTrack);

        if (!dataTrack) return;

        const type = user.role === 'teacher' ? 'local' : 'remote';

        if (type === 'local') {
            whiteboardRef.current = new Whiteboard(canvasRef.current, (buffer, options) => {
                dataTrack.send(JSON.stringify({
                    action: 'draw',
                    buffer,
                    options
                }));
            });

            return () => {
                whiteboardRef.current.destroy();
            };
        } else if (type === 'remote') {
            console.log('WHITEBOARD CREATED', canvasRef.current);

            whiteboardRef.current = new Whiteboard(canvasRef.current);

            function handleData(data) {
                const { buffer, options } = JSON.parse(data);
                const { width, height } = canvasRef.current;

                whiteboardRef.current.draw(buffer.map(([x, y]) => [x * width, y * height]), options);
            }

            dataTrack.on('message', handleData);

            return () => {
                dataTrack.off('message', handleData);
                whiteboardRef.current.destroy();
            };
        }
    }, [user, dataTrack]);

    const cleanWhiteboard = useCallback(() => {
        whiteboardRef.current.clean();
    }, []);

    const downloadWhiteboard = useCallback(() => {
        const dataURL = canvasRef.current.toDataURL();

        const a = document.createElement('a');
        a.href = dataURL;
        a.download = 'whiteboard.png';
        a.click();
    }, []);

    return (
        <div ref={rootRef} className="whiteboard" {...props}>
            <canvas ref={canvasRef} className="whiteboard__canvas" />

            <div className="whiteboard__controls">
                <IconButton
                    icon="layers_clear"
                    title="Очистить"
                    onClick={cleanWhiteboard}
                />

                <IconButton
                    icon="save"
                    title="Сохранить на диск"
                    onClick={downloadWhiteboard}
                />
            </div>
        </div>
    );
}