import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
    LayoutGrid
} from 'mdc-react';

import { useBoolean } from 'shared/hooks/state';
import { useCourse } from 'shared/hooks/courses';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import PageTopBar from 'shared/components/page-top-bar';
import PageContent from 'shared/components/page-content';
import PageSideSheet from 'shared/components/page-side-sheet';

import ExerciseContent from 'app/components/courses/exercise-content';
import ExerciseNotes from 'app/components/courses/exercise-notes';
import ExercisesList from 'app/components/courses/exercises-list';

import './index.scss';

export default function ExercisePage({ match, history }) {
    const [course, actions] = useCourse(match.params.courseId);

    const [isSideSheetOpen, toggleSideSheet] = useBoolean(false);

    const handleUpdateExercise = useCallback(data => {
        return actions.updateExercise(course.id, exercise.id, data)
            .then(() => setExerciseFormOpen(false));
    }, [course, exercise]);

    const handleDeleteExercise = useCallback(() => {
        if (confirm('Удалить упражнение?')) {
            return actions.deleteExercise(course.id, exercise.id)
                .then(() => history.push(lesson.url));
        }
    }, [course, lesson, exercise]);

    if (!course) return <LoadingIndicator />;

    const unit = course.unitsById.get(match.params.unitId);
    const lesson = course.lessonsById.get(match.params.lessonId);
    const exercise = course.exercisesById.get(match.params.exerciseId);
    const lessonExercises = lesson.exercises.map(id => course.exercisesById.get(id));

    return (
        <Page id="exercise-page">
            <PageSideSheet
                title="Упражнения"
                appear
                open={isSideSheetOpen}
                onClose={toggleSideSheet}
            >
                <ExercisesList
                    exercises={lessonExercises}
                />
            </PageSideSheet>

            <div className="mdc-side-sheet-content">
                <PageTopBar
                    breadcrumbs={[
                        <Link to={course.uri}>{course.title}</Link>,
                        <Link to={unit.uri}>{unit.title}</Link>,
                        <Link to={lesson.uri}>{lesson.title}</Link>
                    ]}
                    overline="Упражнение"
                    title={exercise.title}
                    actions={[
                        {
                            key: 'delete',
                            icon: 'delete',
                            title: 'Удалить упражнение',
                            onClick: handleDeleteExercise
                        },
                        {
                            key: 'list',
                            icon: isSideSheetOpen ? 'close' : 'format_list_bulleted',
                            title: 'Список упражнений',
                            onClick: toggleSideSheet
                        }
                    ]}
                />

                <PageContent>
                    <LayoutGrid>
                        <LayoutGrid.Cell span="7">
                            <ExerciseContent
                                course={course}
                                exercise={exercise}
                                onUpdate={handleUpdateExercise}
                            />
                        </LayoutGrid.Cell>

                        <LayoutGrid.Cell span="5">
                            <ExerciseNotes
                                exercise={exercise}
                                onUpdate={handleUpdateExercise}
                            />
                        </LayoutGrid.Cell>
                    </LayoutGrid>
                </PageContent>
            </div>
        </Page>
    );
}