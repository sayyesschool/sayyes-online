import React from 'react';
import { Link } from 'react-router-dom';
import {
    Avatar,
    Card,
    List
} from 'mdc-react';

import './index.scss';

export default function UnitContent({ course, unit, onSelectLesson }) {
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
                    {unit.imageUrl &&
                        <Card.Media
                            imageUrl={unit.imageUrl}
                            wide
                        />
                    }

                    <Card.Header
                        title={unit.title}
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
                                    to={!onSelectLesson ? lesson.uri : undefined}
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