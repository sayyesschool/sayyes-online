import React from 'react';
import {
    Icon,
    Snackbar
} from 'mdc-react';

import useRoomState from 'app/hooks/useRoomState';

export default function ReconnectingNotification() {
    const roomState = useRoomState();

    return (
        <Snackbar
            open={roomState === 'reconnecting'}
            icon={<Icon>error</Icon>}
            text="Connection Lost: Reconnecting to room..."
        />
    );
}