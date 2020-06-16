import { useState, useCallback, useEffect } from 'react';
import { connect } from 'twilio-video';

export function useRoom(token, options) {
    const [room, setRoom] = useState();

    useEffect(() => {
        connect(token, {
            name: lesson.id,
            audio: true,
            video: { width: 640 }
        }).then(room => {

            console.log(`Successfully joined a Room: ${room}`);

            const localParticipant = room.localParticipant;
            console.log(`Connected to the Room as LocalParticipant "${localParticipant.identity}"`);

            // Log any Participants already connected to the Room
            room.participants.forEach(participant => {
                console.log(`Participant "${participant.identity}" is connected to the Room`);
            });

            // Log new Participants as they connect to the Room
            room.once('participantConnected', participant => {
                console.log(`Participant "${participant.identity}" has connected to the Room`);
            });

            // Log Participants as they disconnect from the Room
            room.once('participantDisconnected', participant => {
                console.log(`Participant "${participant.identity}" has disconnected from the Room`);
            });

            room.on('participantConnected', participant => {
                console.log(`Participant "${participant.identity}" connected`);

                participant.tracks.forEach(publication => {
                    const track = publication.track;

                    if (track) {
                        document.getElementById('remote-media-div').appendChild(track.attach());
                    }

                    if (publication.isSubscribed) {
                        document.getElementById('remote-media-div').appendChild(track.attach());
                    }
                });

                participant.on('trackSubscribed', track => {
                    document.getElementById('remote-media-div').appendChild(track.attach());
                });
            });

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

            setRoom(room);
        }, error => {
            console.error(`Unable to connect to Room: ${error.message}`);
        });

        return () => room.disconnect();
    }, []);

    return room;
}