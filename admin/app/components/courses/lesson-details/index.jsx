import React from 'react';
import {
    Card,
    Icon,
    IconButton
} from 'mdc-react';

import LessonForm from 'app/components/courses/lesson-form';

import './index.scss';

export default function LessonDetails({
    course,
    lesson,

    onUpdate
}) {
    return (
        <section className="lesson-details">
            <Card>
                <Card.Header
                    graphic={<Icon>article</Icon>}
                    title="Детали"
                    actions={
                        <IconButton
                            icon="save"
                            type="submit"
                            form="lesson-form"
                        />
                    }
                />

                <Card.Section primary>
                    <LessonForm
                        course={course}
                        lesson={lesson}
                        onSubmit={onUpdate}
                    />
                </Card.Section>
            </Card>
        </section>
    );
}