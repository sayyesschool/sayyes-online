import React from 'react';

import RoomHeader from 'app/components/RoomHeader';
import RoomContent from 'app/components/RoomContent';
import MainParticipant from 'app/components/MainParticipant';
import ParticipantList from 'app/components/ParticipantList';

export default function Room() {
    return (
        <div className="room">
            <RoomHeader />

            <RoomContent>
                <MainParticipant />
                <ParticipantList />
            </RoomContent>
        </div>
    );
}