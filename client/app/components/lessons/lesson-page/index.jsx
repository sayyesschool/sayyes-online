import React, { useRef, useState, useEffect } from 'react';
import {
    LayoutGrid, LayoutGridCell
} from 'mdc-react';

import { useSelector } from 'shared/hooks/store';
import { useRoom } from 'shared/hooks/twilio';

import LoadingIndicator from 'shared/components/loading-indicator';
import Chat from 'shared/components/chat';
import Room from 'shared/components/room';
import VideoPreviewDialog from 'shared/components/video-preview-dialog';
import PDFViewer from 'shared/components/pdf-viewer';

export default function LessonPage({ match }) {
    const user = useSelector(state => state.account);
    const localMediaRef = useRef();
    const remoteMediaRef = useRef();
    const [token, setToken] = useState();
    const [lesson, setLesson] = useState();
    const [isPreviewOpen, setPreviewOpen] = useState(true);
    const { room } = useRoom(token, {
        name: lesson?.id,
        audio: true,
        video: {
            width: 640
        },
        data: true,
        localMediaRef,
        remoteMediaRef
    });

    useEffect(() => {
        if (!lesson) {
            fetch(`/api/lessons/${match.params.lessonId}`)
                .then(res => res.json())
                .then(res => setLesson(res.data));
        } else if (lesson && !isPreviewOpen) {
            fetch(`/api/twilio/tokens/video?identity=${user.id}&room=${lesson.id}`)
                .then(res => res.json())
                .then(res => setToken(res.data.token));
        }
    }, [lesson, isPreviewOpen]);

    if (!lesson) return <LoadingIndicator />;

    if (isPreviewOpen) return (
        <VideoPreviewDialog
            appear
            open={isPreviewOpen}
            onClose={() => setPreviewOpen(false)}
        />
    );

    return (
        <main id="lesson-page" className="page">
            <LayoutGrid>
                <LayoutGridCell span="8">
                    <PDFViewer
                        file="/ts1-u2.pdf"
                    />
                </LayoutGridCell>

                <LayoutGridCell span="4">
                    <Room
                        video={true}
                        audio={true}
                        data={true}
                        localMediaRef={localMediaRef}
                        remoteMediaRef={remoteMediaRef}
                    />

                    {/* <Chat
                        user={user}
                        lesson={lesson}
                    /> */}
                </LayoutGridCell>
            </LayoutGrid>
        </main>
    );
}