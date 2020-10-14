import React from 'react';
import {
    Card
} from 'mdc-react';

export default function CourseCard({ course, ...props }) {
    return (
        <Card outlined {...props}>
            <Card.Media imageUrl={course.imageUrl} wide />

            <Card.Header
                title={course.title}
                subtitle={`${course.units.length} юнитов`}
            />
        </Card>
    );
}