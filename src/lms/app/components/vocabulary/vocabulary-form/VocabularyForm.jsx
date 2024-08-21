import { useCallback, useState } from 'react';

import { Form, Heading } from 'shared/ui-components';

import styles from './VocabularyForm.module.scss';

export default function VocabularyForm({
    vocabulary,
    onSubmit,
    submit,
    ...props
}) {
    const [title, setTitle] = useState(vocabulary.title ?? '');
    const [description, setDescription] = useState(vocabulary.description ?? '');

    const handleSubmit = e => {
        e.preventDefault();

        const formData = {
            title,
            description
        };

        submit(vocabulary.id, formData);
    };

    const handleTitleChange = useCallback(e => {
        setTitle(e.target.value);
    }, [setTitle]);

    const handleDescriptionChange = useCallback(e => {
        setDescription(e.target.value);
    }, [setDescription]);

    return (
        <Form className={styles.root} onSubmit={handleSubmit} {...props}>
            <Heading
                className={styles.value}
                content={'Редактирование словаря'}
                type="h2"
            />

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