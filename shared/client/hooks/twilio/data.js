import { useState, useEffect } from 'react';
import { connect, LocalDataTrack } from 'twilio-video';

export function useData(token, options) {
    const [dataTrack, setDataTrack] = useState();

    useEffect(() => {
        if (!token) return;

        const dataTrack = new LocalDataTrack();

        connect(token, { name: options?.name, tracks: [dataTrack] }).then(room => {
            room.localParticipant.publishTrack(dataTrack);

            room.localParticipant.on('trackPublished', publication => {
                if (publication.track === dataTrack) {
                    setDataTrack(publication.track);
                }
            });

            room.localParticipant.on('trackPublicationFailed', (error, track) => {
                console.log(error, track);
                // if (track === dataTrack) {
                //     dataTrackPublished.reject(error);
                // }
            });

            room.participants.forEach(participant => {
                participant.on('trackSubscribed', track => {
                    if (track.kind === 'data') {
                        track.on('message', data => {
                            options.onMessage(data);
                        });
                    }
                });
            });
        }, error => {
            console.error(`Unable to connect to Room: ${error.message}`);
        });
    }, [token]);

    return dataTrack;
}