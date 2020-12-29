import { useContext } from 'react';

import { RoomContext } from 'app/contexts/RoomContext';

export default function useRoomContext() {
    const context = useContext(RoomContext);

    if (!context) {
        throw new Error('useRoomContext must be used within a RoomProvider');
    }

    return context;
}