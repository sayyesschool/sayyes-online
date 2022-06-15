import { useCallback, useRef } from 'react';
import { Segment } from '@fluentui/react-northstar';

import { useBoolean } from 'shared/hooks/state';
import Button from 'shared/components/button';
import ExerciseItem from 'shared/components/exercise-item';

import './index.scss';

export default function ExerciseContentCard({ exercise, onProgressChange }) {
    const exerciseContent = useRef();

    const [isSaving, setSaving] = useBoolean(false);
    const [isChecked, setChecked] = useBoolean(false);

    const handleSave = useCallback(() => {
        setSaving(true);

        return onProgressChange(exercise, { state: exerciseContent.current.state }).then(() => setSaving(false));
    }, [exercise]);

    const handleCheck = useCallback(() => {
        return setChecked(true);
    }, []);

    const isSavable = (
        exercise.type === 'input' ||
        exercise.type === 'essay'
    );
    const isCheckable = (
        exercise.type === 'boolean' ||
        exercise.type === 'choice' ||
        exercise.type === 'fib'
    );

    return (
        <Segment
            className="exercise-content-card"
            title={exercise.title}
            description={exercise.description}
        >
            {exercise.items.map(item =>
                <ExerciseItem
                    key={item.id}
                    exercise={exercise}
                    checked={isChecked}
                />
            )}

            {isSavable &&
                <Button
                    label="Сохранить"
                    icon="save"
                    outlined
                    disabled={isSaving}
                    onClick={handleSave}
                />
            }

            {isCheckable &&
                <Button
                    label="Проверить"
                    icon="done_all"
                    outlined
                    onClick={handleCheck}
                />
            }
        </Segment>
    );
}