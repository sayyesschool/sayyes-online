import { useCallback, useState } from 'react';

import ImageField from 'shared/components/image-field';
import { lexemeKindOptions, lexemeTypeOptions } from 'shared/data/lexeme';
import Storage from 'shared/services/storage';
import { Form } from 'shared/ui-components';

import LexemeFormExamples from './LexemeFormExamples';

import styles from './LexemeForm.module.scss';

export default function LexemeForm({
    lexeme,
    userId,
    disabled,
    readOnly,
    onMatch,
    onSubmit,
    ...props
}) {
    const [file, setFile] = useState();
    const [data, setData] = useState({
        value: lexeme.value,
        translation: lexeme.translation,
        definition: lexeme.definition ?? '',
        examples: lexeme.examples ?? []
    });

    const handleSubmit = useCallback(async event => {
        event.preventDefault();

        if (file) {
            const response = await Storage.upload(file, { path: 'lexemes' });

            data.image = {
                path: response.data.path
            };
        }

        return onSubmit(data);
    }, [data, file, onSubmit]);

    const handleChange = useCallback(event => {
        const { name, value } = event.target;

        setData(prev => ({ ...prev, [name]: value }));
    }, []);

    const handleFileChange = useCallback((data, file) => {
        setFile(file);
    }, [setFile]);

    const handleFileDelete = useCallback(async image => {
        await Storage.delete(image.path).then(console.log);

        setFile(undefined);

        return onSubmit({ image: undefined });
    }, [onSubmit]);

    const handleExamplesChange = useCallback(examples => {
        setData(prev => ({ ...prev, examples }));
    }, []);

    return (
        <Form
            className={styles.root}
            onSubmit={handleSubmit}
            {...props}
        >
            <ImageField
                name="image"
                label="Изображение"
                image={lexeme.image || lexeme.data?.image}
                disabled={disabled}
                readOnly={readOnly}
                onChange={handleFileChange}
                onDelete={handleFileDelete}
            />

            <Form.Input
                label="Значение"
                name="value"
                value={data.value}
                disabled={disabled}
                readOnly={readOnly}
                required
                onChange={handleChange}
            />

            <Form.Input
                label="Перевод"
                name="translation"
                value={data.translation}
                disabled={disabled}
                readOnly={readOnly}
                required
                onChange={handleChange}
            />

            <Form.Input
                label="Определение"
                name="definition"
                value={data.definition}
                disabled={disabled}
                readOnly={readOnly}
                required
                onChange={handleChange}
            />

            <Form.Select
                label="Тип"
                name="type"
                value={lexeme.type}
                options={lexemeTypeOptions}
                disabled={disabled}
                readOnly={readOnly}
                onChange={handleChange}
            />

            <Form.Select
                label="Вид"
                name="kind"
                value={lexeme.kind}
                options={lexemeKindOptions}
                disabled={disabled}
                readOnly={readOnly}
                onChange={handleChange}
            />

            <LexemeFormExamples
                examples={data.examples}
                disabled={disabled}
                readOnly={readOnly}
                onChange={handleExamplesChange}
            />
        </Form>
    );
}