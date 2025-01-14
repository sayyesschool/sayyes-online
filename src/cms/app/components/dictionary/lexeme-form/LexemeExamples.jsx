import { useCallback, useState } from 'react';

import { v4 as uuid } from 'uuid';

import {
    Avatar,
    Button,
    Checkbox,
    Flex,
    Form,
    Heading,
    IconButton,
    Surface
} from 'shared/ui-components';

import styles from './LexemeExamples.module.scss';

export default function LexemeExamples({
    isSending,
    examples,
    existingExamples,
    additionalExamples,
    setAdditionalExamples,
    onChange,
    ...props
}) {
    const [allExamples, setAllExamples] = useState(examples);

    const handleAdd = useCallback(() => {
        const newExample = {
            id: uuid(),
            text: '',
            translation: ''
        };

        setAllExamples([...allExamples, newExample]);
        onChange([...examples, newExample]);
    }, [allExamples, examples, onChange, setAllExamples]);

    const handleChange = useCallback((id, { target }) => {
        const { name, value } = target;

        setAllExamples(prev => prev.map(ex => ex.id === id ? { ...ex, [name]: value } : ex));
        onChange(examples.map(ex => ex.id === id ? { ...ex, [name]: value } : ex));
    }, [examples, onChange]);

    const handleDelete = useCallback(id => {
        onChange(examples.filter(ex => ex.id !== id));
        setAllExamples(prev => prev.map(ex => ex.id === id ? { ...ex, deleted: true } : ex));
    }, [examples, onChange, setAllExamples]);

    const toggleCheckbox = useCallback(id => {
        const currentLexeme = existingExamples.find(ex => ex.id === id);
        const isAlreadyAdded = additionalExamples.find(ex => ex.id === id);

        const examples = isAlreadyAdded
            ? additionalExamples.filter(ex => ex.id !== id)
            : [...additionalExamples, currentLexeme];

        setAdditionalExamples(examples);
    }, [additionalExamples, existingExamples, setAdditionalExamples]);

    const shouldShowNotification = useCallback((id, text, translation, deleted) => {
        const existingExample = existingExamples?.find(ex => ex.id === id);

        return (
            !!setAdditionalExamples && !!existingExample &&
            (deleted ||
                text !== existingExample.text ||
                translation !== existingExample.translation)
        );
    }, [existingExamples, setAdditionalExamples]);

    return (
        <Surface className={styles.root} {...props}>
            <Heading content="Примеры" type="title-sm" />

            <Flex gap="small" column>
                {allExamples.map(({ id, text, translation, deleted }, i) => {
                    const isChecked = !!additionalExamples?.find(ex => ex.id === id);
                    const showNotification = shouldShowNotification(
                        id,
                        text,
                        translation,
                        deleted
                    );

                    return (
                        <div key={id} className={styles.example}>
                            {!deleted && (
                                <div>
                                    <Form.Input
                                        placeholder="Пример"
                                        name="text"
                                        value={text}
                                        variant="plain"
                                        start={<Avatar content={i + 1} size="sm" />}
                                        end={
                                            <IconButton
                                                size="sm"
                                                variant="plain"
                                                color="neutral"
                                                icon="delete"
                                                title="Удалить пример"
                                                disabled={isSending}
                                                onClick={() => handleDelete(id)}
                                            />
                                        }
                                        disabled={isSending}
                                        required
                                        onChange={e => handleChange(id, e)}
                                    />

                                    <Form.Input
                                        className={styles.exampleTranslation}
                                        placeholder="Перевод"
                                        name="translation"
                                        value={translation}
                                        variant="plain"
                                        size="sm"
                                        disabled={isSending}
                                        required
                                        onChange={e => handleChange(id, e)}
                                    />
                                </div>
                            )}

                            {showNotification &&
                                (isSending ? (
                                    <Flex
                                        justifyContent="space-between"
                                        alignItems="center"
                                        className={styles.notificationConfirmation}
                                    >
                                        <p className={styles.notification}>
                                            {deleted
                                                ? 'Добавить удалённый пример?'
                                                : 'Добавить пользователю старый пример?'}

                                        </p>

                                        <Checkbox
                                            checked={isChecked}
                                            onChange={() => toggleCheckbox(id)}
                                        />
                                    </Flex>
                                ) : (
                                    <p className={styles.notification}>
                                        {deleted
                                            ? '* Пример был удалён'
                                            : '* Пример отличается от добавленного пользователем'}
                                    </p>
                                ))}
                        </div>
                    );
                })}

                <Button
                    icon="add"
                    content="Добавить пример"
                    variant="outlined"
                    disabled={isSending}
                    onClick={handleAdd}
                />
            </Flex>
        </Surface>
    );
}