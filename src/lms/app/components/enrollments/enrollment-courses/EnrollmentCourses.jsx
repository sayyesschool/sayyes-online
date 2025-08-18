import { useCallback, useState } from 'react';

import ConfirmationDialog from 'shared/components/confirmation-dialog';
import CoursesList from 'shared/components/courses-list';
import PageSection from 'shared/components/page-section';
import { useCourses } from 'shared/hooks/courses';
import { useBoolean } from 'shared/hooks/state';
import { IconButton, Menu } from 'shared/ui-components';

import { useActions } from 'lms/store/hooks';

export default function EnrollmentCourses({ enrollment, readonly }) {
    const [courses] = useCourses();
    const enrollmentActions = useActions('enrollments');

    const [courseId, setCourseId] = useState();
    const [isConfirmationDialogOpen, toggleConfirmationDialogOpen] = useBoolean(false);

    const handleAddCourse = useCallback(courseId => {
        const courseIds = enrollment.courseIds.concat(courseId);

        return enrollmentActions.updateEnrollment(enrollment.id, { courseIds });
    }, [enrollment]);

    const handleRemoveCourse = useCallback(() => {
        const courseIds = enrollment.courseIds.filter(id => id !== courseId);

        return enrollmentActions.updateEnrollment(enrollment.id, { courseIds })
            .then(() => toggleConfirmationDialogOpen(false));
    }, [enrollment, courseId]);

    const handleRemoveCourseRequest = useCallback(courseId => {
        setCourseId(courseId);
        toggleConfirmationDialogOpen(true);
    }, [enrollment]);

    const enrollmentCourses = enrollment.courseIds
        .map(id => courses?.find(course => course.id === id))
        .filter(Boolean)
        .map(course => ({
            ...course,
            url: course.url + `?enrollmentId=${enrollment.id}`
        }));

    const items = courses
        ?.filter(course => !enrollment.courseIds.includes(course.id))
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
            actions={!readonly &&
                <Menu
                    trigger={
                        <IconButton
                            icon="add"
                            title="Добавить курс"
                            size="sm"
                            disabled={!items?.length}
                        />
                    }
                    items={items}
                />
            }
            compact
        >
            {enrollmentCourses?.length > 0 &&
                <CoursesList
                    enrollment={enrollment}
                    courses={enrollmentCourses}
                    onRemove={!readonly && handleRemoveCourseRequest}
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