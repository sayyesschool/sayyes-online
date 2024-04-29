import { useCallback, useMemo, useState } from 'react';

import Typography from '@mui/joy/Typography';
import { v4 as uuid } from 'uuid';

import FormDialog from 'shared/components/form-dialog';
import { useForm } from 'shared/hooks/form';
import { Accordion, Button, Flex, Form, IconButton, Surface } from 'shared/ui-components';

import styles from './VocabularyEditModal.module.scss';

// TODO: need to move it to helper
function arrayToKeyedObject(array) {
    return array.reduce((result, { id, text, translation }) => {
        result[`text&${id}`] = text;
        result[`translation&${id}`] = translation;

        return result;
    }, {});
}

export function transformLexemeObject(obj) {
    const { definition, translations, ...rest } = obj;

    const examples = Object.entries(rest)
        .reduce((acc, [key, value]) => {
            const [type, id] = key.split('&');
            if (type === 'text' || type === 'translation') {
                let example = acc.find(ex => ex.id === id);
                if (!example) {
                    example = { id };
                    acc.push(example);
                }
                example[type === 'text' ? 'text' : 'translation'] = value;
            }
            return acc;
        }, []);

    let transformedTranslations = translations;
    if (transformedTranslations) {
        transformedTranslations = transformedTranslations.split(', ').map(t => t.trim());
    }

    return {
        definition,
        translations: transformedTranslations,
        examples
    };
}

export default function VocabularyEditModal({ open, lexeme, onSubmit, onClose, ...props }) {
    const [examples, setExamples] = useState(lexeme.examples);
    const exampleValues = useMemo(() => arrayToKeyedObject(examples), [examples]);
    const translationsString = lexeme.translations?.join(', ') ?? '';
    const defenitionString = lexeme.definition ?? '';

    const { data, handleChange, handleSubmit } = useForm({
        values: {
            ...exampleValues,
            'translations*': translationsString,
            'definition': defenitionString
        },
        dataToSubmit: { examples },
        onSubmit
    }, [examples]);

    const addExample = useCallback(() => {
        setExamples([...examples, {
            id: uuid(),
            text: '',
            translation: ''
        }]);
    }, [examples]);

    const onChange = useCallback(e => {
        const { name, value } = e.target;
        const [fieldName, id] = name.split('&');

        setExamples(prevExamples =>
            prevExamples.map(ex =>
                ex.id === id
                    ? {
                        ...ex,
                        [fieldName]: value
                    }
                    : ex
            )
        );
        handleChange(e);
    }, [handleChange]);

    const deleteExample = useCallback(id => {
        setExamples(prevExamples => prevExamples.filter(ex => ex.id !== id));
    }, []);

    return (
        <FormDialog
            title="Редактирование"
            open={open}
            onClose={onClose}
        >
            <Form onSubmit={handleSubmit} {...props}>
                <Typography className={styles.value}>{lexeme.value}</Typography>

                <Accordion
                    items={[
                        {
                            key: 'translations',
                            header: 'Перевод',
                            content: (
                                <Form.Input
                                    name="translations"
                                    value={data.translations.value}
                                    required
                                    onChange={handleChange}
                                />
                            )
                        },
                        {
                            key: 'definition',
                            header: 'Объяснение',
                            content: (
                                <Form.Input
                                    name="definition"
                                    value={data.definition.value}
                                    onChange={handleChange}
                                />
                            )
                        },
                        {
                            key: 'examples',
                            header: 'Примеры',
                            content: (
                                <Surface>
                                    {examples.map(item => (
                                        <Flex key={item.id} className={styles.example}>
                                            <Surface className={styles.exampleInputs}>
                                                {['text', 'translation'].map(type => (
                                                    <Form.Input
                                                        key={`${type}&${item.id}`}
                                                        name={`${type}&${item.id}`}
                                                        value={data[`${type}&${item.id}`]?.value ?? ''}
                                                        required
                                                        onChange={onChange}
                                                    />
                                                ))}
                                            </Surface>

                                            <IconButton
                                                size="lg"
                                                variant="plain"
                                                color="neutral"
                                                icon="delete"
                                                title='Удалить пример'
                                                onClick={() => deleteExample(item.id)}
                                            />
                                        </Flex>
                                    ))}

                                    <Button content="Добавить пример" onClick={addExample} />
                                </Surface>
                            )
                        }
                    ]}
                />
            </Form>
        </FormDialog>
    );
}