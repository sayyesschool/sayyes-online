import React, { useCallback } from 'react';
import {
    Avatar,
    Card,
    Icon,
    IconButton
} from 'mdc-react';

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
        <Card className="comment-card" outlined>
            <Card.Header
                graphic={<Avatar src={comment.author?.imageUrl} text={comment.author?.initials} />}
                title={comment.author?.fullname}
                subtitle={comment.datetimeLabel}
                actions={user.id === comment.author.id && (isEditing ?
                    [
                        <IconButton
                            icon="save"
                            type="submit"
                            form="update-comment-form"
                        />,

                        <IconButton
                            icon="cancel"
                            onClick={toggleEditing}
                        />
                    ]
                    :
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
                )}
            />

            {isEditing ?
                <CommentForm
                    id="update-comment-form"
                    comment={comment}
                    onSubmit={handleUpdate}
                />
                :
                <Card.Section
                    dangerouslySetInnerHTML={{ __html: comment.content }}
                />
            }
        </Card>
    );
}