import { useCallback, useState } from 'react';

import { useForm } from 'shared/hooks/form';
import { Button, Form, PopoverBtn } from 'shared/ui-components';

import styles from './LexemeAddButton.module.scss';

export default function LexemeAddButton({
    numberOfLexemes,
    onAddLexeme
}) {
    const [anchorEl, setAnchorEl] = useState(null);

    const onSubmit = useCallback(data => {
        onAddLexeme(data).finally(() => setAnchorEl(null));
    }, [onAddLexeme]);

    const { data, handleChange, handleSubmit } = useForm({
        values: {
            'value*': '',
            'translations*': ''
        },
        onSubmit
    }, [numberOfLexemes]);

    return (
        <PopoverBtn anchorEl={anchorEl} setAnchorEl={setAnchorEl}>
            <Form className={styles.form} onSubmit={handleSubmit}>
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
        </PopoverBtn>
    );
}