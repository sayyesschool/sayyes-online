import React from 'react';
import { Link } from 'react-router-dom';
import {
    Card,
    LayoutGrid,
    Typography
} from 'mdc-react';

export default function EnrollmentCourses({ enrollment }) {
    return (
        <div className="enrollment-courses">
            {enrollment.courses?.length > 0 ?
                <LayoutGrid>
                    {enrollment.courses.map(course =>
                        <LayoutGrid.Cell key={course.id} span="12">
                            <Card component={Link} to={`${enrollment.url}${course.uri}`}>
                                <Card.Media imageUrl={course.imageUrl} wide />

                                <Card.Header
                                    title={course.title}
                                    subtitle={course.subtitle}
                                />
                            </Card>
                        </LayoutGrid.Cell>
                    )}
                </LayoutGrid>
                :
                <Typography>Курсы пока не назначены</Typography>
            }
        </div>
    );
}