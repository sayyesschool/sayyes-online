import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Dialog } from 'mdc-react';

import VideoList from 'app/components/shared/video-list';

export default function UnitVideo({ course, unit }) {
    const [selectedVideo, setSelectedVideo] = useState();

    return (
        <div className="lesson-video">
            <VideoList
                videos={unit.videos}
                selectedVideo={selectedVideo}
                onClick={setSelectedVideo}
            />

            <Dialog
                open={!!selectedVideo}
                title={selectedVideo?.title}
                onClose={() => setSelectedVideo(null)}
            >
                {selectedVideo &&
                    <video src={`https://static.sayes.ru/courses/${course.slug}/videos/${selectedVideo.filename}`} autoPlay controls />
                }
            </Dialog>
        </div>
    );
}