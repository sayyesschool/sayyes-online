import { useCallback, useRef } from 'react';
import { Text } from '@fluentui/react-northstar';

import { useBoolean } from 'shared/hooks/state';
import Button from 'shared/components/button';
import ExerciseItem from 'shared/components/exercise-item';

import './index.scss';

export default function ExerciseContent({ exercise, onProgressChange }) {
    const exerciseContentRef = useRef();

    const [isSaving, setSaving] = useBoolean(false);
    const [isChecked, setChecked] = useBoolean(false);

    const handleSave = useCallback(() => {
        setSaving(true);

        return onProgressChange(exercise, { state: exerciseContentRef.current.state }).then(() => setSaving(false));
    }, [exercise]);

    const handleCheck = useCallback(() => {
        return setChecked(true);
    }, []);

    return (
        <article className="exercise">
            <header className="exercise-header">
                <Text as="h1" className="exercise-title">{exercise.title}</Text>
            </header>

            <section className="exercise-content">
                {exercise.items.map(item =>
                    <ExerciseItem
                        key={item.id}
                        item={item}
                        checked={isChecked}
                    />
                )}
            </section>

            {/* {isSavable &&
                <Button
                    label="Сохранить"
                    icon="save"
                    outlined
                    disabled={isSaving}
                    onClick={handleSave}
                />
            } */}

            <footer className="exercise-footer">
                <Button
                    content="Проверить"
                    icon="done_all"
                    primary
                    flat
                    onClick={handleCheck}
                />
            </footer>
        </article>
    );
}