import classnames from 'classnames';
import {
    Avatar,
    Icon,
    Typography
} from 'mdc-react';

import useRoomContext from 'app/hooks/useRoomContext';
import useIsTrackSwitchedOff from 'app/hooks/useIsTrackSwitchedOff';
import usePublications from 'app/hooks/usePublications';
import useScreenShareParticipant from 'app/hooks/useScreenShareParticipant';
import useTrack from 'app/hooks/useTrack';
import useParticipantIsReconnecting from 'app/hooks/useParticipantIsReconnecting';

import AudioLevelIndicator from '../AudioLevelIndicator/AudioLevelIndicator';

export default function MainParticipantInfo({ participant, children }) {
    const { room: { localParticipant } } = useRoomContext();
    const screenShareParticipant = useScreenShareParticipant();
    const publications = usePublications(participant);
    const isVideoSwitchedOff = useIsTrackSwitchedOff(videoTrack);
    const isParticipantReconnecting = useParticipantIsReconnecting(participant);

    const videoPublication = publications.find(p => p.trackName.includes('camera'));
    const screenSharePublication = publications.find(p => p.trackName.includes('screen'));
    const audioPublication = publications.find(p => p.kind === 'audio');

    const videoTrack = useTrack(screenSharePublication || videoPublication);
    const audioTrack = useTrack(audioPublication);

    const isLocal = localParticipant === participant;
    const isVideoEnabled = Boolean(videoTrack);
    const isRemoteParticipantScreenSharing = screenShareParticipant && screenShareParticipant !== localParticipant;

    return (
        <div
            className={classnames('main-participant-info', {
                'main-participant-info--fullwidth': !isRemoteParticipantScreenSharing,
            })}
            data-cy-main-participant
            data-cy-participant={participant.identity}
        >
            <div className="main-participant-info__container">
                <div className="main-participant-info__identity">
                    <AudioLevelIndicator audioTrack={audioTrack} />

                    <Typography variant="body1" noMargin>
                        {participant.name}
                        {isLocal && ' (Вы)'}
                        {screenSharePublication && ' - Экран'}
                    </Typography>
                </div>
            </div>

            {(!isVideoEnabled || isVideoSwitchedOff) && (
                <div className="main-participant-info__avatar-container">
                    <Avatar icon={<Icon>person</Icon>} large />
                </div>
            )}

            {isParticipantReconnecting && (
                <div className="main-participant-info__reconnecting-container">
                    <Typography variant="body1" noMargin>Reconnecting...</Typography>
                </div>
            )}

            {children}
        </div>
    );
}
