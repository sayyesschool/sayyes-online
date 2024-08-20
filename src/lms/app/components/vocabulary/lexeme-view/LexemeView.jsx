import { useCallback } from 'react';

import { Button, Heading, Image, Text } from 'shared/ui-components';

import LexemeStatus from 'lms/components/vocabulary/lexeme-status';

import LexemeExamples from './LexemeExamples';

import styles from './LexemeView.module.scss';

export default function LexemeView({
    lexeme,
    onStatusUpdate,
    onClose
}) {
    const { value, image, definition, translation, examples, status, data } = lexeme;

    const handleStatusChange = useCallback(status => {
        return onStatusUpdate(lexeme.id, status);
    }, [lexeme, onStatusUpdate]);

    return (
        <div className={styles.root}>
            {onClose &&
                <Button
                    content="Назад" variant="soft"
                    onClick={onClose}
                />}

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
                        end={
                            <LexemeStatus
                                level={status}
                                onChange={handleStatusChange}
                            />
                        }
                    />

                    <Text
                        className={styles.translation}
                        type="body-md"
                        color="neutral"
                        content={translation}
                    />

                    {data?.translation &&
                        <Text
                            className={styles.translation}
                            type="body-md"
                            content={`Мои переводы: ${data.translation}`}
                        />
                    }

                    {definition &&
                        <Text
                            className={styles.definition}
                            type="body-lg"
                            content={definition}
                        />
                    }

                    {data?.definition &&
                        <Text
                            className={styles.definition}
                            type="body-lg"
                            content={`Моё определение: ${data.definition}`}
                        />
                    }
                </div>
            </section>

            {data?.examples?.length > 0 &&
                <LexemeExamples title="Мои примеры:" examples={data.examples} />
            }

            {examples.length > 0 &&
                <LexemeExamples title="Примеры:" examples={examples} />
            }
        </div>
    );
}