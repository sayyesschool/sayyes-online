import ExerciseItem from 'shared/components/exercise-item';

export default function ExerciseContent({
    exercise,
    checked,
    readOnly,
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
                    checked={checked}
                    readOnly={readOnly}
                    onUpdateState={onUpdateState}
                />
            )}
        </section>
    );
}