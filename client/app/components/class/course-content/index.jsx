import React, { useCallback, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    Card,
    LayoutGrid,
    Typography
} from 'mdc-react';

import LoadingIndicator from 'shared/components/loading-indicator';

import './index.scss';

export default function CourseContent({ enrollment, course }) {
    if (!course) return <LoadingIndicator />;

    return (
        <div className="course-content">
            <header>
                <Typography variant="headline5" noMargin>{course.title}</Typography>
            </header>

            <section>
                <LayoutGrid>
                    {course.units.map(unit =>
                        <LayoutGrid.Cell span="3">
                            <Card
                                component={NavLink}
                                to={`/class/${enrollment.id}/course/${unit.slug}`}
                            >
                                <Card.Media
                                    imageUrl={`https://static.sayes.ru/courses/${course.slug}/images/${unit.image}`}
                                    wide
                                />

                                <Card.Header
                                    title={unit.title}
                                />
                            </Card>
                        </LayoutGrid.Cell>
                    )}
                </LayoutGrid>
            </section>
        </div>
    );
}