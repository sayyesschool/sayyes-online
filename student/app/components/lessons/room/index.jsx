import { connect, createLocalVideoTrack } from 'twilio-video';
import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
    Banner,
    Button,
    Icon,
    LayoutGrid, LayoutGridCell,
    Typography
} from 'mdc-react';

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTSzJkZTlhYmJlNWI0ZTExMDNiMTVjOTExNzg3MmQ1ZTQ1LTE1OTE2Mjc1NDEiLCJpc3MiOiJTSzJkZTlhYmJlNWI0ZTExMDNiMTVjOTExNzg3MmQ1ZTQ1Iiwic3ViIjoiQUNjZWVkMTc3ODY3NWI3MDlmNmFiZjBmZTQzY2VjMjA5MCIsImV4cCI6MTU5MTYzMTE0MSwiZ3JhbnRzIjp7ImlkZW50aXR5IjoiNWVkZTNmMWEyN2ZhMWM0ZTFkMTZmZDRmIiwidmlkZW8iOnsicm9vbSI6IjVlZGUzZjk4MjdmYTFjNGUxZDE3MWVhYiJ9fX0.mPHX-oNxKkr_jcoEeg8iy58448HxEf5MmVY4fPFVTjw';

export default function Room({ name, audio, video }) {
    const localMediaRef = useRef();
    const remoteMediaRef = useRef();
    const [room, setRoom] = useState();
    const [participants, setParticipants] = useState();

    useEffect(() => {
        connect(token, { name, audio, video }).then(room => {
            console.log(`Successfully joined a Room: ${room}`, room);

            setRoom(room);

            const localParticipant = room.localParticipant;
            console.log(`Connected to the Room as LocalParticipant "${localParticipant.identity}"`);


            room.localParticipant.tracks.forEach(publication => {
                localMediaRef.current.appendChild(publication.track.attach());
            });

            // Log any Participants already connected to the Room
            room.participants.forEach(participant => {
                console.log(`Participant "${participant.identity}" is connected to the Room`);

                participant.tracks.forEach(publication => {
                    if (publication.track) {
                        remoteMediaRef.current.appendChild(publication.track.attach());
                    }
                });

                participant.on('trackSubscribed', track => {
                    remoteMediaRef.current.appendChild(track.attach());
                });
            });

            // Log new Participants as they connect to the Room
            room.on('participantConnected', participant => {
                console.log(`Participant "${participant.identity}" connected`);

                participant.tracks.forEach(publication => {
                    if (publication.isSubscribed) {
                        remoteMediaRef.current.appendChild(publication.track.attach());
                    }
                });

                participant.on('trackSubscribed', track => {
                    remoteMediaRef.current.appendChild(track.attach());
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

    return (
        <div id="room">
            <div ref={remoteMediaRef}></div>
            <div ref={localMediaRef}></div>
        </div>
    );
}