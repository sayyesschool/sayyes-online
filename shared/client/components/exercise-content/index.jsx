import { useCallback, useState } from 'react';

import { useBoolean } from 'shared/hooks/state';
import { Button } from 'shared/ui-components';
import ExerciseItem from 'shared/components/exercise-item';

import './index.scss';

export default function ExerciseContent({ exercise, readonly, onProgressChange }) {
    const [state, setState] = useState(exercise.state || {});
    const [isSaving, setSaving] = useBoolean(false);
    const [isChecked, setChecked] = useBoolean(false);

    const handleSave = useCallback(() => {
        setSaving(true);

        return onProgressChange(exercise, { state })
            .then(() => setSaving(false));
    }, [state, exercise]);

    const handleCheck = useCallback(() => {
        setChecked(true);
    }, []);

    const handleUpdateState = useCallback((itemId, state) => {
        setState(oldState => ({
            ...oldState,
            [itemId]: state
        }));
    }, []);

    const hasSaveableItems = readonly ? false : exercise.items.some(item =>
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
                        checked={isChecked}
                        onUpdateState={handleUpdateState}
                    />
                )}
            </section>

            <footer className="exercise-footer">
                {hasCheckableItems &&
                    <Button
                        content="Проверить"
                        icon="done_all"
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
            </footer>
        </article>
    );
}