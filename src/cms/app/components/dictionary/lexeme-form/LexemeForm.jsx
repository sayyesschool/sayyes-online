import { useCallback, useEffect, useState } from 'react';

import ImageField from 'shared/components/image-field';
import { useDebounce } from 'shared/hooks/fn';
import http from 'shared/services/http';
import Storage from 'shared/services/storage';
import { Alert, Button, Checkbox, Chip, ChipGroup, Flex, Form, Text } from 'shared/ui-components';

import LexemeExamples from './LexemeExamples';

import styles from './LexemeForm.module.scss';

const initialAdditionalData = {
    translation: false,
    definition: false,
    examples: []
};

export default function LexemeForm({
    lexeme,
    userId,
    onMatch,
    onSubmit,
    ...props
}) {
    const [file, setFile] = useState();
    const [data, setData] = useState({
        value: lexeme.value,
        translation: lexeme.translation,
        definition: lexeme.definition ?? '',
        examples: lexeme.examples ?? []
    });
    const [additionalData, setAdditionalData] = useState(initialAdditionalData);
    const [matchingLexemes, setMatchingLexemes] = useState([]);
    const [isCommitted, setCommitted] = useState(false);

    const { value, translation, definition, examples } = data;

    const search = useDebounce(value => {
        http.get(`api/dictionary/search?q=${value}&e=${lexeme.id}`)
            .then(response => setMatchingLexemes(response.data));
    }, 500, lexeme.id);

    useEffect(() => {
        search(value);
    }, [value, search]);

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

    // TODO: required не срабатывает из-за disabled
    const inputs = [
        {
            component: Form.Input,
            id: 'translation',
            label: 'Переводы',
            required: true,
            value: translation
        },
        {
            component: Form.Textarea,
            id: 'definition',
            label: 'Определение',
            value: definition
        }
    ];

    const withNotifications = lexeme.isPending && lexeme.createdBy !== userId;

    return (
        <Form
            className={styles.root}
            onSubmit={handleSubmit}
            {...props}
        >
            <ImageField
                label="Изображение"
                image={lexeme.image || lexeme.data?.image}
                disabled={isCommitted}
                onChange={handleFileChange}
                onDelete={handleFileDelete}
            />

            <Form.Input
                id="value"
                label="Лексема"
                value={value}
                message={matchingLexemes.length > 0 &&
                    <LexemeMatchMessage
                        matchingLexemes={matchingLexemes}
                        lexeme={lexeme}
                        onMatch={onMatch}
                    />
                }
                required
            />

            {inputs.map(({ component: Component, id, label, value, required }) => {
                const originalValue = lexeme[id];
                const showMessage =
                    originalValue &&
                    originalValue !== value &&
                    withNotifications;

                return (
                    <Component
                        key={id}
                        label={label}
                        value={value}
                        readOnly={isCommitted}
                        required={required}
                        message={showMessage &&
                            (isCommitted ? (
                                <Checkbox
                                    label={<>
                                        Добавить пользователю создавшему лексему оригинальное значение{' '}
                                        <i>{lexeme[id]}</i>
                                    </>}
                                    checked={additionalData[id]}
                                    size="sm"
                                    onChange={() =>
                                        setAdditionalData(prev => ({
                                            ...prev,
                                            [id]: !prev[id]
                                        }))
                                    }
                                />
                            ) : (
                                <>Старое значение - <i>{lexeme[id]}</i></>
                            ))
                        }
                        onChange={e => setData(prev => ({ ...prev, [id]: e.target.value }))}
                    />
                );
            })}

            <LexemeExamples
                examples={examples}
                existingExamples={lexeme.examples}
                additionalExamples={additionalData.examples}
                withNotifications={withNotifications}
                readOnly={isCommitted}
                onChange={handleExamplesChange}
                onAdditionalChange={handleAdditionalExamplesChange}
            />

            {isCommitted ? (
                <Flex justifyContent="space-between">
                    <Button
                        content="Назад"
                        variant="soft"
                        onClick={() => {
                            setCommitted(false);
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
                <Button content="Далее" onClick={() => setCommitted(true)} />
            )}
        </Form>
    );
}

function LexemeMatchMessage({ matchingLexemes, lexeme, onMatch }) {
    return (
        <>
            В словаре уже есть похожие лексемы:

            <ChipGroup>
                {matchingLexemes.map(foundLexeme => (
                    <Chip
                        key={foundLexeme.id}
                        size="sm"
                        variant="soft"
                        onClick={() => onMatch(foundLexeme, lexeme)}
                    >
                        <Flex gap="xxs" alignItems="baseline">
                            <Text
                                content={foundLexeme.value}
                                type="body-sm"
                                inline
                            />

                            <Text
                                content={foundLexeme.translation}
                                type="body-xs"
                                inline
                            />
                        </Flex>
                    </Chip>
                ))}
            </ChipGroup>
        </>
    );
}