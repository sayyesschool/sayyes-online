import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    Avatar,
    Card,
    LayoutGrid,
    Typography
} from 'mdc-react';

import './index.scss';

export default function CourseContent({ course }) {
    return (
        <section className="course-content">
            <Typography type="headline6">Юниты</Typography>

            <LayoutGrid>
                {course.units.map((unit, index) =>
                    <LayoutGrid.Cell span="4">
                        <Card
                            component={NavLink}
                            to={`${course.url}/unit/${unit.id}`}
                            outlined
                        >
                            <Card.Media
                                imageUrl={`https://static.sayes.ru/courses/${course.slug}/images/${unit.image}`}
                                wide
                            />

                            <Card.Header
                                graphic={<Avatar text={index} />}
                                title={unit.title}
                                subtitle={`${unit.lessons?.length} юнитов`}
                            />
                        </Card>
                    </LayoutGrid.Cell>
                )}
            </LayoutGrid>
        </section>
    );
}