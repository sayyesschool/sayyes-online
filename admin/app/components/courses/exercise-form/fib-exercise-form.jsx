import { useCallback, useState } from 'react';
import {
    FormField,
    IconButton,
    Layout,
    Switch,
    TextField
} from 'mdc-react';

import TextEditor from 'shared/components/text-editor';

import ExerciseItemsSection from 'app/components/courses/exercise-items-section';

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
            items: exercise.items.filter(item => item.id !== itemId)
        });
    }, [exercise, onUpdate]);

    return (
        <ExerciseItemsSection onAddItem={handleAddItem}>
            {exercise.items.map(item =>
                <FIBExerciseItemForm
                    key={item.id}
                    item={item}
                    onUpdate={handleUpdateItem}
                    onDelete={handleDeleteItem}
                />
            )}
        </ExerciseItemsSection>
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

    const handleDelete = useCallback(() => {
        onDelete(item.id);
    }, []);

    return (
        <div className="exercise-item">
            <Layout row alignItems="center" justifyContent="between">
                <FormField label="Текст с форматированием">
                    <Switch
                        selected={isHtml}
                        onChange={() => setHtml(v => !v)}
                    />
                </FormField>

                <IconButton
                    icon="delete"
                    onClick={handleDelete}
                />
            </Layout>

            {isHtml ?
                <TextEditor
                    value={item.text}
                    onChange={handleChange}
                />
                :
                <TextField
                    value={item.text}
                    outlined
                    textarea
                    autoResize
                    onChange={handleChange}
                />
            }
        </div>
    );
}