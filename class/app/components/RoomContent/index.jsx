import React from 'react';

import AppContent from 'shared/components/app-content';

import './index.scss';

export default function RoomContent({ ...props }) {
    return (
        <AppContent className="room-content" {...props} />
    );
}