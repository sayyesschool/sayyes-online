import { useCallback, useState } from 'react';

import ImageField from 'shared/components/image-field';
import { lexemeKindOptions, lexemeTypeOptions } from 'shared/data/lexeme';
import Storage from 'shared/services/storage';
import { Form } from 'shared/ui-components';

import Lexeme from 'cms/components/dictionary/lexeme';
import { LexemeExamples } from 'cms/components/dictionary/lexeme-approve-form';

import styles from './LexemesMergeForm.module.scss';

export default function LexemesMergeForm({
    userId,
    lexemes = [],
    initialLexeme,
    onSubmit,
    ...props
}) {
    const [file, setFile] = useState();
    const [data, setData] = useState({
        value: initialLexeme?.value || '',
        translation: initialLexeme?.translation || '',
        definition: initialLexeme?.definition || '',
        type: initialLexeme?.type || '',
        kind: initialLexeme?.kind || '',
        examples: lexemes.flatMap(l => l.examples) || []
    });
    const [additionalData, setAdditionalData] = useState(
        lexemes.reduce((acc, { id, translation, definition, examples }) => {
            acc[id] = { translation, definition, examples };

            return acc;
        }, {})
    );

    const { value, translation, definition, type, kind, examples } = data;

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
            lexemeIds: lexemes.map(lexeme => lexeme.id),
            newLexemeData: {
                value,
                translation,
                definition,
                examples
            },
            oldLexemesDataById: additionalData
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
        const { name, value } = event.target;

        setData(prev => ({ ...prev, [name]: value }));
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
                        readOnly={!lexeme.isPending || lexeme?.createdBy === userId}
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
                label="Лексема"
                name="value"
                value={value}
                required
                onChange={handleChange}
            />

            <Form.Input
                label="Переводы"
                name="translation"
                value={translation}
                required
                onChange={handleChange}
            />

            <Form.Textarea
                label="Определение"
                name="definition"
                value={definition}
                onChange={handleChange}
            />

            <Form.Select
                label="Тип"
                name="type"
                value={type}
                options={lexemeTypeOptions}
                onChange={handleChange}
            />

            <Form.Select
                label="Вид"
                name="kind"
                value={kind}
                options={lexemeKindOptions}
                onChange={handleChange}
            />

            <LexemeExamples
                examples={examples}
                onChange={handleExamplesChange}
            />
        </Form>
    );
}