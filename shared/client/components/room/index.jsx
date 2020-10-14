import React, { forwardRef, useRef, useState, useEffect, useCallback, useImperativeHandle } from 'react';
import {
    IconButton,
    Typography
} from 'mdc-react';

import { useRoom } from 'shared/hooks/twilio';
import VideoPreviewDialog from 'shared/components/video-preview-dialog';

import './index.scss';

forwardRef(Room);

export default function Room({ name, audio = true, video = true }, ref) {
    const localMediaRef = useRef();
    const remoteMediaRef = useRef();

    // if (isPreviewOpen) return (
    //     <VideoPreviewDialog
    //         appear
    //         open={isPreviewOpen}
    //         onClose={() => setPreviewOpen(false)}
    //     />
    // );

    return (
        <article className="room">
            <video ref={localMediaRef} className="media media--local" />
            <video ref={remoteMediaRef} className="media media--remote" />
        </article>
    );
}