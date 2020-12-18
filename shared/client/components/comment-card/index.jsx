import React, { useCallback } from 'react';
import {
    Card,
    Icon,
    IconButton
} from 'mdc-react';

import { useBoolean } from 'shared/hooks/state';
import CommentForm from 'shared/components/comment-form';
import MenuButton from 'shared/components/menu-button';

import './index.scss';

export default function CommentCard({ comment = {}, onUpdate, onDelete }) {
    const [isEditing, toggleEditing] = useBoolean(false);

    const handleUpdate = useCallback(data => {
        onUpdate({ ...comment, ...data })
            .then(() => toggleEditing(false));
    }, [comment]);

    const handleDelete = useCallback(() => {
        onDelete(comment);
    }, [comment]);

    return (
        <Card className="comment-card" outlined>
            <Card.Header
                title={comment.user?.fullname}
                subtitle={comment.datetime}
                actions={isEditing ?
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
                }
            />

            {isEditing ?
                <CommentForm
                    id="update-comment-form"
                    comment={comment}
                    onSubmit={handleUpdate}
                />
                :
                <Card.Section
                    primary
                    dangerouslySetInnerHTML={{ __html: comment.content }}
                />
            }
        </Card>
    );
}