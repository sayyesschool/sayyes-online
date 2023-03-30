import { NavLink } from 'react-router-dom';

import { Icon, List, Text } from 'shared/ui-components';

export default function ExercisesList({
    course,
    exercises,
    selectedExercise
}) {
    return (
        <List as="nav" className="ExercisesList">
            {exercises.map((exercise, index) =>
                <List.Item
                    key={exercise.id}
                    as={NavLink}
                    to={exercise.uri + (course?.enrollmentId ? `?enrollmentId=${course.enrollmentId}` : '')}
                    decorator={
                        <Icon>{exercise.completed ? 'check_circle_outline' : 'radio_button_unchecked'}</Icon>
                    }
                    content={<>
                        <Text type="body1">{exercise.title}</Text>
                        <Text type="body2">{exercise.description}</Text>
                    </>}
                    selected={exercise.id === selectedExercise?.id}
                    variant={exercise.id === selectedExercise?.id ? 'soft' : 'plain'}
                />
            )}
        </List>
    );
}