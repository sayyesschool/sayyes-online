import { useCallback, useRef } from 'react';
import {
    Button,
    Card
} from 'mdc-react';

import { useBoolean } from 'shared/hooks/state';
import ExerciseContent from 'shared/components/exercise-content';

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
        <Card className="exercise-content-card">
            <Card.Section primary>
                <ExerciseContent
                    ref={exerciseContent}
                    exercise={exercise}
                    checked={isChecked}
                />
            </Card.Section>

            {isSavable &&
                <Card.Actions>
                    <Card.Action button>
                        <Button
                            label="Сохранить"
                            icon="save"
                            outlined
                            disabled={isSaving}
                            onClick={handleSave}
                        />
                    </Card.Action>
                </Card.Actions>
            }

            {isCheckable &&
                <Card.Actions>
                    <Card.Action button>
                        <Button
                            label="Проверить"
                            icon="done_all"
                            outlined
                            onClick={handleCheck}
                        />
                    </Card.Action>
                </Card.Actions>
            }
        </Card>
    );
}