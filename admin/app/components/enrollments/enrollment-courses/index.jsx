import React, { useCallback } from 'react';
import {
    Card,
    Icon,
    IconButton,
    List
} from 'mdc-react';

import MenuButton from 'shared/components/menu-button';

import { useStore, useActions } from 'app/hooks/store';

export default function EnrollmentCourses({ enrollment }) {
    const [courses] = useStore('courses.list');
    const actions = useActions('enrollments');

    const handleAddCourse = useCallback(courseId => {
        const courses = enrollment.courses.concat(courseId);

        actions.updateEnrollment(enrollment.id, { courses });
    }, [enrollment]);

    const handleRemoveCourse = useCallback(courseId => {
        const courses = enrollment.courses.filter(id => id !== courseId);

        actions.updateEnrollment(enrollment.id, { courses });
    }, [enrollment]);

    const enrollmentCourses = courses
        .filter(course => enrollment.courses.includes(course.id));

    const items = courses
        .filter(course => !enrollment.courses.includes(course.id))
        .map(course => ({
            key: course.id,
            graphic: <img src={course.imageUrl} />,
            text: course.title,
            onClick: () => handleAddCourse(course.id)
        }));

    return (
        <section className="enrollment-courses">
            <Card>
                <Card.Header
                    graphic={<Icon>class</Icon>}
                    title="Курсы"
                    subtitle={enrollmentCourses.length === 0 && 'Курсов нет'}
                    actions={
                        <MenuButton
                            icon="add"
                            items={items}
                        />
                    }
                />

                {enrollmentCourses.length > 0 &&
                    <Card.Section>
                        <List imageList>
                            {enrollmentCourses.map(course =>
                                <List.Item
                                    key={course.id}
                                    graphic={<img src={course.imageUrl} />}
                                    text={course.title}
                                    meta={
                                        <IconButton
                                            icon="remove"
                                            title="Убрать курс"
                                            onClick={() => handleRemoveCourse(course.id)}
                                        />
                                    }
                                />
                            )}
                        </List>
                    </Card.Section>
                }
            </Card>
        </section>
    );
}