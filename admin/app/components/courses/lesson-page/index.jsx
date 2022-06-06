import { useCallback, useState } from 'react';
import { Box, Grid } from '@fluentui/react-northstar';

import { useBoolean } from 'shared/hooks/state';
import { useLesson } from 'shared/hooks/courses';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import PageHeader from 'shared/components/page-header';
import PageContent from 'shared/components/page-content';
import Tabs from 'shared/components/tabs';

import LessonContent from 'app/components/courses/lesson-content';
import LessonDetails from 'app/components/courses/lesson-details';
import LessonImage from 'app/components/courses/lesson-image';
import LessonExercises from 'app/components/courses/lesson-exercises';

import './index.scss';

export default function LessonPage({ match, history }) {
    const { course, unit, lesson, actions } = useLesson(match.params);

    const [activeTab, setActiveTab] = useState('exercises');
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
        <Page id="lesson-page">
            <PageHeader
                breadcrumbs={[
                    { key: 'courses', text: 'Курсы', url: '/courses' },
                    { key: 'course', text: course.title, url: course.uri },
                    { key: 'unit', text: unit.title, url: unit.uri }
                ]}
                overline="Урок"
                title={lesson.title}
                actions={[
                    {
                        key: 'delete',
                        icon: 'delete',
                        title: 'Удалить урок',
                        onClick: toggleConfirmationDialogOpen
                    }
                ]}
            />

            <PageContent>
                <Tabs
                    items={[
                        {
                            key: 'exercises',
                            value: 'exercises',
                            content: 'Упражнения',
                            icon: 'format_list_bulleted'
                        },
                        {
                            key: 'content',
                            value: 'content',
                            content: 'Содержание',
                            icon: 'description'
                        }
                    ]}
                    onChange={setActiveTab}
                />

                <Grid columns="minmax(0, 2fr) minmax(0, 1fr)">
                    <Box>
                        {activeTab === 'exercises' &&
                            <LessonExercises
                                course={course}
                                lesson={lesson}
                                onCreate={handleCreateExercise}
                                onDelete={handleDeleteExercise}
                            />
                        }

                        {activeTab === 'content' &&
                            <LessonContent
                                lesson={lesson}
                                onUpdate={handleUpdateLesson}
                            />
                        }
                    </Box>

                    <Box>
                        <LessonDetails
                            lesson={lesson}
                            onUpdate={handleUpdateLesson}
                        />

                        <LessonImage
                            lesson={lesson}
                            onUpdate={handleUpdateLesson}
                        />
                    </Box>
                </Grid>
            </PageContent>

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