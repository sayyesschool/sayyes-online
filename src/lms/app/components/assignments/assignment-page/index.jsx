import { useCallback } from 'react';

import { useAssignment } from 'shared/hooks/assignments';
import { useUser } from 'shared/hooks/user';
import Content from 'shared/components/content';
import ContentEditor from 'shared/components/content-editor';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import { Heading, Surface, Text } from 'shared/ui-components';

import Exercise from 'lms/components/courses/exercise';

import './index.scss';

const StatusLabel = {
    assigned: 'Задано',
    submitted: 'Сдано',
    completed: 'Завершено'
};

const StatusColor = {
    assigned: 'primary',
    submitted: 'warning',
    completed: 'success'
};

export default function AssignmentPage({ match, location }) {
    const [assignment] = useAssignment(match.params.id, location.search);
    const [user] = useUser();

    const handleExerciseProgressChange = useCallback((exercise, data) => {
        return actions.updateExerciseProgress(exercise.progressId, {
            ...data,
            enrollmentId: course.enrollmentId,
            courseId: course.id,
            exerciseId: exercise.id
        });
    }, []);

    if (!assignment) return <LoadingIndicator />;

    const isTeacher = user.role === 'teacher';
    const isLearner = user.role === 'learner';

    return (
        <Page className="AssignmentPage">
            <Page.Header
                breadcrumbs={[{ content: 'Задание' }]}
                title={
                    <Heading
                        content={assignment.title}
                        end={
                            <Text
                                content={StatusLabel[assignment.status]}
                                color={StatusColor[assignment.status]}
                                variant="soft"
                                type="body-sm"
                            />
                        }
                    />
                }
                description={
                    <Text
                        content="Дата выполнения:"
                        end={
                            <Text
                                content={assignment.dueAt}
                                variant="soft"
                            />
                        }
                    />
                }
            />

            <Page.Content>
                {assignment.content &&
                    (isTeacher &&
                        <Surface variant="outlined">
                            <ContentEditor
                                content={assignment.content}
                            />
                        </Surface>
                    )
                    ||
                    (isLearner &&
                        <Content
                            content={assignment.content}
                            html
                        />
                    )
                }

                {assignment.exercises.map((exercise, index) =>
                    <Exercise
                        key={exercise.id}
                        index={index}
                        user={user}
                        exercise={exercise}
                        showRemoveFromAssignment={user.role === 'teacher'}
                        onProgressChange={handleExerciseProgressChange}
                    />
                )}
            </Page.Content>
        </Page>
    );
}