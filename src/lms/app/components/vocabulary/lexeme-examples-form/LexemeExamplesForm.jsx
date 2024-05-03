import { useCallback } from 'react';

import { v4 as uuid } from 'uuid';

import { Avatar, Button, Flex, Form, Heading, IconButton } from 'shared/ui-components';

import styles from './LexemeExamplesForm.module.scss';

export default function LexemeExamplesForm({
    examples,
    onChange,
    ...props
}) {
    const handleAdd = useCallback(() => {
        const newExample = {
            id: uuid(),
            text: '',
            translation: ''
        };
        onChange(prevExamples => [...prevExamples, newExample]);
    }, [onChange]);

    const handleChange = useCallback((id, field, value) => {
        const updatedExamples = examples.map(example =>
            example.id === id ? { ...example, [field]: value } : example
        );
        onChange(updatedExamples);
    }, [examples, onChange]);

    const handleDelete = useCallback(id => {
        const updatedExamples = examples.filter(example => example.id !== id);
        onChange(updatedExamples);
    }, [examples, onChange]);

    return (
        <Form className={styles.root} {...props}>
            <Heading
                content="Примеры"
                type="title-sm"
            />

            <Flex gap="small" column>
                {examples.map(({ id, text, translation }, i) => (
                    <div key={id} className={styles.example}>
                        <Form.Input
                            placeholder="Пример"
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
                            onChange={e =>
                                handleChange(id, 'text', e.target.value)
                            }
                        />

                        <Form.Input
                            className={styles.exampleTranslation}
                            placeholder="Перевод"
                            value={translation}
                            variant="plain"
                            size="sm"
                            required
                            onChange={e =>
                                handleChange(id, 'translation', e.target.value)
                            }
                        />
                    </div>
                ))}

                <Button icon="add" content="Добавить пример" variant="plain" onClick={handleAdd} />
            </Flex>
        </Form>
    );
}