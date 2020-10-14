import React from 'react';
import {
    Card,
    Typography
} from 'mdc-react';

import LessonList from 'app/components/courses/lesson-list';

export default function UnitDetails({ unit, onDeleteLesson }) {
    return (
        <section className="unit-details">
            <Card>
                <Card.Header
                    title={unit.title}
                    subtitle={unit.slug}
                />

                {unit.imageUrl &&
                    <Card.Media
                        imageUrl={unit.imageUrl}
                        wide
                    />
                }

                {unit.lessons.length > 0 &&
                    <Card.Section>
                        <Typography variant="subtitle2" noMargin>Уроки</Typography>

                        <LessonList
                            lessons={unit.lessons}
                            onDelete={onDeleteLesson}
                        />
                    </Card.Section>
                }
            </Card>
        </section>
    );
}