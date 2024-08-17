import { useForm } from 'shared/hooks/form';
import { Button, Form } from 'shared/ui-components';

import styles from './LexemeShortForm.module.scss';

const getDefaultData = ({
    value = '',
    translation = ''
} = {}) => ({
    'value*': value,
    'translation*': translation
});

// TODO: этот компонент очень похож на VocabularySimpleForm, возможно, стоит их объединить
export default function LexemeShortForm({
    lexeme,
    numberOfLexemes,
    onSubmit
}) {
    const { data, handleChange, handleSubmit } = useForm({
        values: getDefaultData(lexeme),
        onSubmit
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
                name="translation"
                value={data.translation.value}
                placeholder="Перевод"
                autoComplete="off"
                onChange={handleChange}
            />

            <Button type="submit" content="Добавить" />
        </Form>
    );
}