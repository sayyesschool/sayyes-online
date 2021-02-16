import React from 'react';
import { Link } from 'react-router-dom';
import {
    Avatar,
    Card,
    LayoutGrid
} from 'mdc-react';

import './index.scss';

export default function CourseContent({ enrollment, course }) {
    return (
        <section className="course-content">
            <LayoutGrid>
                {course.units.map((unit, index) =>
                    <LayoutGrid.Cell span="4">
                        <Card
                            component={Link}
                            to={enrollment.url + unit.uri}
                            outlined
                        >
                            <Card.Media
                                imageUrl={`https://static.sayes.ru/courses/${course.slug}/images/${unit.image}`}
                                wide
                            />

                            <Card.Header
                                graphic={<Avatar text={index} />}
                                title={unit.title}
                                subtitle={unit.lessons && `${unit.lessons?.length} уроков`}
                            />
                        </Card>
                    </LayoutGrid.Cell>
                )}
            </LayoutGrid>
        </section>
    );
}