import { useCallback, useState } from 'react';

import { Form, Heading } from 'shared/ui-components';

import LexemeExamplesForm from 'lms/components/vocabulary/lexeme-examples-form';

import styles from './LexemeForm.module.scss';

export default function LexemeForm({
    lexeme,
    onSubmit,
    ...props
}) {
    const [translations, setTranslations] = useState(lexeme.translations?.join(', ') ?? '');
    const [definition, setDefinition] = useState(lexeme.definition ?? '');
    const [examples, setExamples] = useState(lexeme.examples);

    const handleSubmit = e => {
        e.preventDefault();

        const formData = {
            translations: translations.split(',').map(item => item.trim()),
            definition: definition,
            examples: examples
        };

        onSubmit(formData);
    };

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
            <Heading
                className={styles.value}
                content={lexeme.value}
                type="h2"
            />

            <Form.Input
                value={translations}
                label="Перевод"
                required
                onChange={handleTranslationChange}
            />

            <Form.Textarea
                label="Объяснение"
                value={definition}
                onChange={handleDefinitionChange}
            />

            <LexemeExamplesForm
                as="div"
                examples={examples}
                onChange={handleExamplesChange}
            />
        </Form>
    );
}