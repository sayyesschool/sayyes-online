import { useForm } from 'shared/hooks/form';
import { Button, Form } from 'shared/ui-components';

import styles from './LexemeShortForm.module.scss';

const getDefaultData = ({
    value = '',
    translations = []
} = {}) => ({
    'value*': value,
    'translations*': translations.join(', ')
});

export default function LexemeShortForm({
    lexeme,
    numberOfLexemes,
    onSubmit
}) {
    const { data, handleChange, handleSubmit } = useForm({
        values: getDefaultData(lexeme),
        onSubmit: data => {
            const translations = data.translations.split(',').map(item => item.trim());

            onSubmit({ ...data, translations });
        }
    }, [numberOfLexemes]);

    return (
        <Form className={styles.root} onSubmit={handleSubmit}>
            <Form.Input
                className={styles.input}
                name="value"
                value={data.value.value}
                placeholder="Слово"
                autoComplete="off"
                onChange={handleChange}
            />

            <Form.Input
                className={styles.input}
                name="translations"
                value={data.translations.value}
                placeholder="Перевод"
                autoComplete="off"
                onChange={handleChange}
            />

            <Button type="submit" content="Добавить" />
        </Form>
    );
}