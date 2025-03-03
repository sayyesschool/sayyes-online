import { useCallback, useState } from 'react';

import { Form, Heading } from 'shared/ui-components';

import { getInitialData, getLabels } from './helpers';
import LexemeExamples from './LexemeExamples';

import styles from './LexemeForm.module.scss';

export default function LexemeForm({
    lexeme,
    onSubmit,
    ...props
}) {
    const initialData = getInitialData(lexeme);

    const [translation, setTranslation] = useState(initialData.translation);
    const [definition, setDefinition] = useState(initialData.definition ?? '');
    const [examples, setExamples] = useState(initialData.examples ?? []);

    const handleSubmit = useCallback(async event => {
        event.preventDefault();

        const data = {
            translation,
            definition,
            examples
        };

        onSubmit(data);
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

    const labels = getLabels(lexeme.isApproved);

    return (
        <Form
            className={styles.root}
            onSubmit={handleSubmit}
            {...props}
        >
            <Heading
                content={lexeme.value}
                type="h1"
            />

            {lexeme.isApproved &&
                <>
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
                </>
            }

            <Form.Input
                value={translation}
                label={labels.translation}
                onChange={handleTranslationChange}
            />

            <Form.Textarea
                label={labels.definition}
                value={definition}
                onChange={handleDefinitionChange}
            />

            <LexemeExamples
                examples={examples}
                approved={lexeme.isApproved}
                onChange={handleExamplesChange}
            />
        </Form>
    );
}