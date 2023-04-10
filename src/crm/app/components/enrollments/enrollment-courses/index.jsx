import { useCallback } from 'react';

import CoursesList from 'shared/components/courses-list';
import PageSection from 'shared/components/page-section';
import { IconButton, MenuButton } from 'shared/ui-components';

import { useStore, useActions } from 'app/store';

export default function EnrollmentCourses({ enrollment }) {
    const [courses] = useStore('courses.list');
    const actions = useActions('enrollments');

    const handleAddCourse = useCallback((item) => {
        const courses = enrollment.courses.concat(item.value);

        return actions.updateEnrollment(enrollment.id, { courses });
    }, [enrollment]);

    const handleRemoveCourse = useCallback(courseId => {
        const courses = enrollment.courses.filter(id => id !== courseId);

        return actions.updateEnrollment(enrollment.id, { courses });
    }, [enrollment]);

    const enrollmentCourses = courses
        .filter(course => enrollment.courses.includes(course.id))
        .map(course => ({
            ...course,
            uri: course.uri + `?enrollmentId=${enrollment.id}`
        }));

    const items = courses
        .filter(course => !enrollment.courses.includes(course.id))
        .map(course => ({
            key: course.id,
            value: course.id,
            content: course.title
        }));

    return (
        <PageSection
            className="EnrollmentCourses"
            title="Курсы"
            actions={
                <MenuButton
                    trigger={
                        <IconButton
                            icon="add"
                            color="neutral"
                            size="sm"
                            variant="plain"
                        />
                    }
                    align="end"
                    items={items}
                    onMenuItemClick={handleAddCourse}
                />
            }
            compact
        >
            {enrollmentCourses.length > 0 &&
                <CoursesList
                    courses={enrollmentCourses}
                    onDelete={handleRemoveCourse}
                />
            }
        </PageSection>
    );
}