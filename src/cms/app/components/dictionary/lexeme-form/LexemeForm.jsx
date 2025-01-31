import { useCallback, useEffect, useState } from 'react';

import ImageField from 'shared/components/image-field';
import { useDebounce } from 'shared/hooks/fn';
import Storage from 'shared/services/storage';
import { Button, Checkbox, Flex, Form } from 'shared/ui-components';

import LexemeExamples from './LexemeExamples';

import styles from './LexemeForm.module.scss';

const initialAdditionalData = { translation: false, definition: false, examples: [] };

export default function LexemeForm({
    lexeme,
    foundSearchLexemes,
    updateFoundLexeme,
    withNotifications,
    onSubmit,
    onSearch,
    ...props
}) {
    // TODO: стоит ли file тоже добавить в data?
    const [isSending, setIsSending] = useState(false);
    const [file, setFile] = useState();
    const [data, setData] = useState({
        value: lexeme.value,
        translation: lexeme.translation,
        definition: lexeme.definition ?? '',
        examples: lexeme.examples ?? []
    });
    const [additionalData, setAdditionalData] = useState(initialAdditionalData);
    const { value, translation, definition, examples } = data;

    // TODO: required не срабатывает из-за disabled
    const inputs = [
        {
            component: Form.Input,
            id: 'value',
            label: 'Лексема',
            required: true,
            value,
            setData
        },
        {
            component: Form.Input,
            id: 'translation',
            label: 'Переводы',
            required: true,
            value: translation,
            setData
        },
        {
            component: Form.Textarea,
            id: 'definition',
            label: 'Определение',
            value: definition,
            setData
        }
    ];

    const handleSubmit = useCallback(async event => {
        event.preventDefault();

        const data = {
            value,
            translation,
            definition,
            examples,
            additionalData
        };

        if (file) {
            const response = await Storage.upload(file, { path: 'lexemes' });

            data.image = {
                path: response.data.path
            };
        }

        onSubmit(data);
    }, [value, translation, definition, examples, additionalData, file, onSubmit]);

    const handleFileChange = useCallback((data, file) => {
        setFile(file);
    }, [setFile]);

    const handleFileDelete = useCallback(async image => {
        await Storage.delete(image.path).then(console.log);
        setFile(undefined);
        onSubmit({ image: undefined });
    }, [onSubmit]);

    const handleExamplesChange = useCallback(examples => {
        setData(prev => ({ ...prev, examples }));
    }, []);

    const handleAdditionalExamplesChange = useCallback(examples => {
        setAdditionalData(prev => ({ ...prev, examples }));
    }, []);

    const handleInputChange = useDebounce(value => {
        onSearch(value);
    }, 1000);

    useEffect(() => {
        handleInputChange(data.value);
    }, [data.value, handleInputChange]);

    return (
        <Form
            className={styles.root}
            onSubmit={handleSubmit}
            {...props}
        >
            <ImageField
                className={styles.imageField}
                label="Изображение"
                image={lexeme.image || lexeme.data?.image}
                disabled={isSending}
                onChange={handleFileChange}
                onDelete={handleFileDelete}
            />

            {/* TODO: Как в строчке ниже добавить пробел между тэгом */}
            {foundSearchLexemes?.map(foundLexeme => (
                <Button
                    key={foundLexeme.id}
                    variant="plain"
                    onClick={() => updateFoundLexeme(foundLexeme, lexeme)}
                >
                    Использовать существующую лексиму <span className={styles.foundLexeme}>{foundLexeme.value}-{foundLexeme.translation}</span>?
                </Button>
            ))}

            {inputs.map(({ component: Component, id, label, value, required, setData }) => {
                const originalIsNotEmpty = !!lexeme[id];
                const valuesAreDifferent = lexeme[id] !== value;
                const isNotLexemeValue = id !== 'value';
                const showNotification =
                    originalIsNotEmpty && valuesAreDifferent && isNotLexemeValue && withNotifications;

                return (
                    <div key={id}>
                        <Component
                            label={label}
                            value={value}
                            disabled={isSending}
                            required={required}
                            onChange={e => setData(prev => ({ ...prev, [id]: e.target.value }))}
                        />

                        {showNotification &&
                            (isSending ? (
                                <Flex
                                    justifyContent="space-between"
                                    alignItems="center"
                                    className={styles.notificationConfirmation}
                                >
                                    <p>
                                        Добавить юзеру значение{' '}
                                        <span className={styles.notification}>"{lexeme[id]}"</span>
                                    </p>

                                    <Checkbox
                                        checked={additionalData[id]}
                                        onChange={() =>
                                            setAdditionalData(prev => {
                                                const oldValue = prev[id];

                                                return { ...prev, [id]: !oldValue };
                                            })
                                        }
                                    />
                                </Flex>
                            ) : (
                                <p className={styles.notification}>
                                    * Старое значение - {lexeme[id]}
                                </p>
                            ))}
                    </div>
                );
            })}

            <LexemeExamples
                isSending={isSending}
                examples={examples}
                existingExamples={lexeme.examples}
                additionalExamples={additionalData.examples}
                withNotifications={withNotifications}
                setAdditionalExamples={handleAdditionalExamplesChange}
                onChange={handleExamplesChange}
            />

            {isSending ? (
                <Flex justifyContent="space-between">
                    <Button
                        content="Назад"
                        variant="soft"
                        onClick={() => {
                            setIsSending(false);
                            setAdditionalData(initialAdditionalData);
                        }}
                    />

                    <Button
                        content="Утвердить"
                        disabled={!value || !translation}
                        type="submit"
                    />
                </Flex>
            ) : (
                <Button content="Далее" onClick={() => setIsSending(true)} />
            )}
        </Form>
    );
}