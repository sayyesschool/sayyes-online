import { useCallback, useState } from 'react';

import { v4 as uuid } from 'uuid';

import { Button, Checkbox, Flex, Heading } from 'shared/ui-components';

import { LexemeFormExample } from '@/cms/app/components/dictionary/lexeme-form';

import styles from './LexemeExamples.module.scss';

export default function LexemeExamples({
    examples,
    existingExamples,
    additionalExamples,
    withNotifications,
    setAdditionalExamples,
    readOnly,
    onChange,
    onAdditionalChange,
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

        setAllExamples(prev => prev.map(ex => ex.id !== id ? ex : {
            ...ex,
            [name]: value
        }));

        onChange(examples.map(ex => ex.id !== id ? ex : {
            ...ex,
            [name]: value
        }));
    }, [examples, onChange]);

    const handleDelete = useCallback(id => {
        setAllExamples(prev => prev.map(ex => ex.id === id ? {
            ...ex,
            deleted: !ex.deleted
        } : ex));

        onChange(examples.filter(ex => ex.id !== id));
    }, [examples, onChange, setAllExamples]);

    const toggleCheckbox = useCallback(id => {
        const currentLexeme = existingExamples.find(ex => ex.id === id);
        const isAlreadyAdded = additionalExamples.find(ex => ex.id === id);

        const examples = isAlreadyAdded
            ? additionalExamples.filter(ex => ex.id !== id)
            : [...additionalExamples, currentLexeme];

        onAdditionalChange(examples);
    }, [additionalExamples, existingExamples, onAdditionalChange]);

    const shouldShowNotification = useCallback(({ id, text, translation, deleted }) => {
        const existingExample = existingExamples?.find(e => e.id === id);

        return (
            withNotifications &&
            !!existingExample &&
            (deleted ||
                text !== existingExample.text ||
                translation !== existingExample.translation
            )
        );
    }, [existingExamples, withNotifications]);

    return (
        <div className={styles.root} {...props}>
            <Heading content="Примеры" type="title-sm" />

            <Flex gap="small" column>
                {allExamples.map((example, i) =>
                    <LexemeFormExample
                        key={example.id}
                        example={example}
                        number={i + 1}
                        checked={!!additionalExamples?.find(e => e.id === example.id)}
                        shouldShowNotification={shouldShowNotification(example)}
                        readOnly={readOnly}
                        onCheck={toggleCheckbox}
                        onChange={handleChange}
                        onDelete={handleDelete}
                    >
                        {shouldShowNotification &&
                            <Checkbox
                                label={example.deleted
                                    ? 'Сохранить пользователю удалённый пример?'
                                    : 'Сохранить пользователю оригинальный пример?'
                                }
                                checked={!!additionalExamples?.find(e => e.id === example.id)}
                                size="sm"
                                onChange={() => toggleCheckbox(example.id)}
                            />
                        }
                    </LexemeFormExample>
                )}

                {!readOnly &&
                    <Button
                        icon="add"
                        content="Добавить пример"
                        variant="outlined"
                        onClick={handleAdd}
                    />
                }
            </Flex>
        </div>
    );
}