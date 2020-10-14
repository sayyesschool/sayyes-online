import React, { useState } from 'react';
import { Dialog } from 'mdc-react';

import VideoPlayer from 'shared/components/video-player';
import VideoList from 'shared/components/video-list';

import './index.scss';

export default function UnitVideo({ course, unit }) {
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
                appear
                title={selectedVideo?.title}
                onClose={() => setSelectedVideo(null)}
            >
                {selectedVideo &&
                    <VideoPlayer
                        id="video-player"
                        src={`https://static.sayes.ru/courses/${course.slug}/videos/${selectedVideo.filename}`}
                        width="100%"
                        controls
                        autoPlay
                    />
                }
            </Dialog>
        </div>
    );
}