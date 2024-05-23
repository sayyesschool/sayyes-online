import { useCallback } from 'react';

import { Heading, Image, Text } from 'shared/ui-components';

import LexemeExamples from 'lms/components/vocabulary/lexeme-examples';
import LexemeStatus from 'lms/components/vocabulary/lexeme-status';

import styles from './LexemeView.module.scss';

export default function LexemeView({
    lexeme,
    onStatusUpdate
}) {
    const { value, definition, translations, examples, image, record } = lexeme;
    const translationsString = translations.join(', ');
    const myTranslationsString = record?.data?.translations?.join(', ');

    const handleStatusChange = useCallback(status => {
        return onStatusUpdate(lexeme.id, status);
    }, [lexeme, onStatusUpdate]);

    return (
        <div className={styles.root}>
            <section className={styles.content}>
                {image &&
                    <Image
                        className={styles.image}
                        src={image.src}
                        alt={lexeme.value}
                    />
                }

                <div className={styles.text}>
                    <Heading
                        className={styles.value}
                        content={value}
                        type="h1"
                        end={
                            <LexemeStatus level={record?.status} onChange={handleStatusChange} />
                        }
                    />

                    <Text
                        className={styles.translations}
                        type="body-md"
                        color="neutral"
                        content={translationsString}
                    />

                    {!!record?.data?.translations?.length &&
                        <Text
                            className={styles.translations}
                            type="body-md"
                            color="warning"
                            content={`Мои переводы: ${myTranslationsString}`}
                        />
                    }

                    <Text
                        className={styles.definition}
                        type="body-lg"
                        content={definition}
                    />

                    {record?.data?.definition &&
                        <Text
                            className={styles.definition}
                            type="body-lg"
                            color="warning"
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