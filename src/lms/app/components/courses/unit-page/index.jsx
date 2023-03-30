import { useCallback } from 'react';

import { useBoolean } from 'shared/hooks/state';
import { use } from 'shared/hooks/courses';
import { Flex, Grid } from 'shared/ui-components';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';

import UnitContent from 'app/components/courses/unit-content';
import UnitDetails from 'app/components/courses/unit-details';
import UnitImage from 'app/components/courses/unit-image';
import UnitLessons from 'app/components/courses/unit-lessons';

export default function UnitPage({ match, history }) {
    const { course, unit, actions } = use(match.params);

    const [isConfirmationDialogOpen, toggleConfirmationDialogOpen] = useBoolean(false);

    const handleUpdateUnit = useCallback(data => {
        return actions.updateUnit(course.id, unit.id, data);
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

    if (!unit) return <LoadingIndicator />;

    return (
        <Page id="unit-page">
            <Page.Header
                title={unit.title}
                breadcrumbs={[
                    { key: 'courses', content: 'Курсы', to: '/courses' },
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
                    <Grid.Item xs={3}>
                        <Flex gap="medium" column>
                            <UnitDetails
                                unit={unit}
                                onUpdate={handleUpdateUnit}
                            />

                            {/* <UnitImage
                                unit={unit}
                                onUpdate={handleUpdateUnit}
                            /> */}
                        </Flex>
                    </Grid.Item>

                    <Grid.Item xs={6}>
                        <UnitContent
                            unit={unit}
                            onUpdate={handleUpdateUnit}
                        />
                    </Grid.Item>

                    <Grid.Item xs={3}>
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