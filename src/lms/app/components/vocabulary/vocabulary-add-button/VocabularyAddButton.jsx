import { useCallback, useState } from 'react';

import { useForm } from 'shared/hooks/form';
import { Button, Form, PopoverBtn } from 'shared/ui-components';

import styles from './VocabularyAddButton.module.scss';

export default function VocabularyAddButton({
    numberOfVocabularies,
    onAddVocabulary
}) {
    const [anchorEl, setAnchorEl] = useState(null);

    const onSubmit = useCallback(data => {
        onAddVocabulary(data).finally(() => setAnchorEl(null));
    }, [onAddVocabulary]);

    const { data, handleChange, handleSubmit } = useForm({
        values: {
            'title*': '',
            'description*': ''
        },
        onSubmit
    }, [numberOfVocabularies]);

    return (
        <PopoverBtn
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            className={styles.root}
        >
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
        </PopoverBtn>
    );
}