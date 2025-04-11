import { useCallback } from 'react';

import CoursesList from 'shared/components/courses-list';
import PageSection from 'shared/components/page-section';
import { IconButton, Menu } from 'shared/ui-components';

import { useActions, useStore } from 'crm/store';

export default function EnrollmentCourses({ enrollment }) {
    const [courses = []] = useStore('courses.list');
    const actions = useActions('enrollments');

    const handleAddCourse = useCallback((event, { value }) => {
        if (!value) return;

        return actions.updateEnrollment(enrollment.id, {
            courseIds: enrollment.courseIds.concat(value)
        });
    }, [enrollment, actions]);

    const handleRemoveCourse = useCallback(courseId => {
        return actions.updateEnrollment(enrollment.id, {
            courseIds: enrollment.courseIds.filter(id => id !== courseId)
        });
    }, [enrollment, actions]);

    const enrollmentCourses = courses
        .filter(course => enrollment.courseIds.includes(course.id));

    const items = courses
        .filter(course => !enrollment.courseIds.includes(course.id))
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
                <Menu
                    trigger={
                        <IconButton
                            icon="add"
                            size="sm"
                        />
                    }
                    items={items}
                    onItemClick={handleAddCourse}
                />
            }
            compact
        >
            {enrollmentCourses.length > 0 &&
                <CoursesList
                    courses={enrollmentCourses}
                    onRemove={handleRemoveCourse}
                />
            }
        </PageSection>
    );
}