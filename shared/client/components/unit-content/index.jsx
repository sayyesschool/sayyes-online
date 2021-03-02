import React from 'react';
import { Link } from 'react-router-dom';
import {
    Avatar,
    Card,
    List
} from 'mdc-react';

import './index.scss';

export default function UnitContent({ enrollmentId, course, unit, onSelectLesson }) {
    const lessons = unit.lessons.map(id => course.lessonsById.get(id));

    return (
        <section className="unit-content">
            {unit.document ?
                <Card>
                    <iframe
                        src={unit.documentUrl}
                    />
                </Card>
                :
                <Card>
                    <Card.Header
                        title={unit.title}
                    />

                    <Card.Media
                        imageUrl={`https://static.sayes.ru/courses/${course.slug}/images/${unit.image}`}
                    />

                    <Card.Section primary>
                        {unit.description}
                    </Card.Section>

                    <Card.Section>
                        <List avatarList twoLine>
                            {lessons.map((lesson, index) =>
                                <List.Item
                                    key={lesson.id}
                                    component={!onSelectLesson ? Link : undefined}
                                    to={!onSelectLesson ? `/${enrollmentId}${lesson.uri}` : undefined}
                                    graphic={<Avatar text={index + 1} />}
                                    primaryText={lesson.title}
                                    secondaryText={`${lesson.exercises.length} уроков`}
                                    onClick={onSelectLesson && (() => onSelectLesson(unit, lesson))}
                                />
                            )}
                        </List>
                    </Card.Section>
                </Card>
            }
        </section>
    );
}