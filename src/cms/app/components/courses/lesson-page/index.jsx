import { useCallback, useState } from 'react';

import { useBoolean } from 'shared/hooks/state';
import { useLesson } from 'shared/hooks/courses';
import { Flex, Grid, Tabs } from 'shared/ui-components';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';

import LessonContent from 'app/components/courses/lesson-content';
import LessonDetails from 'app/components/courses/lesson-details';
import LessonImage from 'app/components/courses/lesson-image';
import LessonExercises from 'app/components/courses/lesson-exercises';

export default function LessonPage({ match, history }) {
    const { course, unit, lesson, actions } = useLesson(match.params);

    const [isConfirmationDialogOpen, toggleConfirmationDialogOpen] = useBoolean(false);

    const handleUpdateLesson = useCallback(data => {
        return actions.updateLesson(course.id, lesson.id, data);
    }, [course, lesson]);

    const handleDeleteLesson = useCallback(() => {
        return actions.deleteLesson(course.id, lesson.id)
            .then(() => history.push(unit.url));
    }, [course, unit, lesson]);

    const handleCreateExercise = useCallback(data => {
        data.unitId = unit.id;
        data.lessonId = lesson.id;

        return actions.createExercise(course.id, data);
    }, [course, unit, lesson]);

    const handleDeleteExercise = useCallback(exercise => {
        return actions.deleteExercise(course.id, exercise.id);
    }, [course]);

    if (!lesson) return <LoadingIndicator />;

    return (
        <Page className="LessonPage">
            <Page.Header
                title={lesson.title}
                breadcrumbs={[
                    { key: 'courses', content: 'Курсы', to: '/courses' },
                    { key: 'course', content: course.title, to: course.uri, title: 'Курс' },
                    { key: 'unit', content: unit.title, to: unit.uri, title: 'Юнит' }
                ]}
                actions={[
                    {
                        key: 'delete',
                        icon: 'delete',
                        title: 'Удалить урок',
                        onClick: toggleConfirmationDialogOpen
                    }
                ]}
            />

            <Page.Content>
                <Grid spacing={2}>
                    <Grid.Item xs={3}>
                        <Flex gap="medium" column>
                            <LessonDetails
                                lesson={lesson}
                                onUpdate={handleUpdateLesson}
                            />

                            {/* <LessonImage
                                lesson={lesson}
                                onUpdate={handleUpdateLesson}
                            /> */}
                        </Flex>
                    </Grid.Item>

                    <Grid.Item xs={6}>
                        <LessonContent
                            lesson={lesson}
                            onUpdate={handleUpdateLesson}
                        />
                    </Grid.Item>

                    <Grid.Item xs={3}>
                        <LessonExercises
                            course={course}
                            lesson={lesson}
                            onCreate={handleCreateExercise}
                            onDelete={handleDeleteExercise}
                            onReorder={handleUpdateLesson}
                        />
                    </Grid.Item>
                </Grid>
            </Page.Content>

            <ConfirmationDialog
                title="Удалить урок?"
                message={`Урок "${lesson.title}" будет удален без возможности восстановления.`}
                open={isConfirmationDialogOpen}
                onConfirm={handleDeleteLesson}
                onClose={toggleConfirmationDialogOpen}
            />
        </Page>
    );
}