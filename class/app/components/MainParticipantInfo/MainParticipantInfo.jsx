import classnames from 'classnames';

import { Avatar, Label, Text } from 'shared/ui-components';

import useIsTrackSwitchedOff from 'app/hooks/useIsTrackSwitchedOff';
import useParticipantIsReconnecting from 'app/hooks/useParticipantIsReconnecting';
import usePublications from 'app/hooks/usePublications';
import useTrack from 'app/hooks/useTrack';
import AudioLevelIndicator from 'app/components/AudioLevelIndicator';

export default function MainParticipantInfo({
    participant,
    local,
    fullWidth,
    children
}) {
    const publications = usePublications(participant);
    const isParticipantReconnecting = useParticipantIsReconnecting(participant);

    const audioPublication = publications.find(p => p.kind === 'audio');
    const videoPublication = publications.find(p => p.trackName.includes('camera'));
    const screenSharePublication = publications.find(p => p.trackName.includes('screen'));

    const audioTrack = useTrack(audioPublication);
    const videoTrack = useTrack(screenSharePublication || videoPublication);
    const isVideoSwitchedOff = useIsTrackSwitchedOff(videoTrack);

    const isVideoEnabled = Boolean(videoTrack);
    const classNames = classnames('main-participant-info', {
        'main-participant-info--fullwidth': fullWidth
    });

    return (
        <div
            className={classNames}
            data-cy-main-participant
            data-cy-participant={participant.identity}
        >
            <div className="main-participant-info__identity-container">
                <Label
                    icon={<AudioLevelIndicator audioTrack={audioTrack} />}
                    content={<>
                        {participant.name}
                        {local && ' (Вы)'}
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