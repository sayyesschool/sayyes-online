import { useCallback, useState } from 'react';

import { Form, Heading } from 'shared/ui-components';

import { getInitialData, getLabels } from './helpers';
import LexemeExamplesForm from './LexemeExamplesForm';

import styles from './LexemeForm.module.scss';

export default function LexemeForm({ lexeme, onSubmit, ...props }) {
    const initialData = getInitialData(lexeme);
    const labels = getLabels(lexeme.approved);

    const [translation, setTranslation] = useState(initialData.translation);
    const [definition, setDefinition] = useState(initialData.definition ?? '');
    const [examples, setExamples] = useState(initialData.examples ?? []);

    const handleSubmit = useCallback(e => {
        e.preventDefault();

        onSubmit({
            translation,
            definition,
            examples
        });
    }, [translation, definition, examples, onSubmit]);

    const handleTranslationChange = useCallback(e => {
        setTranslation(e.target.value);
    }, [setTranslation]);

    const handleDefinitionChange = useCallback(e => {
        setDefinition(e.target.value);
    }, [setDefinition]);

    const handleExamplesChange = useCallback(examples => {
        setExamples(examples);
    }, [setExamples]);

    return (
        <Form
            className={styles.root} onSubmit={handleSubmit}
            {...props}
        >
            <Heading
                className={styles.value} content={lexeme.value}
                type="h2"
            />

            {lexeme.approved && <>
                <Form.Input
                    label="Перевод"
                    value={lexeme.translation}
                    disabled
                />

                <Form.Textarea
                    label="Определение"
                    value={lexeme.definition}
                    disabled
                />
            </>}

            <Form.Input
                value={translation}
                label={labels.translation}
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
                examples={examples}
                approved={lexeme.approved}
                onChange={handleExamplesChange}
            />
        </Form>
    );
}