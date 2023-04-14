import { memo } from 'react';
import classnames from 'classnames';

import { Avatar, Icon, Text } from 'shared/ui-components';

import useIsTrackSwitchedOff from 'app/hooks/useIsTrackSwitchedOff';
import useParticipantIsReconnecting from 'app/hooks/useParticipantIsReconnecting';
import useParticipantNetworkQualityLevel from 'app/hooks/useParticipantNetworkQualityLevel';
import usePublications from 'app/hooks/usePublications';
import useTrack from 'app/hooks/useTrack';

import AudioLevelIndicator from 'app/components/AudioLevelIndicator';
import NetworkQualityIndicator from 'app/components/NetworkQualityIndicator';
import ParticipantTracks from 'app/components/ParticipantTracks';

export default memo(function Participant({
    participant,
    local,
    hidden,
    selected,
    dominantSpeaker,
    videoOnly,
    screenShareEnabled,
    onClick
}) {
    const publications = usePublications(participant);
    const isParticipantReconnecting = useParticipantIsReconnecting(participant);
    const networkQualityLevel = useParticipantNetworkQualityLevel(participant);

    const audioPublication = publications.find(p => p.kind === 'audio');
    const videoPublication = publications.find(p => p.trackName.includes('camera'));
    const screenSharePublication = publications.find(p => p.trackName.includes('screen'));

    const audioTrack = useTrack(audioPublication);
    const videoTrack = useTrack(videoPublication);

    const isVideoSwitchedOff = useIsTrackSwitchedOff(videoTrack);
    const isVideoEnabled = Boolean(videoPublication);
    const isScreenShareEnabled = Boolean(screenSharePublication);

    const classNames = classnames('Participant', {
        'Participant--hidden': hidden,
        'Participant--cursor-pointer': Boolean(onClick)
    });

    return (
        <div
            className={classNames}
            onClick={onClick}
        >
            <div className="Participant__info-container">
                {networkQualityLevel &&
                    <div className="Participant__network-quality-container">
                        <NetworkQualityIndicator
                            networkQualityLevel={networkQualityLevel}
                        />
                    </div>
                }

                <div className="Participant__info-row-bottom">
                    {isScreenShareEnabled &&
                        <span className="Participant__screen-share-icon-container">
                            <Icon>screen_share</Icon>
                        </span>
                    }

                    <div className="Participant__identity-container">
                        <Text
                            type="body2"
                            startDecorator={<AudioLevelIndicator audioTrack={audioTrack} />}
                            content={<>
                                {participant.name}
                                {local && ' (Вы)'}
                            </>}
                            textColor="common.white"
                        />
                    </div>
                </div>

                {selected &&
                    <div className="Participant__pin-icon-container">
                        <Icon>push_pin</Icon>
                    </div>
                }
            </div>

            <div className="Participant__inner-container">
                {(!isVideoEnabled || isVideoSwitchedOff) && (
                    <div className="Participant__avatar-container">
                        <Avatar name={participant.name} />
                    </div>
                )}

                {isParticipantReconnecting && (
                    <div className="Participant__reconnecting-container">
                        <Text>Reconnecting...</Text>
                    </div>
                )}

                <ParticipantTracks
                    participant={participant}
                    local={local}
                    videoOnly={videoOnly}
                    screenShareEnabled={screenShareEnabled}
                />
            </div>
        </div>
    );
});