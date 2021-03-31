import React, { useCallback } from 'react';
import {
    Card,
    IconButton,
    List
} from 'mdc-react';

import MenuButton from 'shared/components/menu-button';

import { useStore, useActions } from 'app/hooks/store';

export default function EnrollmentCourses({ enrollment }) {
    const [courses] = useStore('courses.list');
    const actions = useActions('enrollments');

    const handleAddCourse = useCallback(courseId => {
        const courses = enrollment.courses.map(course => course.id).concat(courseId);

        actions.updateEnrollment(enrollment.id, { courses });
    }, [enrollment]);

    const handleRemoveCourse = useCallback(courseId => {
        const courses = enrollment.courses.map(course => course.id).filter(id => id !== courseId);

        actions.updateEnrollment(enrollment.id, { courses });
    }, [enrollment]);

    const courseIds = enrollment.courses.map(course => course.id);
    const items = courses
        .filter(course => !courseIds.includes(course.id))
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
                    title="Курсы"
                    subtitle={enrollment.courses.length === 0 && 'Курсов нет'}
                    actions={
                        <MenuButton
                            icon="add"
                            items={items}
                        />
                    }
                />

                {enrollment.courses.length > 0 &&
                    <Card.Section>
                        <List imageList>
                            {enrollment.courses
                                .map(course => typeof course === 'string' ? courses.find(course) : course)
                                .map(course =>
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