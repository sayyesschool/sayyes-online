import { useCallback, useState } from 'react';

import { v4 as uuid } from 'uuid';

import FormDialog from 'shared/components/form-dialog';
import { Accordion, Avatar, Button, Flex, Form, Heading, IconButton } from 'shared/ui-components';

import styles from './VocabularyEditModal.module.scss';

export default function VocabularyEditModal({ open, lexeme, onSubmit, onClose, ...props }) {
    const [translations, setTranslations] = useState(lexeme.translations?.join(', ') ?? '');
    const [definition, setDefinition] = useState(lexeme.definition ?? '');
    const [examples, setExamples] = useState(lexeme.examples);

    const handleTranslationChange = useCallback(e => {
        setTranslations(e.target.value);
    }, [setTranslations]);

    const handleDefinitionChange = e => {
        setDefinition(e.target.value);
    };

    const handleExampleChange = (id, field, value) => {
        const updatedExamples = examples.map(example =>
            example.id === id ? { ...example, [field]: value } : example
        );
        setExamples(updatedExamples);
    };

    const handleDeleteExample = id => {
        const updatedExamples = examples.filter(example => example.id !== id);
        setExamples(updatedExamples);
    };

    const handleAddExample = useCallback(() => {
        const newExample = {
            id: uuid(),
            text: '',
            translation: ''
        };
        setExamples(prevExamples => [...prevExamples, newExample]);
    }, [setExamples]);

    const handleSubmit = e => {
        e.preventDefault();

        const formData = {
            translations: translations.split(',').map(item => item.trim()),
            definition: definition,
            examples: examples
        };

        onSubmit(formData);
    };

    return (
        <FormDialog title="Редактирование" open={open} onClose={onClose}>
            <Form onSubmit={handleSubmit} {...props}>
                <Heading
                    className={styles.value}
                    content={lexeme.value}
                    type="h2"
                />

                <Accordion
                    items={[
                        {
                            key: 'translations',
                            header: 'Перевод',
                            content: (
                                <Form.Input
                                    value={translations}
                                    required
                                    onChange={handleTranslationChange}
                                />
                            )
                        },
                        {
                            key: 'definition',
                            header: 'Объяснение',
                            content: (
                                <Form.Input
                                    value={definition}
                                    onChange={handleDefinitionChange}
                                />
                            )
                        },
                        {
                            key: 'examples',
                            header: 'Примеры',
                            content: (
                                <Flex gap="small" column>
                                    {examples.map(({ id, text, translation }, i) => (
                                        <div key={id} className={styles.example}>
                                            <Form.Input
                                                value={text}
                                                variant="plain"
                                                placeholder="Пример"
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
                                                        onClick={() => handleDeleteExample(id)}
                                                    />
                                                }
                                                required
                                                onChange={e =>
                                                    handleExampleChange(id, 'text', e.target.value)
                                                }
                                            />

                                            <Form.Input
                                                className={styles.exampleTranslation}
                                                value={translation}
                                                variant="plain"
                                                size="sm"
                                                placeholder="Перевод"
                                                required
                                                onChange={e =>
                                                    handleExampleChange(id, 'translation', e.target.value)
                                                }
                                            />
                                        </div>
                                    ))}

                                    <Button content="Добавить пример" onClick={handleAddExample} />
                                </Flex>
                            )
                        }
                    ]}
                />
            </Form>
        </FormDialog>
    );
}