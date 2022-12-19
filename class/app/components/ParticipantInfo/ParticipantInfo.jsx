import classnames from 'classnames';

import { Avatar, Icon, Label, Text } from 'shared/ui-components';

import useIsTrackSwitchedOff from 'app/hooks/useIsTrackSwitchedOff';
import useParticipantIsReconnecting from 'app/hooks/useParticipantIsReconnecting';
import usePublications from 'app/hooks/usePublications';
import useTrack from 'app/hooks/useTrack';
import AudioLevelIndicator from 'app/components/AudioLevelIndicator';
import NetworkQualityLevel from 'app/components/NetworkQualityLevel';

export default function ParticipantInfo({
    participant,
    local,
    hidden,
    selected,
    children,
    onClick
}) {
    const publications = usePublications(participant);
    const isParticipantReconnecting = useParticipantIsReconnecting(participant);

    const audioPublication = publications.find(p => p.kind === 'audio');
    const videoPublication = publications.find(p => p.trackName.includes('camera'));
    const screenSharePublication = publications.find(p => p.trackName.includes('screen'));

    const audioTrack = useTrack(audioPublication);
    const videoTrack = useTrack(videoPublication);

    console.log(publications);

    const isVideoSwitchedOff = useIsTrackSwitchedOff(videoTrack);
    const isVideoEnabled = Boolean(videoPublication);
    const isScreenShareEnabled = Boolean(screenSharePublication);

    const classNames = classnames('participant-info', {
        'participant-info--hidden': hidden,
        'participant-info--cursor-pointer': Boolean(onClick)
    });

    return (
        <div
            className={classNames}
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
                            {local && ' (Вы)'}
                        </>}
                        color="white"
                    />
                </div>

                {selected &&
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
                        <Text>Reconnecting...</Text>
                    </div>
                )}

                {children}
            </div>
        </div>
    );
}