import classnames from 'classnames';

import { Avatar, Text } from 'shared/ui-components';

import useRoomContext from 'app/hooks/useRoomContext';
import useIsTrackSwitchedOff from 'app/hooks/useIsTrackSwitchedOff';
import useParticipantIsReconnecting from 'app/hooks/useParticipantIsReconnecting';
import usePublications from 'app/hooks/usePublications';
import useTrack from 'app/hooks/useTrack';

import AudioLevelIndicator from 'app/components/AudioLevelIndicator';
import ParticipantTracks from 'app/components/ParticipantTracks';

/* audio is disabled for this participant component because this participant's audio is already being rendered in the <ParticipantList /> component. */

export default function MainParticipant() {
    const {
        localParticipant,
        mainParticipant,
        selectedParticipant,
        screenShareParticipant
    } = useRoomContext();
    const publications = usePublications(mainParticipant);
    const isParticipantReconnecting = useParticipantIsReconnecting(mainParticipant);

    const audioPublication = publications.find(p => p.kind === 'audio');
    const videoPublication = publications.find(p => p.trackName.includes('camera'));
    const screenSharePublication = publications.find(p => p.trackName.includes('screen'));
    const audioTrack = useTrack(audioPublication);
    const videoTrack = useTrack(screenSharePublication || videoPublication);
    const isVideoSwitchedOff = useIsTrackSwitchedOff(videoTrack);

    const isFullWidth = !screenShareParticipant || screenShareParticipant === localParticipant;
    const isLocal = mainParticipant === localParticipant;
    const isVideoEnabled = Boolean(videoTrack);
    const videoPriority = mainParticipant !== localParticipant && (
        mainParticipant === selectedParticipant ||
        mainParticipant === screenShareParticipant
    ) ? 'high' : null;

    const classNames = classnames('MainParticipant', {
        'MainParticipant--fullwidth': isFullWidth
    });

    return (
        <div
            className={classNames}
            data-participant={mainParticipant.identity}
            data-main-participant
        >
            <div className="MainParticipant__identity-container">
                <Text
                    type="body2"
                    startDecorator={
                        <AudioLevelIndicator audioTrack={audioTrack} />
                    }
                    content={<>
                        {mainParticipant.name}
                        {isLocal && ' (Вы)'}
                        {screenSharePublication && ' - Экран'}
                    </>}
                    textColor="common.white"
                />
            </div>

            {(!isVideoEnabled || isVideoSwitchedOff) &&
                <div className="MainParticipant__avatar-container">
                    <Avatar size="lg" />
                </div>
            }

            {isParticipantReconnecting &&
                <div className="MainParticipant__reconnecting-container">
                    <Text>Reconnecting...</Text>
                </div>
            }

            <ParticipantTracks
                participant={mainParticipant}
                local={isLocal}
                screenShareEnabled={mainParticipant !== localParticipant}
                videoPriority={videoPriority}
                videoOnly
            />
        </div>
    );
}