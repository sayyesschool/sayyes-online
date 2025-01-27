import { useCallback, useState } from 'react';

import ImageField from 'shared/components/image-field';
import Storage from 'shared/services/storage';
import { Button, Form } from 'shared/ui-components';

import Lexeme from 'cms/components/dictionary/lexeme';

import LexemeExamples from './LexemeExamples';

import styles from './LexemesForm.module.scss';

export default function LexemesForm({
    user,
    lexemes,
    withNotifications,
    onSubmit,
    ...props
}) {
    const [file, setFile] = useState();
    const [data, setData] = useState({
        value: '',
        translation: '',
        definition: '',
        examples: []
    });
    const [additionalData, setAdditionalData] = useState(
        lexemes.reduce((object, { id, translation, definition, examples }) => {
            object[id] = { translation, definition, examples };

            return object;
        }, {})
    );
    const { value, translation, definition, examples } = data;
    const inputs = [
        {
            component: Form.Input,
            id: 'value',
            label: 'Лексема',
            required: true,
            value
        },
        {
            component: Form.Input,
            id: 'translation',
            label: 'Переводы',
            required: true,
            value: translation
        },
        {
            component: Form.Textarea,
            id: 'definition',
            label: 'Определение',
            value: definition
        }
    ];

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
            new: {
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

    return (
        <Form
            className={styles.root}
            onSubmit={handleSubmit}
            {...props}
        >
            {lexemes.map(lexeme => {
                const changeAdditionalData = data => {
                    setAdditionalData(prev => ({ ...prev, [lexeme.id]: data }));
                };

                return (
                    <Lexeme
                        key={lexeme.id}
                        user={user}
                        additionalData={additionalData[lexeme.id]}
                        lexeme={lexeme}
                        onChange={changeAdditionalData}
                    />
                );
            })}

            <hr />

            <ImageField
                className={styles.imageField}
                label="Изображение"
                image={undefined}
                onChange={handleFileChange}
                onDelete={handleFileDelete}
            />

            {inputs.map(({ component: Component, id, label, value, required }) => (
                <Component
                    key={id}
                    label={label}
                    value={value}
                    required={required}
                    onChange={e => setData(prev => ({ ...prev, [id]: e.target.value }))}
                />
            ))}

            <LexemeExamples
                examples={examples}
                onChange={handleExamplesChange}
            />

            <Button content="Утвердить" type="submit" />
        </Form>
    );
}