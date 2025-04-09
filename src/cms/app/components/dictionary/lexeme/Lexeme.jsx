import { useCallback, useEffect, useState } from 'react';

import { Checkbox, Flex, Heading, Image, Text } from 'shared/ui-components';
import cn from 'shared/utils/classnames';

import LexemeExamples from './LexemeExamples';

import styles from './Lexeme.module.scss';

export default function Lexeme({ lexeme, readOnly, onChange, className }) {
    const { id, value, image, definition, translation, examples } = lexeme;

    const [data, setData] = useState({
        translation: '',
        definition: '',
        examples: []
    });

    useEffect(() => {
        onChange?.(id, data);
    }, [id, data, onChange]);

    const handleToggle = useCallback((checked, field) => {
        setData(prev => ({
            ...prev,
            [field]: checked ? lexeme[field] : ''
        }));
    }, [lexeme]);

    const handleExamplesChange = useCallback(examples => {
        setData(prev => ({ ...prev, examples }));
    }, []);

    const fields = [
        { id: 'translation', content: translation },
        { id: 'definition', content: definition }
    ];

    return (
        <div className={cn(className, styles.root)}>
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

                    {fields.map(({ id, content }) => (
                        content && (
                            <Flex
                                key={id}
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Text
                                    className={styles[id]}
                                    content={content}
                                    type="body-lg"
                                />

                                {!readOnly && (
                                    <Checkbox
                                        checked={!!data[id]}
                                        size="small"
                                        onChange={e => handleToggle(e.target.checked, id)}
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
                    onChange={handleExamplesChange}
                />
            }
        </div>
    );
}