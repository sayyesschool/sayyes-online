import { useCallback } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Card, Flex, IconButton, Image, Link, Menu, Surface, Text } from 'shared/ui-components';
import { getWordEnding } from 'shared/utils/format';

import styles from './VocabularyCard.module.scss';

export default function VocabularyCard({
    vocabulary,
    orientation,
    readOnly,
    onEditVocabulary,
    onDeleteVocabulary,
    ...props
}) {
    const onEdit = useCallback(() => {
        return onEditVocabulary(vocabulary);
    }, [vocabulary, onEditVocabulary]);

    const onDelete = useCallback(() => {
        return onDeleteVocabulary(vocabulary.id);
    }, [vocabulary.id, onDeleteVocabulary]);

    const { title, subtitle, imageUrl, numberOfLexemes, lexemes, courseUrl } = vocabulary;
    const description = `${numberOfLexemes} ${getWordEnding('слов', numberOfLexemes, ['о', 'а', ''])}`;

    // const newCount = vocabulary.lexemes.filter(lexeme => lexeme.status === 0, 0);
    // const learningCount = vocabulary.lexemes.filter(lexeme => lexeme.status < 5, 0);
    // const learnedCount = vocabulary.lexemes.filter(lexeme => lexeme.status === 5, 0);

    return (
        <Card
            className={styles.root}
            orientation={orientation}
            {...props}
        >
            {imageUrl &&
                <Card.Cover>
                    <Image src={imageUrl} alt="" />
                </Card.Cover>
            }

            <header className={styles.header}>
                <div className={styles.info}>
                    <Link
                        component={RouterLink}
                        to={`vocabulary/${vocabulary.id}`}
                        content={title}
                        type="title-lg"
                    />

                    {subtitle &&
                        <Text type="body-md">{subtitle}</Text>
                    }

                    {description &&
                        <Text type="body-sm">{description}</Text>
                    }
                </div>

                {!readOnly && (
                    <Menu
                        trigger={
                            <IconButton
                                icon="more_vert"
                                title="Подробнее"
                                size="sm"
                            />
                        }
                        items={[
                            {
                                key: 'edit',
                                icon: 'edit',
                                content: 'Изменить',
                                onClick: onEdit
                            },
                            {
                                key: 'delete',
                                icon: 'delete',
                                color: 'danger',
                                content: 'Удалить',
                                onClick: onDelete
                            }
                        ]}
                    />
                )}
            </header>

            {/* <Surface className={styles.content} variant="soft">
                <div className={styles.stats}>
                    <div className={styles.stat}>
                        <Text level="body-xs" content="Новые" />
                        <Text level="title-lg" content={newCount} />
                    </div>

                    <div className={styles.stat}>
                        <Text level="body-xs" content="Изучается" />
                        <Text level="title-lg" content={learningCount} />
                    </div>

                    <div className={styles.stat}>
                        <Text level="body-xs" content="Выучено" />
                        <Text level="title-lg" content={learnedCount} />
                    </div>
                </div>
            </Surface> */}

            {courseUrl &&
                <Text type="body-sm">
                    Из курса -
                    <Link component={RouterLink} to={courseUrl}>General English</Link>
                </Text>
            }
        </Card>
    );
}