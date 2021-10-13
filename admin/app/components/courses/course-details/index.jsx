import React from 'react';
import {
    Card,
    IconButton
} from 'mdc-react';

import CourseForm from 'app/components/courses/course-form';

import './index.scss';

export default function CourseDetails({ course, onUpdate }) {
    return (
        <section className="course-details">
            <Card outlined>
                <Card.Header
                    title="Детали"
                    actions={
                        <IconButton
                            icon="save"
                            type="submit"
                            form="course-form"
                        />
                    }
                />

                <Card.Section primary>
                    <CourseForm
                        course={course}
                        onSubmit={onUpdate}
                    />
                </Card.Section>
            </Card>
        </section>
    );
}