import { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { connect, createLocalVideoTrack, LocalDataTrack } from 'twilio-video';

export function useVideo(token, options) {
    const localMediaRef = useRef();
    const remoteMediaRef = useRef();
    const [room, setRoom] = useState();
    const [participants, setParticipants] = useState();

    useEffect(() => {
        if (!token) return;

        const dataTrack = new LocalDataTrack();

        connect(token, options).then(room => {
            room.localParticipant.publishTrack(dataTrack);

            room.localParticipant.on('trackPublished', publication => {
                console.log(publication);
            });

            // Attach the local track
            room.localParticipant.tracks.forEach(publication => {
                console.log(publication, localMediaRef);
                publication.track.attach(localMediaRef.current);
            });

            room.participants.forEach(participant => {
                console.log(`Participant "${participant.identity}" is connected to the Room`);

                // Attach the tracks that the Participant has already published
                participant.tracks.forEach(publication => {
                    if (publication.track) {
                        publication.track.attach(remoteMediaRef.current);
                    }
                });

                // Attach tracks that the Participant eventually publishes
                participant.on('trackSubscribed', track => {
                    track.attach(remoteMediaRef.current);
                });
            });

            // Log new Participants as they connect to the Room
            room.on('participantConnected', participant => {
                console.log(`Participant "${participant.identity}" connected`);

                // Attach the tracks that the Participant has already published
                participant.tracks.forEach(publication => {
                    if (publication.isSubscribed) {
                        publication.track.attach(remoteMediaRef.current);
                    }
                });

                // Attach tracks that the Participant eventually publishes
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

            setRoom(room);
        }, error => {
            console.error(`Unable to connect to Room: ${error.message}`);
        });

        return () => room.disconnect();
    }, [token]);

    const muteVideo = useCallback(() => {
        room.localParticipant.videoTracks.forEach(publication => {
            publication.track.disable();
        });
    }, [room]);

    const unmuteVideo = useCallback(() => {
        room.localParticipant.videoTracks.forEach(publication => {
            publication.track.enable();
        });
    }, [room]);

    const muteAudio = useCallback(() => {
        room.localParticipant.audioTracks.forEach(publication => {
            publication.track.disable();
        });
    }, [room]);

    const unmuteAudio = useCallback(() => {
        room.localParticipant.audioTracks.forEach(publication => {
            publication.track.enable();
        });
    }, [room]);

    return useMemo(() => ({
        room: room && {
            muteVideo,
            unmuteVideo,
            muteAudio,
            unmuteAudio
        },
        localMediaRef,
        remoteMediaRef
    }), [room]);
}

export function useLocalVideo() {
    const videoRef = useRef();

    useEffect(() => {
        createLocalVideoTrack().then(track => {
            if (videoRef.current) {
                track.attach(videoRef.current);
            }
        });
    }, []);

    return videoRef;
}