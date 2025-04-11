import { useState } from 'react';

import { useForm } from 'shared/hooks/form';
import { Button, Form } from 'shared/ui-components';

import styles from './VocabularySimpleForm.module.scss';

export default function VocabularySimpleForm({
    numberOfVocabularies,
    onSubmit
}) {
    const [isLoading, setLoading] = useState(false);

    const { data, handleChange, handleSubmit } = useForm({
        values: {
            'title*': '',
            'description': ''
        },
        onSubmit: data => {
            setLoading(true);

            return onSubmit(data)
                .finally(() => setLoading(false));
        }
    }, [numberOfVocabularies]);

    return (
        <Form className={styles.root} onSubmit={handleSubmit}>
            <Form.Input
                className={styles.input}
                name="title"
                value={data.title.value}
                placeholder="Название"
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

            <Button
                type="submit"
                content="Создать"
                disabled={isLoading}
                loading={isLoading}
            />
        </Form>
    );
}