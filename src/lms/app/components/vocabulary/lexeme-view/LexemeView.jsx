import { useCallback } from 'react';

import { Heading, Image, Text } from 'shared/ui-components';

import LexemeStatus from 'lms/components/vocabulary/lexeme-status';

import LexemeExamples from './LexemeExamples';

import styles from './LexemeView.module.scss';

export default function LexemeView({
    lexeme,
    onStatusUpdate
}) {
    const { value, image, definition, translation, examples, record } = lexeme;

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

                <div className={styles.text}>
                    <Heading
                        className={styles.value}
                        content={value}
                        type="h1"
                        end={
                            <LexemeStatus
                                level={record?.status}
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

                    {record?.data?.translation &&
                        <Text
                            className={styles.translation}
                            type="body-md"
                            content={`Мои переводы: ${record.data.translation}`}
                        />
                    }

                    {definition &&
                        <Text
                            className={styles.definition}
                            type="body-lg"
                            content={definition}
                        />
                    }

                    {record?.data?.definition &&
                        <Text
                            className={styles.definition}
                            type="body-lg"
                            content={`Моё определение: ${record.data.definition}`}
                        />
                    }
                </div>
            </section>

            {record?.data?.examples?.length > 0 &&
                <LexemeExamples title="Мои примеры:" examples={record.data.examples} />
            }

            {examples.length > 0 &&
                <LexemeExamples title="Примеры:" examples={examples} />
            }
        </div>
    );
}