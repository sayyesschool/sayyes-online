import { useCallback } from 'react';
import {
    Button,
    Flex,
    Label,
    Input
} from '@fluentui/react-northstar';

import Icon from 'shared/components/material-icon';

import ExerciseItems from 'app/components/courses/exercise-items';

import './index.scss';

export default function InputExerciseForm({ exercise, onUpdate }) {
    const handleAddItem = useCallback(() => {
        onUpdate({
            ...exercise,
            items: exercise.items.concat({
                id: Date.now(),
                text: '',
                answers: []
            })
        });
    }, [exercise, onUpdate]);

    const handleUpdateItem = useCallback((itemId, data) => {
        onUpdate({
            items: exercise.items.map(item => item.id !== itemId ? item : { ...item, ...data })
        });
    }, [exercise, onUpdate]);

    const handleDeleteItem = useCallback(itemId => {
        onUpdate({
            items: exercise.items.filter(i => i.id !== itemId)
        });
    }, [exercise, onUpdate]);

    return (
        <ExerciseItems onAddItem={handleAddItem}>
            {exercise.items.map(item =>
                <InputExerciseItemForm
                    key={item.id}
                    item={item}
                    onUpdate={handleUpdateItem}
                    onDelete={handleDeleteItem}
                />
            )}
        </ExerciseItems>
    );
}

function InputExerciseItemForm({ item, onUpdate, onDelete }) {
    const handleUpdateText = useCallback(event => {
        onUpdate(item.id, {
            text: event.target.value
        });
    }, [item, onUpdate]);

    const handleDeleteAnswer = useCallback(answer => {
        onUpdate(item.id, {
            answers: item.answers.filter(a => a !== answer)
        });
    }, [item, onUpdate]);

    const handleKeyPress = useCallback(event => {
        if (event.key == 'Enter') {
            event.preventDefault();

            onUpdate(item.id, {
                answers: item.answers.concat(event.target.value)
            });

            event.target.value = '';

            return false;
        }
    }, [item, onUpdate]);

    const handleDelete = useCallback(() => {
        onDelete(item.id);
    }, [item, onDelete]);

    return (
        <div className="exercise-item">
            <Input
                value={item.text}
                icon={
                    <Button
                        type="button"
                        icon={<Icon>delete</Icon>}
                        iconOnly
                        text
                        onClick={handleDelete}
                    />
                }
                fluid
                onChange={handleUpdateText}
            />

            <Flex vAlign="center">
                <label>Варианты ответа:</label>

                {item.answers?.map(answer =>
                    <Label
                        content={answer}
                        icon={
                            <Button
                                icon={<Icon>delete</Icon>}
                                iconOnly
                                text
                                onClick={() => handleDeleteAnswer(answer)}
                            />

                        }
                    />
                )}

                <input
                    element="div"
                    defaultValue=""
                    placeholder="Введите ответ"
                    onKeyPress={handleKeyPress}
                />
            </Flex>
        </div>
    );
}