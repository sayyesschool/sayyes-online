import ExerciseItem from 'shared/components/exercise-item';

import './ExerciseContent.scss';

export default function ExerciseContent({
    exercise,
    checked,
    disabled,
    state,
    onUpdateState
}) {
    return (
        <section className="ExerciseContent">
            {exercise.items?.map(item =>
                <ExerciseItem
                    key={item.id}
                    item={item}
                    state={state[item.id]}
                    completed={exercise.completed}
                    checked={checked || exercise.completed}
                    disabled={disabled || exercise.completed}
                    onUpdateState={onUpdateState}
                />
            )}
        </section>
    );
}