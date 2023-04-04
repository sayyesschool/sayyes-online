import { Avatar, Text } from 'shared/ui-components';

import useRoomContext from 'app/hooks/useRoomContext';
import VideoTrack from 'app/components/VideoTrack';
import LocalAudioLevelIndicator from 'app/components/LocalAudioLevelIndicator';

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
                    color="white"
                    type="body2"
                />
            </div>
        </div>
    );
}