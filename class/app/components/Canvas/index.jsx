import React, { useRef, useEffect, useCallback } from 'react';

import Whiteboard from 'app/lib/Whiteboard';
import useDataTrack from 'app/hooks/useDataTrack';

import './index.scss';

export default function Canvas({ type, imageSrc, children, ...props }) {
    const imageRef = useRef();
    const canvasRef = useRef();
    const whiteboardRef = useRef();

    const dataTrack = useDataTrack(type);

    const handleImageLoad = useCallback(event => {
        const image = event.target;

        canvasRef.current.width = image.width;
        canvasRef.current.height = image.height;
    }, []);

    useEffect(() => {
        if (!dataTrack) return;

        if (type === 'local') {
            whiteboardRef.current = new Whiteboard(canvasRef.current, (buffer, options) => {
                dataTrack.send(JSON.stringify({
                    buffer,
                    options
                }));
            });
        } else if (type === 'remote') {
            whiteboardRef.current = new Whiteboard(canvasRef.current);

            dataTrack?.on('message', data => {
                const { buffer, options } = JSON.parse(data);
                const { width, height } = canvasRef.current;

                whiteboardRef.current.draw(buffer.map(([x, y]) => [x * width, y * height]), options);
            });
        }

        return () => {
            whiteboardRef.current.destroy();
        };
    }, [type, dataTrack]);

    return (
        <div className="canvas">
            <img ref={imageRef} src={imageSrc} onLoad={handleImageLoad} />

            <canvas ref={canvasRef} {...props} />
        </div>
    );
}