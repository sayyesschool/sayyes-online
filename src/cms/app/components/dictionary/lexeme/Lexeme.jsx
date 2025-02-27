import { useCallback, useEffect, useState } from 'react';

import { Checkbox, Flex, Heading, Image, Text } from 'shared/ui-components';

import LexemeExamples from './LexemeExamples';

import styles from './Lexeme.module.scss';

export default function LexemeView({ lexeme, readOnly, onChange }) {
    const [data, setData] = useState({ examples: [], translation: '', definition: '' });
    const { value, image, definition, translation, examples } = lexeme;
    const fields = [
        { label: 'translation', content: translation, field: 'translation' },
        { label: 'definition', content: definition, field: 'definition' }
    ];

    const handleToggle = useCallback((checked, field) => {
        setData(prev => ({
            ...prev,
            [field]: checked ? lexeme[field] : ''
        }));
    }, [lexeme]);

    const onChangeExamples = useCallback(examples => {
        setData(prev => ({ ...prev, examples }));
    }, []);

    useEffect(() => {
        if (!onChange) return;

        onChange(data);
    }, [data]);

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
                                        checked={!!data[field]}
                                        onChange={e => handleToggle(e.target.checked, field)}
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
                    readOnly={readOnly}
                    onChangeExamples={onChangeExamples}
                />
            }
        </div>
    );
}