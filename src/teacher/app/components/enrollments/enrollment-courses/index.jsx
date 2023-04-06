import { useCallback, useState } from 'react';

import { useBoolean } from 'shared/hooks/state';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import CoursesList from 'shared/components/courses-list';
import PageSection from 'shared/components/page-section';
import { IconButton, MenuButton, Spinner } from 'shared/ui-components';

import { useStore, useActions } from 'app/store/hooks';

export default function EnrollmentCourses({ enrollment }) {
    const [courses] = useStore('courses.list');
    const enrollmentActions = useActions('enrollments');

    const [courseId, setCourseId] = useState();

    const [isConfirmationDialogOpen, toggleConfirmationDialogOpen] = useBoolean(false);

    const handleAddCourse = useCallback(courseId => {
        const courses = enrollment.courses.concat(courseId);

        return enrollmentActions.updateEnrollment(enrollment.id, { courses });
    }, [enrollment]);

    const handleRemoveCourse = useCallback(() => {
        const courses = enrollment.courses.filter(id => id !== courseId);

        return enrollmentActions.updateEnrollment(enrollment.id, { courses })
            .then(() => toggleConfirmationDialogOpen(false));
    }, [enrollment, courseId]);

    const handleRemoveCourseRequest = useCallback(courseId => {
        setCourseId(courseId);
        toggleConfirmationDialogOpen(true);
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
            className="EnrollmentCourses"
            title="Курсы"
            actions={courses ?
                <MenuButton
                    trigger={
                        <IconButton
                            icon="add"
                            title="Добавить курс"
                            size="sm"
                        />
                    }
                    items={items}
                />
                :
                <Spinner size="sm" />
            }
            compact
        >
            {enrollmentCourses?.length > 0 &&
                <CoursesList
                    enrollment={enrollment}
                    courses={enrollmentCourses}
                    onRemove={handleRemoveCourseRequest}
                />
            }

            <ConfirmationDialog
                title="Подтвердите действие"
                message="Вы действительно хотите убрать курс?"
                open={isConfirmationDialogOpen}
                onConfirm={handleRemoveCourse}
                onClose={() => toggleConfirmationDialogOpen(false)}
            />
        </PageSection>
    );
}