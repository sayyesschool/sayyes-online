import { Avatar, Label, Text } from '@fluentui/react-northstar';
import classnames from 'classnames';

import { Avatar, Label, Text } from 'shared/ui-components';

import useRoomContext from 'app/hooks/useRoomContext';
import useIsTrackSwitchedOff from 'app/hooks/useIsTrackSwitchedOff';
import usePublications from 'app/hooks/usePublications';
import useTrack from 'app/hooks/useTrack';
import useParticipantIsReconnecting from 'app/hooks/useParticipantIsReconnecting';

import AudioLevelIndicator from '../AudioLevelIndicator/AudioLevelIndicator';

export default function MainParticipantInfo({ participant, children }) {
    const { localParticipant, screenShareParticipant } = useRoomContext();
    const publications = usePublications(participant);
    const isVideoSwitchedOff = useIsTrackSwitchedOff(videoTrack);
    const isParticipantReconnecting = useParticipantIsReconnecting(participant);

    const audioPublication = publications.find(p => p.kind === 'audio');
    const videoPublication = publications.find(p => p.trackName.includes('camera'));
    const screenSharePublication = publications.find(p => p.trackName.includes('screen'));

    const videoTrack = useTrack(screenSharePublication || videoPublication);
    const audioTrack = useTrack(audioPublication);

    const isLocal = localParticipant === participant;
    const isVideoEnabled = Boolean(videoTrack);
    const isRemoteParticipantScreenSharing = screenShareParticipant && screenShareParticipant !== localParticipant;
    const classNames = classnames('main-participant-info', {
        'main-participant-info--fullwidth': !isRemoteParticipantScreenSharing,
    });

    return (
        <div
            className={classNames}
            data-cy-main-participant
            data-cy-participant={participant.identity}
        >
            <div className="main-participant-info__container">
                <Label
                    className="main-participant-info__identity"
                    icon={<AudioLevelIndicator audioTrack={audioTrack} />}
                    content={<>
                        {participant.name}
                        {isLocal && ' (Вы)'}
                        {screenSharePublication && ' - Экран'}
                    </>}
                    color="white"
                />
            </div>

            {(!isVideoEnabled || isVideoSwitchedOff) && (
                <div className="main-participant-info__avatar-container">
                    <Avatar name={participant.name} />
                </div>
            )}

            {isParticipantReconnecting && (
                <div className="main-participant-info__reconnecting-container">
                    <Text>Reconnecting...</Text>
                </div>
            )}

            {children}
        </div>
    );
}