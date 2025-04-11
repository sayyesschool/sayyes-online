import { useEffect, useRef, useState } from 'react';

import { useForm } from 'shared/hooks/form';
import { Button, Form } from 'shared/ui-components';

import styles from './LexemeShortForm.module.scss';

const getDefaultData = ({
    value = '',
    translation = '',
    definition = ''
} = {}) => ({
    'value*': value,
    'translation': translation,
    'definition': definition
});

export default function LexemeShortForm({
    lexeme,
    numberOfLexemes,
    onSubmit
}) {
    const [isLoading, setLoading] = useState(false);

    const { data, handleChange, handleSubmit } = useForm({
        values: getDefaultData(lexeme),
        onSubmit: data => {
            setLoading(true);

            return onSubmit(data)
                .finally(() => setLoading(false));
        }
    }, [numberOfLexemes]);

    const valueInputRef = useRef();

    useEffect(() => {
        valueInputRef.current?.firstChild?.focus();
    }, []);

    return (
        <Form className={styles.root} onSubmit={handleSubmit}>
            <Form.Input
                ref={valueInputRef}
                className={styles.input}
                placeholder="Слово"
                name="value"
                value={data.value.value}
                autoComplete="off"
                onChange={handleChange}
            />

            <Form.Input
                className={styles.input}
                placeholder="Перевод"
                name="translation"
                value={data.translation.value}
                autoComplete="off"
                onChange={handleChange}
            />

            <Form.Input
                className={styles.input}
                placeholder="Значение"
                name="definition"
                value={data.definition.value}
                autoComplete="off"
                onChange={handleChange}
            />

            <Button
                type="submit"
                content="Добавить"
                disabled={isLoading}
                loading={isLoading}
            />
        </Form>
    );
}