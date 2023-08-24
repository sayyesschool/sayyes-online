import { useState, useEffect } from 'react';

import useRoomContext from 'app/hooks/useRoomContext';

export default function useRoomState() {
    const { room } = useRoomContext();

    const [state, setState] = useState('disconnected');

    useEffect(() => {
        if (!room) return;

        function setRoomState() {
            setState(room?.state || 'disconnected');
        }

        setRoomState();

        room.on('disconnected', setRoomState);
        room.on('reconnected', setRoomState);
        room.on('reconnecting', setRoomState);

        return () => {
            room.off('disconnected', setRoomState);
            room.off('reconnected', setRoomState);
            room.off('reconnecting', setRoomState);
        };
    }, [room]);

    return state;
}