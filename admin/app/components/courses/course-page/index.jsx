import { useCallback } from 'react';

import { useBoolean } from 'shared/hooks/state';
import { useCourse } from 'shared/hooks/courses';
import { Flex, Grid } from 'shared/ui-components';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';

import CourseDetails from 'app/components/courses/course-details';
import CourseImage from 'app/components/courses/course-image';
import CourseUnits from 'app/components/courses/course-units';

import './index.scss';

export default function CoursePage({ match, history }) {
    const [course, actions] = useCourse(match.params.courseId);

    const [isConfirmationDialogOpen, toggleConfirmationDialogOpen] = useBoolean(false);

    const handleUpdateCourse = useCallback(data => {
        return actions.updateCourse(course.id, data);
    }, [course]);

    const handleDeleteCourse = useCallback(() => {
        return actions.deleteCourse(course.id)
            .then(() => history.push('/courses'));
    }, [course]);

    const handleCreateUnit = useCallback(data => {
        return actions.createUnit(course.id, data);
    }, [course]);

    const handleDeleteUnit = useCallback(unit => {
        return actions.deleteUnit(course.id, unit.id);
    }, [course]);

    if (!course) return <LoadingIndicator />;

    return (
        <Page id="course-page">
            <Page.Header
                title={course.title}
                breadcrumbs={[
                    { key: 'courses', text: 'Курсы', url: '/courses' }
                ]}
                toolbar={[
                    {
                        key: 'delete',
                        icon: 'delete',
                        onClick: toggleConfirmationDialogOpen
                    }
                ]}
            />

            <Page.Content>
                <Grid columns="minmax(0, 2fr) minmax(0, 1fr)">
                    <CourseUnits
                        course={course}
                        onCreate={handleCreateUnit}
                        onDelete={handleDeleteUnit}
                    />

                    <Flex gap="gap.medium" column>
                        <CourseDetails
                            course={course}
                            onUpdate={handleUpdateCourse}
                        />

                        <CourseImage
                            course={course}
                            onUpdate={handleUpdateCourse}
                        />
                    </Flex>
                </Grid>
            </Page.Content>

            <ConfirmationDialog
                title="Удалить курс?"
                message={`Курс "${course.title}" будет удален без возможности восстановления.`}
                open={isConfirmationDialogOpen}
                onConfirm={handleDeleteCourse}
                onClose={toggleConfirmationDialogOpen}
            />
        </Page>
    );
}