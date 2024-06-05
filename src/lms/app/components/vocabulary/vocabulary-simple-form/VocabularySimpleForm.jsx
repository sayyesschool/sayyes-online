import { useCallback } from 'react';

import { useForm } from 'shared/hooks/form';
import { Button, Form } from 'shared/ui-components';

import styles from './VocabularySimpleForm.module.scss';

export default function VocabularySimpleForm({
    numberOfVocabularies,
    onAddVocabulary
}) {
    const onSubmit = useCallback(data => {
        onAddVocabulary(data);
    }, [onAddVocabulary]);

    const { data, handleChange, handleSubmit } = useForm({
        values: {
            'title*': '',
            'description*': ''
        },
        onSubmit
    }, [numberOfVocabularies]);

    return (
        <Form className={styles.form} onSubmit={handleSubmit}>
            <Form.Input
                className={styles.input}
                name="title"
                value={data.title.value}
                placeholder="Словарь"
                autoComplete="off"
                onChange={handleChange}
            />

            <Form.Input
                className={styles.input}
                name="description"
                value={data.description.value}
                placeholder="Описание"
                autoComplete="off"
                onChange={handleChange}
            />

            <Button type="submit" content="Добавить" />
        </Form>
    );
}