import { Avatar, Heading, Image, List, Text } from 'shared/ui-components';

import LexemeStatus from 'lms/components/vocabulary/lexeme-status';

import styles from './LexemeView.module.scss';

export default function LexemeView({
    lexeme
}) {
    const { value, definition, translations, examples, image, data } = lexeme;
    const translationsString = translations.join(', ');

    return (
        <div className={styles.root}>
            <section className={styles.content}>
                <Image
                    src={image.src}
                    className={styles.image}
                    alt={lexeme.value}
                />

                <div className={styles.text}>
                    <Heading
                        className={styles.value}
                        content={value}
                        type="h1"
                        end={
                            <LexemeStatus level={data?.status} />
                        }
                    />

                    <Text
                        className={styles.translations}
                        type="body-md"
                        color="neutral"
                        content={translationsString}
                    />

                    <Text
                        className={styles.definition}
                        type="body-lg"
                        content={definition}
                    />
                </div>
            </section>

            {examples.length > 0 && (
                <section className={styles.examples}>
                    <Heading content="Примеры:" type="title-md" />

                    <List>
                        {examples.map((example, index) => (
                            <List.Item
                                key={index}
                                className={styles.example}
                                decorator={
                                    <Avatar
                                        content={index + 1}
                                        color="neutral"
                                        size="sm"
                                    />
                                }
                                content={{
                                    primary: example.text,
                                    secondary: example.translation
                                }}
                            />
                        ))}
                    </List>
                </section>
            )}
        </div>
    );
}