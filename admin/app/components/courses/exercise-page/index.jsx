import { useCallback, useState } from 'react';
import { Box, Grid } from '@fluentui/react-northstar';

import { useBoolean } from 'shared/hooks/state';
import { use } from 'shared/hooks/courses';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import PageHeader from 'shared/components/page-header';
import PageContent from 'shared/components/page-content';
import Tabs from 'shared/components/tabs';

import ExerciseAudio from 'app/components/courses/exercise-audio';
import ExerciseDetails from 'app/components/courses/exercise-details';
import ExerciseImages from 'app/components/courses/exercise-images';
import ExerciseItems from 'app/components/courses/exercise-items';
import ExerciseNotes from 'app/components/courses/exercise-notes';
import ExercisePreview from 'app/components/courses/exercise-preview';
import ExerciseText from 'app/components/courses/exercise-text';

import './index.scss';

export default function ExercisePage({ match, history }) {
    const { course, unit, lesson, exercise, actions } = use(match.params);

    const [activeTab, setActiveTab] = useState('content');
    const [isPreviewing, togglePreviewing] = useBoolean(false);
    const [isConfirmationDialogOpen, toggleConfirmationDialogOpen] = useBoolean(false);

    const handleUpdate = useCallback(data => {
        return actions.updateExercise(course.id, exercise.id, data);
    }, [course, exercise]);

    const handleDelete = useCallback(() => {
        return actions.deleteExercise(course.id, exercise.id)
            .then(() => history.push(lesson.url));
    }, [course, lesson, exercise]);

    if (!exercise) return <LoadingIndicator />;

    return (
        <Page id="exercise-page">
            <PageHeader
                breadcrumbs={[
                    { key: 'courses', text: 'Курсы', url: '/courses' },
                    { key: 'course', text: course.title, url: course.uri },
                    { key: 'unit', text: unit.title, url: unit.uri },
                    { key: 'lesson', text: lesson.title, url: lesson.uri }
                ]}
                overline="Упражнение"
                title={exercise.title}
                actions={[
                    {
                        key: 'preview',
                        icon: isPreviewing ? 'visibility_off' : 'visibility',
                        title: 'Просмотр упражнения',
                        onClick: togglePreviewing
                    },
                    {
                        key: 'delete',
                        icon: 'delete',
                        title: 'Удалить упражнение',
                        onClick: toggleConfirmationDialogOpen
                    }
                ]}
            />

            {isPreviewing ?
                <PageContent>
                    <ExercisePreview
                        exercise={exercise}
                    />
                </PageContent>
                :
                <PageContent>
                    {/* <Tabs
                        items={[
                            {
                                key: 'content',
                                value: 'content',
                                content: 'Содержание',
                                icon: 'description'
                            },
                            {
                                key: 'notes',
                                value: 'notes',
                                content: 'Заметки',
                                icon: 'notes'
                            }
                        ]}
                        onChange={setActiveTab}
                    /> */}

                    <Grid columns="minmax(0, 2fr) minmax(0, 1fr)">
                        <Box>
                            {activeTab === 'content' && <>
                                <ExerciseImages
                                    exercise={exercise}
                                    uploadPath={`courses/${course.id}/images/`}
                                    onUpdate={handleUpdate}
                                />

                                <ExerciseAudio
                                    exercise={exercise}
                                    uploadPath={`courses/${course.id}/audios/`}
                                    onUpdate={handleUpdate}
                                />

                                <ExerciseText
                                    exercise={exercise}
                                    onUpdate={handleUpdate}
                                />

                                <ExerciseItems
                                    exercise={exercise}
                                    onUpdate={handleUpdate}
                                />
                            </>}

                            {activeTab === 'notes' &&
                                <ExerciseNotes
                                    exercise={exercise}
                                    onUpdate={handleUpdate}
                                />
                            }
                        </Box>

                        <Box>
                            <ExerciseDetails
                                exercise={exercise}
                                onUpdate={handleUpdate}
                            />

                            <ExerciseNotes
                                exercise={exercise}
                                onUpdate={handleUpdate}
                            />
                        </Box>
                    </Grid>
                </PageContent>
            }

            <ConfirmationDialog
                title="Удалить упражнение?"
                message="Упражнение будет удален без возможности восстановления."
                open={isConfirmationDialogOpen}
                onClose={toggleConfirmationDialogOpen}
                onConfirm={handleDelete}
            />
        </Page>
    );
}