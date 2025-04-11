import { useCallback, useState } from 'react';

import { Form } from 'shared/ui-components';

import styles from './VocabularyForm.module.scss';

export default function VocabularyForm({
    vocabulary,
    onSubmit,
    submit,
    ...props
}) {
    const [title, setTitle] = useState(vocabulary.title ?? '');
    const [description, setDescription] = useState(vocabulary.description ?? '');

    const handleSubmit = useCallback(() => {
        onSubmit(vocabulary.id, {
            title,
            description
        });
    }, [title, description, vocabulary?.id, onSubmit]);

    const handleTitleChange = useCallback(e => {
        setTitle(e.target.value);
    }, [setTitle]);

    const handleDescriptionChange = useCallback(e => {
        setDescription(e.target.value);
    }, [setDescription]);

    return (
        <Form
            className={styles.root}
            onSubmit={handleSubmit}
            {...props}
        >
            <Form.Input
                value={title}
                label="Заголовок"
                required
                onChange={handleTitleChange}
            />

            <Form.Textarea
                label="Описание"
                value={description}
                onChange={handleDescriptionChange}
            />
        </Form>
    );
}