import { useCallback } from 'react';

import ConfirmationDialog from 'shared/components/confirmation-dialog';
import EditableText from 'shared/components/editable-text';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import { use } from 'shared/hooks/courses';
import { useBoolean } from 'shared/hooks/state';
import { Grid } from 'shared/ui-components';

import UnitDescription from 'cms/components/courses/unit-description';
import UnitLessons from 'cms/components/courses/unit-lessons';

export default function UnitPage({ match, history }) {
    const { course, unit, actions } = use(match.params);

    const [isConfirmationDialogOpen, toggleConfirmationDialogOpen] = useBoolean(false);

    const handleUpdateUnit = useCallback(data => {
        return actions.updateUnit(course.id, unit.id, data);
    }, [course, unit]);

    const handleUpdateUnitTitle = useCallback(title => {
        return actions.updateUnit(course.id, unit.id, { title });
    }, [course, unit]);

    const handleDeleteUnit = useCallback(() => {
        return actions.deleteUnit(course.id, unit.id)
            .then(() => history.push(course.uri));
    }, [course, unit]);

    const handleCreateLesson = useCallback(data => {
        data.unitId = unit.id;

        return actions.createLesson(course.id, data);
    }, [course, unit]);

    const handleDeleteLesson = useCallback(lesson => {
        return actions.deleteLesson(course.id, lesson.id);
    }, [course]);

    if (!unit) return <LoadingIndicator fluid />;

    return (
        <Page className="UnitPage">
            <Page.Header
                title={
                    <EditableText
                        content={unit.title}
                        required
                        onUpdate={handleUpdateUnitTitle}
                    />
                }
                breadcrumbs={[
                    { key: 'course', content: course.title, to: course.uri, title: 'Курс' }
                ]}
                actions={[
                    {
                        key: 'delete',
                        icon: 'delete',
                        title: 'Удалить юнит',
                        onClick: toggleConfirmationDialogOpen
                    }
                ]}
            />

            <Page.Content>
                <Grid spacing={2}>
                    <Grid.Item xs={8}>
                        <UnitDescription
                            unit={unit}
                            onUpdate={handleUpdateUnit}
                        />
                    </Grid.Item>

                    <Grid.Item xs={4}>
                        <UnitLessons
                            course={course}
                            unit={unit}
                            onCreate={handleCreateLesson}
                            onDelete={handleDeleteLesson}
                            onReorder={handleUpdateUnit}
                        />
                    </Grid.Item>
                </Grid>
            </Page.Content>

            <ConfirmationDialog
                title="Удалить юнит?"
                message={`Юнит "${unit.title}" будет удален без возможности восстановления.`}
                open={isConfirmationDialogOpen}
                onConfirm={handleDeleteUnit}
                onClose={toggleConfirmationDialogOpen}
            />
        </Page>
    );
}