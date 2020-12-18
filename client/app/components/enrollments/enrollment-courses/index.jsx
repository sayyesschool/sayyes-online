import React from 'react';
import { Link } from 'react-router-dom';
import {
    Card,
    List
} from 'mdc-react';

export default function EnrollmentCourses({ enrollment }) {
    return (
        <div className="enrollment-courses">
            <Card outlined>
                <Card.Header
                    title="Курсы"
                    subtitle={(!enrollment.courses || enrollment.courses.length === 0) && 'Курсов пока нет'}
                />

                {enrollment.courses &&
                    <Card.Section>
                        <List twoLine imageList>
                            {enrollment.courses?.map(course =>
                                <List.Item
                                    key={course.id}
                                    component={Link}
                                    to={`${enrollment.url}${course.url}`}
                                    graphic={<img src={course.imageUrl} />}
                                    primaryText={course.title}
                                    secondaryText={`${course.units.length} юнитов`}
                                />
                            )}
                        </List>
                    </Card.Section>
                }
            </Card>
        </div>
    );
}