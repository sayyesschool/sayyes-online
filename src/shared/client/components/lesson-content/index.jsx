import ExerciseCard from 'shared/components/exercise-card';

import './index.scss';

export default function LessonContent({ lesson, onExerciseStatusChange }) {
    return (
        <section className="lesson-content">
            {lesson.exercises?.map((exercise, index) =>
                <ExerciseCard
                    key={exercise.id}
                    number={index + 1}
                    exercise={exercise}
                    onStatusChange={onExerciseStatusChange}
                />
            )}
        </section>
    );
}