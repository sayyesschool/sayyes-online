import { Avatar, Label, Text } from '@fluentui/react-northstar';

import Icon from 'shared/components/icon';

import useRoomContext from 'app/hooks/useRoomContext';
import VideoTrack from 'app/components/VideoTrack';
import LocalAudioLevelIndicator from 'app/components/LocalAudioLevelIndicator';

export default function LocalVideoPreview({ identity }) {
    const { localTracks } = useRoomContext();

    const videoTrack = localTracks.find(track => track.name.includes('camera'));

    return (
        <div className="local-video-preview">
            <div className="local-video-preview__inner-container">
                {videoTrack ?
                    <VideoTrack track={videoTrack} isLocal />
                    :
                    <div className="local-video-preview__avatar-container">
                        <Avatar name={identity} />
                    </div>
                }
            </div>

            <div className="local-video-preview__identity-container">
                <Label className="local-video-preview__identity"
                    icon={<LocalAudioLevelIndicator />}
                    content={identity}
                    color="white"
                />
            </div>
        </div>
    );
}