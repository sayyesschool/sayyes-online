import { useCallback, useState } from 'react';

import { Form, Heading } from 'shared/ui-components';

import LexemeExamplesForm from 'lms/components/vocabulary/lexeme-examples-form';

import styles from './LexemeForm.module.scss';

// Move to utils???
const getTranslationsString = translations => translations?.join(', ') ?? '';

const getInitialData = lexeme => {
    const { approved, record = {}, translations, definition, examples } = lexeme;

    return approved ? record?.data : { translations, definition, examples };
};

const getLabels = approved => {
    return approved
        ? { translations: 'Мои переводы', definition: 'Моё определение' }
        : { translations: 'Переводы', definition: 'Определение' };
};

export default function LexemeForm({ lexeme, onSubmit, ...props }) {
    const initialData = getInitialData(lexeme);
    const labels = getLabels(lexeme.approved);

    const [translations, setTranslations] = useState(getTranslationsString(initialData.translations));
    const [definition, setDefinition] = useState(initialData.definition ?? '');
    const [examples, setExamples] = useState(initialData.examples ?? []);

    const handleSubmit = useCallback(e => {
        e.preventDefault();

        onSubmit({
            translations: translations.split(',').map(item => item.trim()),
            definition,
            examples
        });
    }, [translations, definition, examples, onSubmit]);

    const handleTranslationChange = useCallback(e => {
        setTranslations(e.target.value);
    }, [setTranslations]);

    const handleDefinitionChange = useCallback(e => {
        setDefinition(e.target.value);
    }, [setDefinition]);

    const handleExamplesChange = useCallback(examples => {
        setExamples(examples);
    }, [setExamples]);

    return (
        <Form className={styles.root} onSubmit={handleSubmit} {...props}>
            <Heading className={styles.value} content={lexeme.value} type="h2" />

            {lexeme.approved && (
                <>
                    <Form.Input
                        label="Переводы"
                        value={getTranslationsString(lexeme.translations)}
                        disabled
                    />

                    <Form.Textarea
                        label="Определение"
                        value={lexeme.definition}
                        disabled
                    />
                </>
            )}

            <Form.Input
                value={translations}
                label={labels.translations}
                required
                onChange={handleTranslationChange}
            />

            <Form.Textarea
                label={labels.definition}
                value={definition}
                onChange={handleDefinitionChange}
            />

            <LexemeExamplesForm
                as="div"
                approved={lexeme.approved}
                examples={examples}
                onChange={handleExamplesChange}
            />
        </Form>
    );
}