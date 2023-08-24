import { createContext } from 'react';

import useConnectionOptions from 'app/hooks/useConnectionOptions';
import useRoom from 'app/hooks/useRoom';

export const RoomContext = createContext(null);

export function RoomProvider({
    onError = Function.prototype,
    onDisconnect = Function.prototype,
    children
}) {
    const connectionOptions = useConnectionOptions();
    const room = useRoom(connectionOptions, onError);

    return (
        <RoomContext.Provider value={room}>
            {children}
        </RoomContext.Provider>
    );
}