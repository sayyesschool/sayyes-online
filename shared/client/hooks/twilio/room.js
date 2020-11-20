import { useRef, useState, useEffect, useCallback } from 'react';
import { connect as _connect, createLocalVideoTrack, LocalVideoTrack } from 'twilio-video';

export function useRoom(token, { localWebcamRef, remoteWebcamRef, remoteScreenRef }) {
    const roomRef = useRef();
    const audioTrackRef = useRef();
    const videoTrackRef = useRef();
    const screenTrackRef = useRef();
    const timerRef = useRef();
    const startTimeRef = useRef();

    const [isConnecting, setConnecting] = useState(false);
    const [isConnected, setConnected] = useState(false);
    const [isAudioOn, setAudioOn] = useState(false);
    const [isVideoOn, setVideoOn] = useState(false);
    const [isSharingScreen, setSharingScreen] = useState(false);
    const [time, setTime] = useState();

    useEffect(() => () => roomRef.current?.disconnect(), []);

    useEffect(() => {
        if (isConnected) {
            setTime(0);
            startTimeRef.current = Date.now();
            timerRef.current = setInterval(() => {
                const start = startTimeRef.current;
                const now = Date.now();

                setTime(now - start);
            }, 1000);
        } else {
            clearInterval(timerRef.current);
            setTime(undefined);
            startTimeRef.current = null;
            timerRef.current = null;
        }
    }, [isConnected]);

    const connect = useCallback(({ name, audio = true, video = true }) => {
        if (!token) return;

        setConnecting(true);

        _connect(token, {
            name,
            audio: audio && { name: 'microphone' },
            video: video && { name: 'camera' }
        })
            .then(room => {
                console.log('Connected to Room: ', room);

                room.localParticipant.tracks.forEach(publication => {
                    const track = publication.track;

                    if (track.name === 'microphone') {
                        setAudioOn(track.isEnabled);

                        track.on('started', () => setAudioOn(true));
                        track.on('enabled', () => setAudioOn(true));
                        track.on('stopped', () => setAudioOn(false));
                        track.on('disabled', () => setAudioOn(false));

                        audioTrackRef.current = track;
                    } else if (track.name === 'camera') {
                        setVideoOn(track.isEnabled);

                        track.on('started', () => setVideoOn(true));
                        track.on('enabled', () => setVideoOn(true));
                        track.on('stopped', () => setVideoOn(false));
                        track.on('disabled', () => setVideoOn(false));

                        videoTrackRef.current = track;
                    }

                    publication.track.attach(localWebcamRef.current);
                });

                room.participants.forEach(participant => handleParticipantConnected(participant, remoteWebcamRef.current, remoteScreenRef.current));

                room.on('participantConnected', participant => handleParticipantConnected(participant, remoteWebcamRef.current, remoteScreenRef.current));
                room.on('participantDisconnected', handleParticipantDisconnected);
                room.on('disconnected', () => {
                    room.localParticipant.tracks.forEach(publication => {
                        publication.track.stop();
                        publication.track.detach();
                    });

                    setConnected(false);
                });

                roomRef.current = room;
                setConnecting(false);
                setConnected(true);
            })
            .catch(error => {
                console.error(`Unable to connect to Room: ${error.message}`);
            });
    }, [token]);

    const disconnect = useCallback(() => {
        roomRef.current?.disconnect();
    }, []);

    const muteVideo = useCallback(() => videoTrackRef.current.disable(), []);

    const unmuteVideo = useCallback(() => videoTrackRef.current.enable(), []);

    const muteAudio = useCallback(() => audioTrackRef.current.disable(), []);

    const unmuteAudio = useCallback(() => audioTrackRef.current.enable(), []);

    const shareScreen = useCallback(() => {
        if (screenTrackRef.current) {
            screenTrackRef.current.enable();
        } else {
            createScreenTrack()
                .then(screenTrack => {
                    screenTrack.on('started', () => setSharingScreen(true));
                    screenTrack.on('stopped', () => setSharingScreen(false));
                    screenTrack.on('enabled', () => setSharingScreen(true));
                    screenTrack.on('disabled', () => setSharingScreen(false));

                    roomRef.current.localParticipant.publishTrack(screenTrack);
                    screenTrackRef.current = screenTrack;
                });
        }
    }, []);

    const unshareScreen = useCallback(() => {
        screenTrackRef.current.disable();
    }, []);

    return {
        ref: roomRef,
        isConnecting,
        isConnected,
        isVideoOn,
        isAudioOn,
        isSharingScreen,
        connect,
        disconnect,
        muteVideo,
        unmuteVideo,
        muteAudio,
        unmuteAudio,
        shareScreen,
        unshareScreen,
        time
    };
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

function handleParticipantConnected(participant, remoteCameraElement, remoteScreenElement) {
    // Attach the tracks that the Participant has already published
    participant.tracks.forEach(publication => {
        if (publication.isSubscribed) {
            if (publication.track.name === 'camera') {
                publication.track.attach(remoteCameraElement);
            } else if (publication.track.name === 'screen') {
                publication.track.attach(remoteScreenElement);
            }
        }
    });

    // Attach tracks that the Participant eventually publishes
    participant.on('trackSubscribed', track => {
        if (track.name === 'camera') {
            remoteCameraElement.appendChild(track.attach());
        } else if (track.name === 'screen') {
            remoteScreenElement.appendChild(track.attach());
        }
    });

    participant.on('trackUnsubscribed', track => {
        console.log('trackUnsubscribed', track);
        // if (track.name === 'camera') {
        //     track.attach(remoteCameraMedia);
        // } else if (track.name === 'screen') {
        //     track.attach(remoteScreenMedia);
        // }
    });
}

function handleParticipantDisconnected(participant) {
    console.log(`Participant disconnected: ${participant.identity}`);

    participant.tracks.forEach(publication => {
        if (publication.isSubscribed) {
            publication.track.detach();
        }
    });
}

function createScreenTrack() {
    return navigator.mediaDevices.getDisplayMedia()
        .then(stream => new LocalVideoTrack(stream.getTracks()[0], { name: 'screen' }))
        .catch(console.error);
}