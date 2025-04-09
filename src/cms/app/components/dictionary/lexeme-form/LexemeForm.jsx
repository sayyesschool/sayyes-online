import { useCallback, useState } from 'react';

import ImageField from 'shared/components/image-field';
import { fieldLabels, lexemeKindOptions, lexemeTypeOptions } from 'shared/data/lexeme';
import Storage from 'shared/services/storage';
import { Button, Checkbox, Chip, ChipGroup, Flex, Form, Text } from 'shared/ui-components';

import LexemeExamples from './LexemeExamples';
import useMatchingLexemes from './useMatchingLexemes';

import styles from './LexemeForm.module.scss';

const initialRecordData = {
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
    const [data, setData] = useState({
        value: lexeme.value,
        translation: lexeme.translation,
        definition: lexeme.definition ?? '',
        examples: lexeme.examples ?? []
    });
    const [file, setFile] = useState();
    const [recordData, setRecordData] = useState(initialRecordData);
    const [isCommitted, setCommitted] = useState(false);

    const { value, translation, definition, examples } = data;

    const matchingLexemes = useMatchingLexemes(lexeme.id, value);

    const handleSubmit = useCallback(async event => {
        event.preventDefault();

        const lexemeData = {
            value,
            translation,
            definition,
            examples
        };

        if (file) {
            const response = await Storage.upload(file, { path: 'lexemes' });

            lexemeData.image = {
                path: response.data.path
            };
        }

        return onSubmit({
            lexemeData,
            recordData
        });
    }, [value, translation, definition, examples, recordData, file, onSubmit]);

    const handleChange = useCallback(event => {
        const { name, value } = event.target;

        setData(prev => ({ ...prev, [name]: value }));
    }, []);

    const handleFileChange = useCallback((data, file) => {
        setFile(file);
    }, [setFile]);

    const handleFileDelete = useCallback(async image => {
        await Storage.delete(image.path).then(console.log);

        setFile(undefined);

        return onSubmit({ image: undefined });
    }, [onSubmit]);

    const handleExamplesChange = useCallback(examples => {
        setData(prev => ({ ...prev, examples }));
    }, []);

    const handleAdditionalExamplesChange = useCallback(examples => {
        setRecordData(prev => ({ ...prev, examples }));
    }, []);

    const showValueMessages = lexeme.isPending && lexeme.createdBy !== userId;

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
                label="Значение"
                value={value}
                message={matchingLexemes.length > 0 &&
                    <LexemeMatchMessage
                        matchingLexemes={matchingLexemes}
                        lexeme={lexeme}
                        onMatch={onMatch}
                    />
                }
                disabled={isCommitted}
                required
                onChange={handleChange}
            />

            {['translation', 'definition'].map(field =>
                <Form.Input
                    key={field}
                    label={fieldLabels[field]}
                    name={field}
                    value={data[field]}
                    message={showValueMessages &&
                        <LexemeValueMessage
                            currentValue={data[field]}
                            originalValue={lexeme[field]}
                            committed={isCommitted}
                            checked={recordData[field]}
                            onChecked={() =>
                                setRecordData(prev => ({
                                    ...prev,
                                    [field]: !prev.translation
                                }))
                            }
                        />
                    }
                    disabled={isCommitted}
                    required
                    onChange={handleChange}
                />
            )}

            <Form.Select
                name="type"
                label="Тип"
                value={lexeme.type}
                options={lexemeTypeOptions}
                disabled={isCommitted}
                onChange={handleChange}
            />

            <Form.Select
                name="kind"
                label="Вид"
                value={lexeme.kind}
                options={lexemeKindOptions}
                disabled={isCommitted}
                onChange={handleChange}
            />

            <LexemeExamples
                examples={examples}
                existingExamples={lexeme.examples}
                additionalExamples={recordData.examples}
                withNotifications={showValueMessages}
                readOnly={isCommitted}
                onChange={handleExamplesChange}
                onAdditionalChange={handleAdditionalExamplesChange}
            />

            {isCommitted ? (
                <Flex justifyContent="space-between">
                    <Button
                        content="Назад"
                        variant="plain"
                        onClick={() => {
                            setCommitted(false);
                            setRecordData(initialRecordData);
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

function LexemeValueMessage({ currentValue, originalValue, committed, checked, onChecked }) {
    const showMessage =
        originalValue &&
        originalValue !== currentValue;

    return showMessage && (committed ? (
        <Checkbox
            label={<>
                Добавить пользователю создавшему лексему оригинальное значение{' '}
                <i>{originalValue}</i>
            </>}
            checked={checked}
            size="sm"
            onChange={onChecked}
        />
    ) : (
        <>Старое значение - <i>{originalValue}</i></>
    ));
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