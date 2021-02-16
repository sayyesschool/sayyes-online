import React from 'react';
import { Link } from 'react-router-dom';
import {
    Avatar,
    Card,
    LayoutGrid,
    List
} from 'mdc-react';

import './index.scss';

export default function UnitContent({ course, unit }) {
    return (
        <section className="unit-content">
            {unit.document ?
                <Card>
                    <iframe
                        src={unit.documentUrl}
                    />
                </Card>
                :
                <LayoutGrid>
                    <LayoutGrid.Cell span="6">
                        <Card outlined>
                            <Card.Header title="Содержание" />

                            <Card.Media
                                imageUrl={`https://static.sayes.ru/courses/${course.slug}/images/${unit.image}`}
                            />

                            <Card.Section primary>
                                {unit.description}
                            </Card.Section>
                        </Card>
                    </LayoutGrid.Cell>

                    <LayoutGrid.Cell span="6">
                        <Card outlined>
                            <Card.Header title="Уроки" />

                            <List avatarList twoLine>
                                {unit.lessons.map((lesson, index) =>
                                    <List.Item
                                        component={Link}
                                        to={`${unit.url}/lesson/${lesson.id}`}
                                        graphic={<Avatar text={index + 1} />}
                                        primaryText={lesson.title}
                                        secondaryText={`${lesson.exercises.length} уроков`}
                                    />
                                )}
                            </List>
                        </Card>
                    </LayoutGrid.Cell>
                </LayoutGrid>
            }
        </section>
    );
}