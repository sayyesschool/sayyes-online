import { Avatar, Label, Text } from '@fluentui/react-northstar';
import classnames from 'classnames';

import Icon from 'shared/components/icon';

import useIsTrackSwitchedOff from 'app/hooks/useIsTrackSwitchedOff';
import usePublications from 'app/hooks/usePublications';
import useTrack from 'app/hooks/useTrack';
import useParticipantIsReconnecting from 'app/hooks/useParticipantIsReconnecting';
import AudioLevelIndicator from 'app/components/AudioLevelIndicator';
import NetworkQualityLevel from 'app/components/NetworkQualityLevel';

export default function ParticipantInfo({
    participant,
    onClick,
    isSelected,
    children,
    isLocalParticipant,
    hideParticipant
}) {
    const publications = usePublications(participant);

    const audioPublication = publications.find(p => p.kind === 'audio');
    const videoPublication = publications.find(p => p.trackName.includes('camera'));

    const isVideoEnabled = Boolean(videoPublication);
    const isScreenShareEnabled = publications.find(p => p.trackName.includes('screen'));

    const videoTrack = useTrack(videoPublication);
    const isVideoSwitchedOff = useIsTrackSwitchedOff(videoTrack);

    const audioTrack = useTrack(audioPublication);
    const isParticipantReconnecting = useParticipantIsReconnecting(participant);

    return (
        <div
            className={classnames('participant-info', {
                'participant-info--hide-participant': hideParticipant,
                'participant-info--cursor-pointer': Boolean(onClick),
            })}
            onClick={onClick}
        >
            <div className="participant-info__info-container">
                <div className="participant-info__network-quality-container">
                    <NetworkQualityLevel participant={participant} />
                </div>

                <div className="participant-info__info-row-bottom">
                    {isScreenShareEnabled &&
                        <span className="participant-info__screen-share-icon-container">
                            <Icon>screen_share</Icon>
                        </span>
                    }

                    <Label
                        className="participant-info__identity"
                        icon={<AudioLevelIndicator audioTrack={audioTrack} />}
                        content={<>
                            {participant.name}
                            {isLocalParticipant && ' (Вы)'}
                        </>}
                        color="white"
                    />
                </div>

                {isSelected &&
                    <div className="participant-info__pin-icon-container">
                        <Icon>push_pin</Icon>
                    </div>
                }
            </div>

            <div className="participant-info__inner-container">
                {(!isVideoEnabled || isVideoSwitchedOff) && (
                    <div className="participant-info__avatar-container">
                        <Avatar name={participant.name} />
                    </div>
                )}

                {isParticipantReconnecting && (
                    <div className="participant-info__reconnecting-container">
                        <Text variant="body1">Reconnecting...</Text>
                    </div>
                )}

                {children}
            </div>
        </div>
    );
}