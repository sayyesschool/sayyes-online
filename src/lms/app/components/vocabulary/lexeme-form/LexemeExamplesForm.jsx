import { useCallback } from 'react';

import { v4 as uuid } from 'uuid';

import { Avatar, Button, Flex, Form, Heading, IconButton, Surface } from 'shared/ui-components';

import styles from './LexemeExamplesForm.module.scss';

export default function LexemeExamplesForm({ approved, examples, onChange, ...props }) {
    const headingText = approved ? 'Мои примеры' : 'Примеры';

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
        <Surface className={styles.root} {...props}>
            <Heading content={headingText} type="title-sm" />

            <Flex gap="small" column>
                {examples.map(({ id, text, translation }, i) => (
                    <div key={id} className={styles.example}>
                        <Form.Input
                            placeholder="Пример"
                            name="text"
                            value={text}
                            variant="plain"
                            start={
                                <Avatar content={i + 1} size="sm" />
                            }
                            end={
                                <IconButton
                                    size="sm"
                                    variant="plain"
                                    color="neutral"
                                    icon="delete"
                                    title="Удалить пример"
                                    onClick={() => handleDelete(id)}
                                />
                            }
                            required
                            onChange={e =>  handleChange(id, e)}
                        />

                        <Form.Input
                            className={styles.exampleTranslation}
                            placeholder="Перевод"
                            name="translation"
                            value={translation}
                            variant="plain"
                            size="sm"
                            required
                            onChange={e => handleChange(id, e)}
                        />
                    </div>
                ))}

                <Button
                    icon="add"
                    content="Добавить пример"
                    variant="plain"
                    onClick={handleAdd}
                />
            </Flex>
        </Surface>
    );
}