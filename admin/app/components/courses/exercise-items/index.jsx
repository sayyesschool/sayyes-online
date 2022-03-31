import { createElement, useCallback, useState } from 'react';
import { Button } from '@fluentui/react-northstar';

import Icon from 'shared/components/material-icon';
import PageSection from 'shared/components/page-section';

import BooleanExerciseContent from './boolean';
import ChoiceExerciseContent from './choice';
import EssayExerciseContent from './essay';
import FIBExerciseContent from './fib';
import InputExerciseContent from './input';
import TextExerciseContent from './text';

import './index.scss';

const componentsByType = {
    boolean: BooleanExerciseContent,
    choice: ChoiceExerciseContent,
    essay: EssayExerciseContent,
    fib: FIBExerciseContent,
    input: InputExerciseContent,
    text: TextExerciseContent
};

export default function ExerciseItems({ exercise, onUpdate }) {
    const [items, setItems] = useState(exercise.items, [exercise.type]);

    const handleSave = useCallback(() => {
        setItems(items => {
            onUpdate({ items });

            return items;
        });
    }, []);

    const handleAdd = useCallback(() => {
        setItems(items => items.concat({ id: Date.now() }));
    }, []);

    return (
        <PageSection
            className="exercise-items"
            title="Элементы"
            actions={[
                <Button
                    icon={<Icon>add</Icon>}
                    iconOnly
                    text
                    onClick={handleAdd}
                />,
                items?.length > 0 &&
                <Button
                    icon={<Icon>save</Icon>}
                    iconOnly
                    text
                    onClick={handleSave}
                />
            ]}
        >
            {exercise.type &&
                createElement(componentsByType[exercise.type], {
                    key: exercise.id,
                    items,
                    onUpdate: setItems
                })
            }
        </PageSection>
    );
}