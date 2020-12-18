import React, { useState } from 'react';
import { Dialog } from 'mdc-react';

import VideoPlayer from 'shared/components/video-player';
import VideoList from 'shared/components/video-list';

import './index.scss';

export default function UnitVideo({ unit }) {
    const [selectedVideo, setSelectedVideo] = useState();

    return (
        <div className="unit-video">
            <VideoList
                videos={unit.videos}
                selectedVideo={selectedVideo}
                onClick={setSelectedVideo}
            />

            <Dialog
                className="video-dialog"
                open={!!selectedVideo}
                onClose={() => setSelectedVideo(null)}
            >
                {selectedVideo &&
                    <VideoPlayer
                        id="video-player"
                        title={selectedVideo.title}
                        src={selectedVideo.url}
                        provider="server"
                        width="100%"
                        controls
                        autoPlay
                    />
                }
            </Dialog>
        </div>
    );
}