import React from 'react';

import AppSideSheet from 'shared/components/app-side-sheet';

export default function RoomSideSheet({ ...props }) {
    return (
        <AppSideSheet
            title="Чат"
            className="room-side-sheet"
            appContentSelector=".room-content"
            {...props}
        />
    );
}