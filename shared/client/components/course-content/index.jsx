import React from 'react';
import { Link } from 'react-router-dom';
import {
    Avatar,
    Card,
    LayoutGrid
} from 'mdc-react';

import './index.scss';

export default function CourseContent({ enrollmentId, course, onSelectUnit }) {
    return (
        <section className="course-content">
            <LayoutGrid>
                {course.units.map((unit, index) =>
                    <LayoutGrid.Cell key={unit.id} span="4">
                        <Card
                            component={!onSelectUnit ? Link : undefined}
                            to={!onSelectUnit ? `/${enrollmentId}${unit.uri}` : undefined}
                            outlined
                            onClick={onSelectUnit && (() => onSelectUnit(unit))}
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
        </section >
    );
}