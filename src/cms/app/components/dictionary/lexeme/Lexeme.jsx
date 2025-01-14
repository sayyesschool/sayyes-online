import { useCallback } from 'react';

import { Checkbox, Flex, Heading, Image, Text } from 'shared/ui-components';

import LexemeExamples from './LexemeExamples';

import styles from './Lexeme.module.scss';

export default function LexemeView({ user, lexeme, additionalData, changeAdditionalData }) {
    const { value, image, definition, translation, examples } = lexeme;
    const isNotCreator = user?.id !== lexeme.createdBy;
    const readOnly = !changeAdditionalData || !isNotCreator;
    const addExamples = additionalData?.examples;
    const fields = [
        { label: 'translation', content: translation, field: 'translation' },
        { label: 'definition', content: definition, field: 'definition' }
    ];

    const handleToggle = useCallback(field => {
        if (!changeAdditionalData) return;
        changeAdditionalData({
            ...additionalData,
            [field]: !additionalData?.[field]
        });
    }, [additionalData, changeAdditionalData]);

    const onChangeAddExamples = useCallback(examples => {
        changeAdditionalData({ ...additionalData, examples });
    }, [additionalData, changeAdditionalData]);

    return (
        <div className={styles.root}>
            <section className={styles.content}>
                {image &&
                    <Image
                        className={styles.image}
                        src={image.url}
                        alt={lexeme.value}
                    />
                }

                <div className={styles.text}>
                    <Heading
                        className={styles.value}
                        content={value}
                        type="h1"
                    />

                    {fields.map(({ label, content, field }) => (
                        content && (
                            <Flex
                                key={field}
                                justifyContent="space-between"
                                alignItems="center"
                                className={styles.notificationConfirmation}
                            >
                                <Text
                                    className={styles[label]}
                                    content={content}
                                    type="body-lg"
                                />

                                {!readOnly && (
                                    <Checkbox
                                        checked={!!additionalData?.[field]}
                                        onChange={() => handleToggle(field)}
                                    />
                                )}
                            </Flex>
                        )
                    ))}
                </div>
            </section>

            {examples.length > 0 &&
                <LexemeExamples
                    title="Примеры:"
                    examples={examples}
                    addExamples={addExamples}
                    onChangeAddExamples={changeAdditionalData && onChangeAddExamples}
                />
            }
        </div>
    );
}