import { useCallback, useState } from 'react';

import Typography from '@mui/joy/Typography';
import { v4 as uuid } from 'uuid';

import FormDialog from 'shared/components/form-dialog';
import { Accordion, Button, Flex, Form, IconButton, Surface } from 'shared/ui-components';

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
                <Typography className={styles.value}>{lexeme.value}</Typography>

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
                                <Surface>
                                    {examples.map(({ id, text, translation }) => (
                                        <Flex key={id} className={styles.example}>
                                            <Surface className={styles.exampleInputs}>
                                                <Form.Input
                                                    value={text}
                                                    required
                                                    onChange={e =>
                                                        handleExampleChange(id, 'text', e.target.value)
                                                    }
                                                />

                                                <Form.Input
                                                    value={translation}
                                                    required
                                                    onChange={e =>
                                                        handleExampleChange(id, 'translation', e.target.value)
                                                    }
                                                />
                                            </Surface>

                                            <IconButton
                                                size="lg"
                                                variant="plain"
                                                color="neutral"
                                                icon="delete"
                                                title="Удалить пример"
                                                onClick={() => handleDeleteExample(id)}
                                            />
                                        </Flex>
                                    ))}

                                    <Button content="Добавить пример" onClick={handleAddExample} />
                                </Surface>
                            )
                        }
                    ]}
                />
            </Form>
        </FormDialog>
    );
}