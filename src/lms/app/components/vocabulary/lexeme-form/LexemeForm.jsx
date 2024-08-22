import { useCallback, useState } from 'react';

import ImageField from 'shared/components/image-field';
import { useUser } from 'shared/hooks/user';
import Storage from 'shared/services/storage';
import { Form, Heading } from 'shared/ui-components';

import { getInitialData, getLabels } from './helpers';
import LexemeExamples from './LexemeExamples';

import styles from './LexemeForm.module.scss';

export default function LexemeForm({
    lexeme,
    onSubmit,
    ...props
}) {
    const user = useUser();

    const initialData = getInitialData(lexeme);

    const [file, setFile] = useState();
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

        if (file) {
            const response = await Storage.upload(file, { path: 'lexemes' });

            data.image = {
                path: response.data.path
            };
        }

        onSubmit(data);
    }, [file, translation, definition, examples, onSubmit]);

    const handleFileChange = useCallback((data, file) => {
        setFile(file);
    }, [setFile]);

    const handleFileDelete = useCallback(async image => {
        if (user.id !== lexeme.createdBy || lexeme.approved) return;

        await Storage.delete(image.path).then(console.log);
        setFile(undefined);
        onSubmit({ image: undefined });
    }, [lexeme, user, onSubmit]);

    const handleTranslationChange = useCallback(e => {
        setTranslation(e.target.value);
    }, [setTranslation]);

    const handleDefinitionChange = useCallback(e => {
        setDefinition(e.target.value);
    }, [setDefinition]);

    const handleExamplesChange = useCallback(examples => {
        setExamples(examples);
    }, [setExamples]);

    const createdByUser = lexeme.createdBy === user.id;
    const labels = getLabels(lexeme.approved);

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

            <ImageField
                className={styles.imageField}
                label="Изображение"
                image={lexeme.image || lexeme.data.image}
                disabled={!createdByUser || lexeme.approved}
                onChange={handleFileChange}
                onDelete={handleFileDelete}
            />

            {lexeme.approved &&
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
                approved={lexeme.approved}
                onChange={handleExamplesChange}
            />
        </Form>
    );
}