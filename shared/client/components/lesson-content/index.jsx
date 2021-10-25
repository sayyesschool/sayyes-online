import ExerciseCard from 'shared/components/exercise-card';

import './index.scss';

export default function LessonContent({ course, unit, lesson }) {
    const exercises = lesson.exercises.map(id => course.exercisesById.get(id));

    return (
        <section className="lesson-content">
            {exercises?.map((exercise, index) =>
                <ExerciseCard
                    key={exercise.id}
                    number={index + 1}
                    exercise={exercise}
                />
            )}
        </section>
    );
}