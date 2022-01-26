import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
    Card,
    LayoutGrid
} from 'mdc-react';

import { useCourse } from 'shared/hooks/courses';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import PageTopBar from 'shared/components/page-top-bar';
import PageContent from 'shared/components/page-content';

import LessonDetails from 'app/components/courses/lesson-details';
import LessonExercises from 'app/components/courses/lesson-exercises';

import './index.scss';

export default function LessonPage({ match, history }) {
    const [course, actions] = useCourse(match.params.courseId);

    const handleUpdateLesson = useCallback(data => {
        return actions.updateLesson(course.id, lesson.id, data);
    }, [course, lesson]);

    const handleDeleteLesson = useCallback(() => {
        if (confirm('Удалить урок?')) {
            return actions.deleteLesson(course.id, lesson.id)
                .then(() => history.push(unit.url));
        } else {
            return Promise.resolve();
        }
    }, [course, unit, lesson]);

    const handleCreateExercise = useCallback(data => {
        data.unit = unit.id;
        data.lesson = lesson.id;

        return actions.createExercise(course.id, data);
    }, [course, unit, lesson]);

    const handleUpdateExercise = useCallback((exerciseId, data) => {
        return actions.updateExercise(course.id, exerciseId, data);
    }, [course]);

    const handleDeleteExercise = useCallback(exerciseId => {
        if (confirm('Удалить упражнение?')) {
            return actions.deleteExercise(course.id, exerciseId);
        } else {
            return Promise.resolve();
        }
    }, [course]);

    if (!course) return <LoadingIndicator />;

    const unit = course.unitsById.get(match.params.unitId);
    const lesson = course.lessonsById.get(match.params.lessonId);

    return (
        <Page id="lesson-page">
            <PageTopBar
                breadcrumbs={[
                    <Link to={course.uri}>{course.title}</Link>,
                    <Link to={unit.uri}>{unit.title}</Link>
                ]}
                title={lesson.title}
                actions={[
                    {
                        key: 'delete',
                        icon: 'delete',
                        title: 'Удалить урок',
                        onClick: handleDeleteLesson
                    }
                ]}
            />

            <PageContent>
                <LayoutGrid>
                    <LayoutGrid.Cell span="8">
                        <LessonDetails
                            lesson={lesson}
                            onUpdate={handleUpdateLesson}
                        />
                    </LayoutGrid.Cell>

                    <LayoutGrid.Cell span="4">
                        <LessonExercises
                            course={course}
                            lesson={lesson}
                            onCreate={handleCreateExercise}
                            onUpdate={handleUpdateExercise}
                            onDelete={handleDeleteExercise}
                        />
                    </LayoutGrid.Cell>
                </LayoutGrid>
            </PageContent>
        </Page>
    );
}