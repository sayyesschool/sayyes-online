import { useCallback, useState } from 'react';

import { useBoolean } from 'shared/hooks/state';
import { Button } from 'shared/ui-components';
import ExerciseItem from 'shared/components/exercise-item';

import './index.scss';

export default function ExerciseContent({ user, exercise, onProgressChange, onComplete }) {
    const [state, setState] = useState(exercise.state || {});
    const [isSaving, setSaving] = useBoolean(false);
    const [isChecked, setChecked] = useBoolean(false);

    const handleSave = useCallback(() => {
        setSaving(true);

        return onProgressChange(exercise, { state })
            .finally(() => setSaving(false));
    }, [state, exercise, onProgressChange]);

    const handleComplete = useCallback(() => {
        setSaving(true);

        return onProgressChange(exercise, { completed: !exercise.completed })
            .finally(() => setSaving(false));
    }, [exercise, onComplete]);

    const handleCheck = useCallback(() => {
        setChecked(true);
    }, []);

    const handleUpdateState = useCallback((itemId, state) => {
        setState(oldState => ({
            ...oldState,
            [itemId]: state
        }));
    }, []);

    const hasSaveableItems = user.role === 'client' && exercise.items.some(item =>
        item.type === 'essay' ||
        item.type === 'fib' ||
        item.type === 'input'
    );

    const hasCheckableItems = exercise.items.some(item =>
        item.type === 'fib' ||
        (item.type === 'input' && item.items?.length > 0)
    );

    return (
        <article className="exercise">
            <section className="exercise-content">
                {exercise.items.map(item =>
                    <ExerciseItem
                        key={item.id}
                        item={item}
                        state={state[item.id]}
                        checked={exercise.completed || isChecked}
                        completed={exercise.completed}
                        disabled={user.role === 'teacher' || exercise.completed}
                        onUpdateState={handleUpdateState}
                    />
                )}
            </section>

            <footer className="exercise-footer">
                {hasCheckableItems &&
                    <Button
                        content="Проверить"
                        icon="done"
                        primary
                        flat
                        onClick={handleCheck}
                    />
                }

                {hasSaveableItems &&
                    <Button
                        content="Сохранить"
                        icon="save"
                        primary
                        flat
                        disabled={isSaving}
                        onClick={handleSave}
                    />
                }

                {user.role === 'teacher' &&
                    <Button
                        content={exercise.completed ? 'Отметить как невыполненное' : 'Отметить как выполненное'}
                        icon={exercise.completed ? 'task_alt' : undefined}
                        primary={!exercise.completed}
                        secondary={exercise.completed}
                        flat
                        disabled={isSaving}
                        onClick={handleComplete}
                    />
                }
            </footer>
        </article>
    );
}