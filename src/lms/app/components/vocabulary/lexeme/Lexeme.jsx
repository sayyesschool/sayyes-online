import { useCallback } from 'react';

import { Flex, Heading, Image, Text } from 'shared/ui-components';

import LexemeStatus from 'lms/components/vocabulary/lexeme-status';

import LexemeExamples from './LexemeExamples';

import styles from './Lexeme.module.scss';

export default function LexemeView({
    lexeme,
    readOnly,
    onStatusUpdate
}) {
    const { value, image, definition, translation, examples, status, data } = lexeme;

    const handleStatusChange = useCallback(status => {
        return onStatusUpdate(lexeme.id, status);
    }, [lexeme, onStatusUpdate]);

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

                {data.image &&
                    <Flex dir="column" gap="smallest">
                        <Text
                            className={styles.translation}
                            content="Ваше изображение:"
                            color="neutral"
                            type="body-sm"
                        />

                        <Image
                            className={styles.image}
                            src={data.image.url}
                            alt={data.image.alt}
                        />
                    </Flex>
                }

                <div className={styles.text}>
                    <Heading
                        className={styles.value}
                        content={value}
                        type="h1"
                        end={
                            <LexemeStatus
                                level={status}
                                tooltipPlacement="right"
                                readOnly={readOnly}
                                onChange={handleStatusChange}
                            />
                        }
                    />

                    <Text
                        className={styles.translation}
                        content={translation}
                        color="neutral"
                        type="body-lg"
                    />

                    {data?.translation &&
                        <Text
                            className={styles.translation}
                            content={`Мои переводы: ${data.translation}`}
                            color="neutral"
                            type="body-md"
                        />
                    }

                    {definition &&
                        <Text
                            className={styles.definition}
                            content={definition}
                            type="body-lg"
                        />
                    }

                    {data?.definition &&
                        <Text
                            className={styles.definition}
                            content={`Моё определение: ${data.definition}`}
                            color="neutral"
                            type="body-lg"
                        />
                    }
                </div>
            </section>

            {data?.examples?.length > 0 &&
                <LexemeExamples
                    title="Мои примеры:"
                    examples={data.examples}
                />
            }

            {examples.length > 0 &&
                <LexemeExamples
                    title="Примеры:"
                    examples={examples}
                />
            }
        </div>
    );
}