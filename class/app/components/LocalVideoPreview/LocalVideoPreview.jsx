import {
    Avatar,
    Icon,
    Typography
} from 'mdc-react';

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
                        <Avatar icon={<Icon>person</Icon>} large />
                    </div>
                }
            </div>

            <div className="local-video-preview__identity-container">
                <span className="local-video-preview__identity">
                    <LocalAudioLevelIndicator />

                    <Typography element="span" type="body1">
                        {identity}
                    </Typography>
                </span>
            </div>
        </div>
    );
}