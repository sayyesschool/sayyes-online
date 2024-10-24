import { Avatar, Text } from 'shared/ui-components';

import LocalAudioLevelIndicator from 'class/components/LocalAudioLevelIndicator';
import VideoTrack from 'class/components/VideoTrack';
import useRoomContext from 'class/hooks/useRoomContext';

export default function LocalVideoPreview({ identity }) {
    const { localTracks } = useRoomContext();

    const videoTrack = localTracks.find(track => track.name.includes('camera'));

    return (
        <div className="LocalVideoPreview">
            <div className="LocalVideoPreview__inner-container">
                {videoTrack ?
                    <VideoTrack track={videoTrack} local />
                    :
                    <div className="LocalVideoPreview__avatar-container">
                        <Avatar size="lg" />
                    </div>
                }
            </div>

            <div className="LocalVideoPreview__identity-container">
                <Text
                    as="div"
                    startDecorator={<LocalAudioLevelIndicator />}
                    content={identity}
                    textColor="common.white"
                    type="body2"
                />
            </div>
        </div>
    );
}