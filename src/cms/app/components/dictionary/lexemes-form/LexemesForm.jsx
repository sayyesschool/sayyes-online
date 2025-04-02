import { useCallback, useState } from 'react';

import ImageField from 'shared/components/image-field';
import Storage from 'shared/services/storage';
import { Button, Form } from 'shared/ui-components';

import Lexeme from 'cms/components/dictionary/lexeme';
import { LexemeExamples } from 'cms/components/dictionary/lexeme-form';

import styles from './LexemesForm.module.scss';

export default function LexemesForm({
    userId,
    lexemes = [],
    initialLexeme,
    isPending,
    onSubmit,
    ...props
}) {
    const [data, setData] = useState({
        value: initialLexeme?.value || '',
        translation: initialLexeme?.translation || '',
        definition: initialLexeme?.definition || '',
        examples: lexemes.flatMap(l => l.examples) || []
    });
    const [file, setFile] = useState();
    const [additionalData, setAdditionalData] = useState(
        lexemes.reduce((acc, { id, translation, definition, examples }) => {
            acc[id] = { translation, definition, examples };

            return acc;
        }, {})
    );
    const { value, translation, definition, examples } = data;

    const handleLexemeChange = useCallback((lexemeId, data) => {
        setAdditionalData(prev => ({ ...prev, [lexemeId]: data }));
    }, []);

    const handleExamplesChange = useCallback(examples => {
        setData(prev => ({ ...prev, examples }));
    }, []);

    const handleFileChange = useCallback((data, file) => {
        setFile(file);
    }, [setFile]);

    const handleFileDelete = useCallback(async image => {
        await Storage.delete(image.path).then(console.log);
        setFile(undefined);
        onSubmit({ image: undefined });
    }, [onSubmit]);

    const handleSubmit = useCallback(async event => {
        event.preventDefault();

        const data = {
            newLexemeData: {
                value,
                translation,
                definition,
                examples
            },
            merge: additionalData,
            deletedLexemeIds: lexemes.map(lexeme => lexeme.id)
        };

        if (file) {
            const response = await Storage.upload(file, { path: 'lexemes' });

            data.image = {
                path: response.data.path
            };
        }

        onSubmit(data);
    }, [value, translation, definition, examples, additionalData, lexemes, file, onSubmit]);

    const handleChange = useCallback(event => {
        const { id, value } = event.target;

        setData(prev => ({ ...prev, [id]: value }));
    }, []);

    return (
        <Form
            className={styles.root}
            onSubmit={handleSubmit}
            {...props}
        >
            <div className={styles.lexemes}>
                {lexemes.map(lexeme =>
                    <Lexeme
                        key={lexeme.id}
                        className={styles.lexeme}
                        lexeme={lexeme}
                        readOnly={!isPending || lexeme?.createdBy === userId || lexeme.publishStatus !== 'pending'}
                        onChange={handleLexemeChange}
                    />
                )}
            </div>

            <hr />

            <ImageField
                className={styles.imageField}
                label="Изображение"
                image={undefined}
                onChange={handleFileChange}
                onDelete={handleFileDelete}
            />

            <Form.Input
                id="value"
                label="Лексема"
                value={value}
                required
                onChange={handleChange}
            />

            <Form.Input
                id="translation"
                label="Переводы"
                value={translation}
                required
                onChange={handleChange}
            />

            <Form.Textarea
                id="definition"
                label="Определение"
                value={definition}
                onChange={handleChange}
            />

            <LexemeExamples
                examples={examples}
                onChange={handleExamplesChange}
            />

            <Button content="Утвердить" type="submit" />
        </Form>
    );
}