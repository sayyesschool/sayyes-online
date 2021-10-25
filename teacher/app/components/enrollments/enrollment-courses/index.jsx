import { useCallback } from 'react';
import {
    Card
} from 'mdc-react';

import LoadingIndicator from 'shared/components/loading-indicator';
import MenuButton from 'shared/components/menu-button';
import CoursesList from 'shared/components/courses-list';

import { useStore, useActions } from 'app/hooks/store';

export default function EnrollmentCourses({ enrollment }) {
    const [courses] = useStore('courses.list');
    const enrollmentActions = useActions('enrollments');

    const handleAddCourse = useCallback(courseId => {
        const courses = enrollment.courses.concat(courseId);

        enrollmentActions.updateEnrollment(enrollment.id, { courses });
    }, [enrollment]);

    const handleRemoveCourse = useCallback(courseId => {
        const courses = enrollment.courses.filter(id => id !== courseId);

        enrollmentActions.updateEnrollment(enrollment.id, { courses });
    }, [enrollment]);

    if (!courses) return <LoadingIndicator />;

    const enrollmentCourses = courses
        .filter(course => enrollment.courses.includes(course.id));

    const items = courses
        .filter(course => !enrollment.courses.includes(course.id))
        .map(course => ({
            key: course.id,
            leadingThumbnail: <img src={course.imageUrl} />,
            text: course.title,
            onClick: () => handleAddCourse(course.id)
        }));

    return (
        <section className="enrollment-courses">
            <Card>
                <Card.Header
                    title="Курсы"
                    actions={
                        <MenuButton
                            icon="add"
                            items={items}
                        />
                    }
                />

                {enrollmentCourses.length > 0 &&
                    <Card.Section>
                        <CoursesList
                            courses={enrollmentCourses}
                            onRemove={handleRemoveCourse}
                        />
                    </Card.Section>
                }
            </Card>
        </section>
    );
}