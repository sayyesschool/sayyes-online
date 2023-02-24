import { useCallback } from 'react';

import { Button, MenuButton, Spinner } from 'shared/ui-components';
import CoursesList from 'shared/components/courses-list';
import PageSection from 'shared/components/page-section';

import { useStore, useActions } from 'app/hooks/store';

export default function EnrollmentCourses({ enrollment }) {
    const [courses] = useStore('courses.list');
    const enrollmentActions = useActions('enrollments');

    const handleAddCourse = useCallback(courseId => {
        const courses = enrollment.courses.concat(courseId);

        return enrollmentActions.updateEnrollment(enrollment.id, { courses });
    }, [enrollment]);

    const handleRemoveCourse = useCallback(courseId => {
        const courses = enrollment.courses.filter(id => id !== courseId);

        return enrollmentActions.updateEnrollment(enrollment.id, { courses });
    }, [enrollment]);

    const enrollmentCourses = courses
        ?.filter(course => enrollment.courses.includes(course.id));

    const items = courses
        ?.filter(course => !enrollment.courses.includes(course.id))
        .map(course => ({
            key: course.id,
            media: <img src={course.imageUrl} />,
            content: course.title,
            onClick: () => handleAddCourse(course.id)
        }));

    return (
        <PageSection
            className="enrollment-courses"
            title="Курсы"
            actions={courses ?
                <MenuButton
                    trigger={
                        <Button
                            icon="add"
                            title="Добавить курс"
                            text
                        />
                    }
                    menu={items}
                />
                :
                <Spinner size="small" />
            }
            compact
        >
            {enrollmentCourses?.length > 0 &&
                <CoursesList
                    enrollment={enrollment}
                    courses={enrollmentCourses}
                    onRemove={handleRemoveCourse}
                />
            }
        </PageSection>
    );
}