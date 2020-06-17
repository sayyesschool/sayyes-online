import { connect, createLocalVideoTrack } from 'twilio-video';
import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
    Card, CardMedia,
    Banner,
    Button,
    Icon,
    LayoutGrid, LayoutGridCell,
    Spinner,
    Typography
} from 'mdc-react';

import './index.scss';

export default function Video({ token, name, settings }) {
    const localMediaRef = useRef();
    const remoteMediaRef = useRef();
    const [room, setRoom] = useState();
    const [participants, setParticipants] = useState();

    useEffect(() => {
        connect(token, { name, audio: true, video: { width: 720 } }).then(room => {
            console.log(`Successfully joined a Room: ${room}`, room);

            setRoom(room);

            const localParticipant = room.localParticipant;
            console.log(`Connected to the Room as LocalParticipant "${localParticipant.identity}"`);


            room.localParticipant.tracks.forEach(publication => {
                publication.track.attach(localMediaRef.current);
            });

            // Log any Participants already connected to the Room
            room.participants.forEach(participant => {
                console.log(`Participant "${participant.identity}" is connected to the Room`);

                participant.tracks.forEach(publication => {
                    if (publication.track) {
                        publication.track.attach(remoteMediaRef.current);
                    }
                });

                participant.on('trackSubscribed', track => {
                    track.attach(remoteMediaRef.current);
                });
            });

            // Log new Participants as they connect to the Room
            room.on('participantConnected', participant => {
                console.log(`Participant "${participant.identity}" connected`);

                participant.tracks.forEach(publication => {
                    if (publication.isSubscribed) {
                        publication.track.attach(remoteMediaRef.current);
                    }
                });

                participant.on('trackSubscribed', track => {
                    track.attach(remoteMediaRef.current);
                });
            });

            // Log Participants as they disconnect from the Room
            room.on('participantDisconnected', participant => {
                console.log(`Participant disconnected: ${participant.identity}`);
            });

            room.on('disconnected', room => {
                // Detach the local media elements
                room.localParticipant.tracks.forEach(publication => {
                    const attachedElements = publication.track.detach();
                    attachedElements.forEach(element => element.remove());
                });
            });
        }, error => {
            console.error(`Unable to connect to Room: ${error.message}`);
        });

        return () => room.disconnect();
    }, []);

    if (!room) return <Spinner />;

    return (
        <Card id="lesson-video">
            <CardMedia wide>
                <video className="media media--local" ref={localMediaRef} />
                <video className="media media--remote" ref={remoteMediaRef} />
            </CardMedia>
        </Card>
    );
}