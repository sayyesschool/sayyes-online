import { forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import { v4 as uuid } from 'uuid';

import ContentEditor from 'shared/components/content-editor';
import { Button, Checkbox, IconButton, Input, List } from 'shared/ui-components';

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
            <ContentEditor
                content={text}
                onChange={handleTextChange}
            />

            <List>
                {items?.map(item =>
                    <List.Item key={item.id}>
                        <Input
                            start={
                                <Checkbox
                                    checked={item.correct}
                                    onChange={() => handleItemCorrect(item.id)}
                                />
                            }
                            value={item.text}
                            end={
                                <IconButton
                                    type="button"
                                    icon="delete"
                                    size="sm"
                                    variant="plain"
                                    color="danger"
                                    onClick={() => handleDeleteItem(item.id)}
                                />
                            }
                            variant="plain"
                            onChange={event => handleUpdateItem(item.id, event.target.value)}
                        />
                    </List.Item>
                )}
            </List>

            <Button
                type="button"
                content="Добавить ответ"
                icon="add"
                variant="plain"
                size="sm"
                sx={{ ml: 2, mb: 1 }}
                onClick={handleAddItem}
            />
        </>
    );
}

export default forwardRef(ExerciseChoiceItem);