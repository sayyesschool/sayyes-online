import { useCallback } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Card, IconButton, Image, Link, Menu, Text } from 'shared/ui-components';
import { getWordEnding } from 'shared/utils/format';

import styles from './VocabularyCard.module.scss';

export default function VocabularyCard({
    vocabulary,
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

    const { title, subtitle, imageUrl, numberOfLexemes, coursePath } = vocabulary;
    const description = `${numberOfLexemes} ${getWordEnding('слов', numberOfLexemes, ['о', 'а', ''])}`;

    return (
        <Card
            className="VocabularyCard"
            {...props}
        >
            {imageUrl &&
                <Card.Cover>
                    <Image src={imageUrl} alt="Say Yes" />
                </Card.Cover>
            }

            <Card.Content>
                <header className={styles.header}>
                    <Link
                        component={RouterLink}
                        to={`vocabulary/${vocabulary.id}`}
                        content={title}
                        type="title-lg"
                    />

                    {!readOnly &&
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
                    }
                </header>

                <Text type="body-md">{subtitle}</Text>
                <Text type="body-sm">{description}</Text>

                {coursePath &&
                    <Text type="body-sm">
                        Из курса -
                        <Link component={RouterLink} to={coursePath}>General English</Link>
                    </Text>
                }
            </Card.Content>
        </Card>
    );
}