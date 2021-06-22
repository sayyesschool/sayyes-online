import React from 'react';
import {
    Avatar,
    Icon,
    Typography
} from 'mdc-react';
import classnames from 'classnames';

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

                    <span className="participant-info__identity">
                        <AudioLevelIndicator audioTrack={audioTrack} />

                        <Typography element="span" type="body1">
                            {participant.name}

                            {isLocalParticipant && ' (Вы)'}
                        </Typography>
                    </span>
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
                        <Avatar icon={<Icon>person</Icon>} />
                    </div>
                )}

                {isParticipantReconnecting && (
                    <div className="participant-info__reconnecting-container">
                        <Typography variant="body1">Reconnecting...</Typography>
                    </div>
                )}

                {children}
            </div>
        </div>
    );
}