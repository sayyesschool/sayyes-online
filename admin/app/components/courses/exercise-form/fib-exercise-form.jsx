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

    return (
        <section>
            <Typography className="elements-label">Элементы</Typography>

            {exercise.items.map(item =>
                <FIBExerciseItemForm
                    key={item.id}
                    item={item}
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

function FIBExerciseItemForm({ item }) {
    const [text, setText] = useState(item.text);
    const [isHtml, setHtml] = useState(false);

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
                    text={item.text}
                />
                :
                <TextField
                    value={item.text}
                    filled
                    textarea
                    onChange={event => setText(event.target.value)}
                />
            }
        </div>
    );
}