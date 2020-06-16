import React, { useState, useEffect } from 'react';
import {
    Spinner
} from 'mdc-react';

import Room from 'app/components/lessons/room';

export default function LessonPage({ match }) {
    const [lesson, setLesson] = useState();

    useEffect(() => {
        if (!lesson) {
            fetch(`/api/lessons/${match.params.lessonId}`)
                .then(res => res.json())
                .then(res => setLesson(res.data));
        }
    }, []);

    if (!lesson) return <Spinner />;

    return (
        <main id="lesson-page" className="page">
            <Room name={lesson.id} audio video={{ width: 720 }} />
        </main>
    );
}