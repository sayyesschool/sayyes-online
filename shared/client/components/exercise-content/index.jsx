import { useCallback, useRef } from 'react';

import { useBoolean } from 'shared/hooks/state';
import { Button } from 'shared/ui-components';
import ExerciseItem from 'shared/components/exercise-item';

import './index.scss';

export default function ExerciseContent({ exercise, onProgressChange }) {
    const exerciseContentRef = useRef();

    const [isSaving, setSaving] = useBoolean(false);
    const [isChecked, setChecked] = useBoolean(false);

    const handleSave = useCallback(() => {
        setSaving(true);

        return onProgressChange(exercise, {
            state: exerciseContentRef.current.state
        }).then(() => setSaving(false));
    }, [exercise]);

    const handleCheck = useCallback(() => {
        setChecked(true);
    }, []);

    const hasSaveableItems = exercise.items.some(item =>
        item.type === 'input' ||
        item.type === 'essay' ||
        item.type === 'fib'
    );

    const hasCheckableItems = exercise.items.some(item =>
        item.type === 'input' ||
        item.type === 'fib'
    );

    return (
        <article className="exercise">
            {/* <header className="exercise-header">
                <Text as="h1" className="exercise-title">{exercise.title}</Text>
            </header> */}

            <section className="exercise-content">
                {exercise.items.map(item =>
                    <ExerciseItem
                        key={item.id}
                        item={item}
                        checked={isChecked}
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