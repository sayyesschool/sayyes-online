import React, { useCallback } from 'react';
import {
    Avatar,
    Button,
    Card,
    Icon
} from 'mdc-react';
import classnames from 'classnames';

import { useBoolean } from 'shared/hooks/state';
import CommentForm from 'shared/components/comment-form';
import MenuButton from 'shared/components/menu-button';

import './index.scss';

export default function CommentCard({ user, comment = {}, onUpdate, onDelete }) {
    const [isEditing, toggleEditing] = useBoolean(false);

    const handleUpdate = useCallback(data => {
        return onUpdate(comment.id, data)
            .then(() => toggleEditing(false));
    }, [comment]);

    const handleDelete = useCallback(() => {
        return onDelete(comment.id);
    }, [comment]);

    return (
        <Card className={classnames('comment-card', {
            'comment-card--editing': isEditing
        })} outlined={isEditing}>
            <Card.Header
                graphic={<Avatar src={comment.author?.imageUrl} text={comment.author?.initials} />}
                title={comment.author?.fullname}
                subtitle={comment.datetimeLabel}
                actions={(user.id === comment.author.id && !isEditing) &&
                    <MenuButton
                        items={[
                            {
                                key: 'edit',
                                graphic: <Icon>edit</Icon>,
                                text: 'Редактировать',
                                onClick: toggleEditing
                            },
                            {
                                key: 'delete',
                                graphic: <Icon>delete</Icon>,
                                text: 'Удалить',
                                onClick: handleDelete
                            }
                        ]}
                    />
                }
            />

            {isEditing ?
                <>
                    <Card.Section>
                        <CommentForm
                            id="update-comment-form"
                            comment={comment}
                            onSubmit={handleUpdate}
                        />
                    </Card.Section>

                    <Card.Actions>
                        <Card.Action button>
                            <Button type="button" onClick={toggleEditing}>Отменить</Button>
                        </Card.Action>

                        <Card.Action button>
                            <Button type="submit" form="update-comment-form" outlined>Сохранить</Button>
                        </Card.Action>
                    </Card.Actions>
                </>
                :
                <Card.Section
                    dangerouslySetInnerHTML={{ __html: comment.content }}
                    primary
                />
            }
        </Card>
    );
}