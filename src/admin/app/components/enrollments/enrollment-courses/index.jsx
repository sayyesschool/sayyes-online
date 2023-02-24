import { useCallback } from 'react';

import { Button, Icon, MenuButton } from 'shared/ui-components';
import PageSection from 'shared/components/page-section';

import { useStore, useActions } from 'app/hooks/store';
import CoursesList from 'app/components/courses/courses-list';

export default function EnrollmentCourses({ enrollment }) {
    const [courses] = useStore('courses.list');
    const actions = useActions('enrollments');

    const handleAddCourse = useCallback((event, component) => {
        const courseId = component.value;
        const courses = enrollment.courses.concat(courseId);

        return actions.updateEnrollment(enrollment.id, { courses });
    }, [enrollment]);

    const handleRemoveCourse = useCallback(courseId => {
        const courses = enrollment.courses.filter(id => id !== courseId);

        return actions.updateEnrollment(enrollment.id, { courses });
    }, [enrollment]);

    const enrollmentCourses = courses
        .filter(course => enrollment.courses.includes(course.id));

    const items = courses
        .filter(course => !enrollment.courses.includes(course.id))
        .map(course => ({
            key: course.id,
            value: course.id,
            content: course.title
        }));

    return (
        <PageSection
            className="enrollment-courses"
            title="Курсы"
            actions={
                <MenuButton
                    trigger={
                        <Button
                            icon={<Icon>add</Icon>}
                            text
                            iconOnly
                        />
                    }
                    align="end"
                    menu={items}
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