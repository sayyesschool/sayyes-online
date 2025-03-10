import { useCallback } from 'react';

import ConfirmationDialog from 'shared/components/confirmation-dialog';
import EditableText from 'shared/components/editable-text';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import { useCourse } from 'shared/hooks/courses';
import { useBoolean } from 'shared/hooks/state';
import { Grid, Heading } from 'shared/ui-components';

import CourseDescription from 'cms/components/courses/course-description';
import CourseUnits from 'cms/components/courses/course-units';

export default function CoursePage({ match, history }) {
    const [course, actions] = useCourse(match.params.courseId);

    const [isConfirmationDialogOpen, toggleConfirmationDialogOpen] = useBoolean(false);

    const handleUpdateCourse = useCallback(data => {
        return actions.updateCourse(course.id, data);
    }, [course]);

    const handleUpdateCourseTitle = useCallback(title => {
        return actions.updateCourse(course.id, { title });
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

    if (!course) return <LoadingIndicator fluid />;

    return (
        <Page className="CoursePage">
            <Page.Header
                title={
                    <EditableText
                        as={Heading}
                        type="h2"
                        content={course.title}
                        required
                        onUpdate={handleUpdateCourseTitle}
                    />
                }
                actions={[
                    {
                        key: 'delete',
                        icon: 'delete',
                        onClick: toggleConfirmationDialogOpen
                    }
                ]}
            />

            <Page.Content>
                <Grid spacing={2}>
                    <Grid.Item xs={8}>
                        <CourseDescription
                            course={course}
                            onUpdate={handleUpdateCourse}
                        />
                    </Grid.Item>

                    <Grid.Item xs={4}>
                        <CourseUnits
                            course={course}
                            onCreate={handleCreateUnit}
                            onDelete={handleDeleteUnit}
                        />
                    </Grid.Item>
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