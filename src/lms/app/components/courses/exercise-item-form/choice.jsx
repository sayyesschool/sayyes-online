import { forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { Button, Checkbox, Input, List } from 'shared/ui-components';
import TextEditor from 'shared/components/text-editor';

function ExerciseChoiceItem({ item }, ref) {
    const [text, setText] = useState(item.text || '');
    const [items, setItems] = useState(item.items || []);

    useImperativeHandle(ref, () => ({
        get data() { return { text, items }; }
    }));

    const handleTextChange = useCallback((event, value) => {
        setText(value);
    }, []);

    const handleAddItem = useCallback(() => {
        setItems(items => items.concat({
            id: uuid(),
            text: '',
            correct: false
        }));
    }, []);

    const handleUpdateItem = useCallback((itemId, text) => {
        setItems(items => items.map(item => item.id !== itemId ? item : { ...item, text }));
    }, []);

    const handleItemCorrect = useCallback(itemId => {
        setItems(items => items.map(item => ({
            ...item,
            correct: item.id === itemId ? !item.correct : item.correct
        })));
    }, []);

    const handleDeleteItem = useCallback(itemId => {
        setItems(items => items.filter(item => item.id !== itemId));
    }, []);

    return (
        <>
            <TextEditor
                value={text}
                onChange={handleTextChange}
            />

            <List>
                {items?.map(item =>
                    <List.Item
                        key={item.id}
                        media={
                            <Checkbox
                                checked={item.correct}
                                onChange={() => handleItemCorrect(item.id)}
                            />
                        }
                        content={
                            <Input
                                value={item.text}
                                fluid
                                onChange={event => handleUpdateItem(item.id, event.target.value)}
                            />
                        }
                        endMedia={
                            <Button
                                type="button"
                                icon="delete"
                                text
                                onClick={() => handleDeleteItem(item.id)}
                            />
                        }
                    />
                )}
            </List>

            <Button
                type="button"
                content="Добавить ответ"
                icon="add"
                text
                fluid
                onClick={handleAddItem}
            />
        </>
    );
}

export default forwardRef(ExerciseChoiceItem);