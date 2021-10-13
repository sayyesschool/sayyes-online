import React, { useCallback, useState } from 'react';
import {
    Button,
    Icon,
    FormField,
    Switch,
    TextField,
    Typography
} from 'mdc-react';

import TextEditor from 'shared/components/text-editor';

export default function FIBExerciseForm({ exercise, onUpdate }) {
    const handleAddItem = useCallback(() => {
        onUpdate({
            ...exercise,
            items: exercise.items.concat({
                id: Date.now(),
                text: '',
                html: false
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
            items: exercise.items.filter(a => a.id !== itemId)
        });
    }, [exercise, onUpdate]);

    return (
        <section>
            <Typography className="elements-label">Элементы</Typography>

            {exercise.items.map(item =>
                <FIBExerciseItemForm
                    key={item.id}
                    item={item}
                    onUpdate={handleUpdateItem}
                    onDelete={handleDeleteItem}
                />
            )}

            <Button
                className="new-item-button"
                type="button"
                icon={<Icon>add</Icon>}
                label="Добавить элемент"
                outlined
                onClick={handleAddItem}
            />
        </section>
    );
}

function FIBExerciseItemForm({ item, onUpdate, onDelete }) {
    const [isHtml, setHtml] = useState(item.html);

    const handleChange = useCallback((event, value) => {
        onUpdate(item.id, {
            text: value,
            html: isHtml
        });
    }, [item, isHtml]);

    return (
        <div className="exercise-item">
            <FormField label="Текст с форматированием">
                <Switch
                    checked={isHtml}
                    onChange={() => setHtml(v => !v)}
                />
            </FormField>

            {isHtml ?
                <TextEditor
                    value={item.text}
                    onChange={handleChange}
                />
                :
                <TextField
                    value={item.text}
                    filled
                    textarea
                    onChange={handleChange}
                />
            }
        </div>
    );
}