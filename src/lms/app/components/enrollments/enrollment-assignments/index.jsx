import { useCallback, useState } from 'react';

import { useBoolean } from 'shared/hooks/state';
import { useCourses } from 'shared/hooks/courses';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import CoursesList from 'shared/components/courses-list';
import PageSection from 'shared/components/page-section';
import { IconButton, MenuButton } from 'shared/ui-components';

import { useActions } from 'app/store/hooks';

export default function EnrollmentAssignments({ enrollment, readonly }) {
    const [courses] = useCourses();
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
        ?.filter(course => enrollment.courses.includes(course.id))
        .map(course => {
            return {
                ...course,
                url: course.url + `?enrollmentId=${enrollment.id}`
            };
        });

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
            actions={!readonly &&
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