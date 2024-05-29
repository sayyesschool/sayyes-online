import { useCallback } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Card, Flex, IconButton, Image, Link } from 'shared/ui-components';
import { MenuButton } from 'shared/ui-components';

import styles from './VocabularyCard.module.scss';

export default function VocabularyCard({ vocabulary, onDeleteVocabulary, setCurrentVocabulary, ...props }) {
    const { title, subtitle, imageUrl, numberOfLexemes, coursePath } = vocabulary;

    const onDelete = useCallback(() => {
        return onDeleteVocabulary(vocabulary.id);
    }, [onDeleteVocabulary, vocabulary.id]);

    const onEdit = useCallback(() => {
        return setCurrentVocabulary(vocabulary);
    }, [setCurrentVocabulary, vocabulary]);

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
                <Flex className={styles.header}>
                    <Link component={RouterLink} to={`vocabulary/${vocabulary.id}`} level="title-lg">{title}</Link>

                    <MenuButton
                        className="UserMenu"
                        trigger={
                            <IconButton icon="more_vert" title="Подробнее" />
                        }
                        items={[
                            {
                                key: 'edit',
                                content: 'Изменить',
                                onClick: onEdit
                            },
                            {
                                key: 'delete',
                                content: 'Удалить',
                                onClick: onDelete
                            }
                        ]}
                    />
                </Flex>

                <Card.Text color="warning" level="body-sm">{subtitle}</Card.Text>
                <Card.Text level="body-sm">Количество слов - {numberOfLexemes}</Card.Text>

                {coursePath &&
                    <Card.Text level="body-sm">
                        Из курса - <Link component={RouterLink} to={coursePath} color="success">General Eanglish</Link>
                    </Card.Text>
                }
            </Card.Content>
        </Card>
    );
}