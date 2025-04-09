import { useCallback } from 'react';

import { v4 as uuid } from 'uuid';

import { Avatar, Button, Flex, IconButton, Input } from 'shared/ui-components';

import styles from './LexemeExamples.module.scss';

export default function LexemeExamples({ examples, onChange, ...props }) {
    const handleAdd = useCallback(() => {
        const newExample = {
            id: uuid(),
            text: '',
            translation: ''
        };

        onChange(prevExamples => [...prevExamples, newExample]);
    }, [onChange]);

    const handleChange = useCallback((id, { target }) => {
        const { name, value } = target;

        const updatedExamples = examples.map(example =>
            example.id === id ? { ...example, [name]: value } : example
        );

        onChange(updatedExamples);
    }, [examples, onChange]);

    const handleDelete = useCallback(id => {
        const updatedExamples = examples.filter(example => example.id !== id);

        onChange(updatedExamples);
    }, [examples, onChange]);

    return (
        <div className={styles.root} {...props}>
            {examples.map(({ id, text, translation }, i) => (
                <div key={id} className={styles.item}>
                    <Avatar content={i + 1} size="sm" />

                    <Flex dir="column" flex="1">
                        <Input
                            className={styles.input}
                            placeholder="Пример"
                            name="text"
                            value={text}
                            variant="plain"
                            required
                            onChange={e => handleChange(id, e)}
                        />

                        <Input
                            className={styles.input}
                            placeholder="Перевод"
                            name="translation"
                            value={translation}
                            variant="plain"
                            size="sm"
                            required
                            onChange={e => handleChange(id, e)}
                        />
                    </Flex>

                    <IconButton
                        icon="delete"
                        color="neutral"
                        size="sm"
                        variant="plain"
                        title="Удалить пример"
                        onClick={() => handleDelete(id)}
                    />
                </div>
            ))}

            <Button
                icon="add"
                content="Добавить пример"
                variant="plain"
                onClick={handleAdd}
            />
        </div>
    );
}