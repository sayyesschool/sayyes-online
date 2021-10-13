import React from 'react';
import {
    Card,
    IconButton
} from 'mdc-react';

import VideoList from 'shared/components/video-list';

export default function CourseAudio({ course }) {
    return (
        <section className="course-video">
            <Card>
                <Card.Header
                    title="Видео"
                    actions={
                        <IconButton
                            icon="add"
                        />
                    }
                />

                <Card.Section>
                    <VideoList
                        videos={course.videos}
                    />
                </Card.Section>
            </Card>
        </section>
    );
}