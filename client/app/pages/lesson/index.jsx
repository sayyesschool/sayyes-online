import React, { useState, useEffect } from 'react';
import {
    LayoutGrid, LayoutGridCell,
    Spinner
} from 'mdc-react';

import { useSelector } from 'shared/hooks/store';

import Chat from 'shared/components/chat';
import Video from 'shared/components/video';

export default function LessonPage({ match }) {
    const user = useSelector(state => state.account);
    const [lesson, setLesson] = useState();

    useEffect(() => {
        if (!lesson) {
            fetch(`/api/lessons/${match.params.lessonId}`)
                .then(res => res.json())
                .then(res => setLesson(res.data));
        }
    }, []);

    if (!lesson) return <Spinner />;

    const members = {
        [lesson.student.id]: lesson.student.name,
        [lesson.teacher.id]: lesson.teacher.name
    };

    return (
        <main id="lesson-page" className="page">
            <LayoutGrid>
                <LayoutGridCell span="8">
                    Материалы урока
                </LayoutGridCell>

                <LayoutGridCell span="4">
                    <Video
                        token={lesson.videoToken}
                        name={lesson.id}
                        settings={{ width: 720 }}
                    />

                    <Chat
                        token={lesson.chatToken}
                        name={lesson.id}
                        user={user}
                        members={members}
                    />
                </LayoutGridCell>
            </LayoutGrid>
        </main>
    );
}