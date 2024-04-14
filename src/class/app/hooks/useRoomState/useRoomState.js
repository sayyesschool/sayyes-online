import { useEffect, useState } from 'react';

import useRoomContext from 'class/hooks/useRoomContext';

export default function useRoomState() {
    const { room } = useRoomContext();

    const [state, setState] = useState('disconnected');

    useEffect(() => {
        function setRoomState() {
            setState(room.state || 'disconnected');
        }

        setRoomState();

        room
            .on('disconnected', setRoomState)
            .on('reconnected', setRoomState)
            .on('reconnecting', setRoomState);

        return () => {
            room
                .off('disconnected', setRoomState)
                .off('reconnected', setRoomState)
                .off('reconnecting', setRoomState);
        };
    }, [room]);

    return state;
}