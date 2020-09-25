import { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { connect, createLocalVideoTrack } from 'twilio-video';

export function useRoom(token, { name, audio, video, localMediaRef, remoteMediaRef }) {
    const [room, setRoom] = useState();
    const [participants, setParticipants] = useState();

    useEffect(() => {
        if (!token) return;

        connect(token, { name, audio, video }).then(room => {
            handleRoom(room, localMediaRef.current, remoteMediaRef.current);
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

function handleRoom(room, localMedia, remoteMedia) {
    room.localParticipant.tracks.forEach(publication => {
        publication.track.attach(localMedia);
    });

    room.participants.forEach(participant => handleParticipantConnected(participant, remoteMedia));

    room.on('participantConnected', participant => handleParticipantConnected(participant, remoteMedia));
    room.on('participantDisconnected', handleParticipantDisconnected);
    room.on('disconnected', handleDisconnected);
}

function handleParticipantConnected(participant, remoteMedia) {
    // Attach the tracks that the Participant has already published
    participant.tracks.forEach(publication => {
        if (publication.isSubscribed) {
            publication.track.attach(remoteMedia);
        }
    });

    // Attach tracks that the Participant eventually publishes
    participant.on('trackSubscribed', track => {
        track.attach(remoteMedia);
    });
}

function handleParticipantDisconnected(participant) {
    console.log(`Participant disconnected: ${participant.identity}`);
}

function handleDisconnected(room) {
    room.localParticipant.tracks.forEach(publication => {
        const attachedElements = publication.track.detach();

        attachedElements.forEach(element => element.remove());
    });
}