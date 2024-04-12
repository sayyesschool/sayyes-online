import EventEmitter from 'node:events';

import { useCallback, useRef, useState } from 'react';

export default function useRoom(localTracks, onError, options) {
    const optionsRef = useRef(options);
    const [room, setRoom] = useState(new EventEmitter());
    const [isConnecting, setIsConnecting] = useState(false);

    const connect = useCallback(token => {
        const localParticipant = new EventEmitter();
        localParticipant.sid = 'PA7f8315aa1599f67d724cfb0dd245280c';
        localParticipant.audioTracks = new Map();
        localParticipant.dataTracks = new Map();
        localParticipant.identity = 'Олег';
        localParticipant.networkQualityLevel = 5;
        localParticipant.state = 'connected';
        localParticipant.tracks = new Map();
        localParticipant.videoTracks = new Map();

        const room = new EventEmitter();
        room.state = 'connected';
        room.localParticipant = localParticipant;
        room.participants = new Map();

        setRoom(room);
    }, [localTracks, onError]);

    return { room, isConnecting, connect };
}