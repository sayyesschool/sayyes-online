import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';

import ContentEditor from 'shared/components/content-editor';
import { Button, Checkbox, IconButton, Input, List } from 'shared/ui-components';

function BooleanItemForm({
    content,
    items: _items = []
}, ref) {
    const editorRef = useRef();

    const [items, setItems] = useState(_items);

    useImperativeHandle(ref, () => ({
        get props() {
            return {
                content: editorRef.current?.getData(),
                items
            };
        }
    }));

    const handleAddItem = useCallback(() => {
        setItems(items => items.concat({
            id: uuid(),
            text: '',
            correct: false
        }));
    }, []);

    const handleItemTextChange = useCallback((itemId, text) => {
        setItems(items => items.map(item => item.id !== itemId ? item : {
            ...item,
            text
        }));
    }, []);

    const handleItemCorrectChange = useCallback(itemId => {
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
                ref={editorRef}
                content={content}
            />

            <List>
                {items.map(item =>
                    <List.Item key={item.id}>
                        <Input
                            start={
                                <Checkbox
                                    checked={item.correct}
                                    onChange={() => handleItemCorrectChange(item.id)}
                                />
                            }
                            value={item.text}
                            end={
                                <IconButton
                                    type="button"
                                    icon="delete"
                                    color="danger"
                                    size="sm"
                                    variant="plain"
                                    onClick={() => handleDeleteItem(item.id)}
                                />
                            }
                            onChange={event => handleItemTextChange(item.id, event.target.value)}
                        />
                    </List.Item>
                )}
            </List>

            <Button
                type="button"
                content="Добавить утверждение"
                icon="add"
                variant="plain"
                size="sm"
                sx={{ ml: 2, mb: 1 }}
                onClick={handleAddItem}
            />
        </>
    );
}

export default forwardRef(BooleanItemForm);