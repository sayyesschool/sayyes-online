import { useCallback } from 'react';

import { useBoolean } from 'shared/hooks/state';
import { ChatMessage } from 'shared/components/chat';
import Button from 'shared/ui-components/button';
import Icon from 'shared/ui-components/icon';
import CommentForm from 'shared/components/comment-form';

import './index.scss';

export default function Comment({
    user = {},
    comment = {},
    editing = false,
    onToggle = Function.prototype,
    onSave,
    onDelete
}) {
    const [isEditing, toggleEditing] = useBoolean(editing);

    const handleSubmit = useCallback(data => {
        return onSave(comment.id, data)
            .then(() => toggleEditing(false));
    }, [comment, onSave]);

    const handleDelete = useCallback(() => {
        return onDelete(comment.id);
    }, [comment, onDelete]);

    const handleToggle = useCallback(() => {
        onToggle();
        toggleEditing(false);
    }, [onToggle]);

    const author = comment.author || user;
    const isUserAuthor = user?.id === author?.id;

    return isEditing ? (
        <div className="comment comment--editing">
            <CommentForm
                id="comment-form"
                comment={comment}
                onSubmit={handleSubmit}
            />

            <div className="comment-actions">
                <Button type="button" flat onClick={handleToggle}>Отменить</Button>
                <Button type="submit" form="comment-form" primary flat>Сохранить</Button>
            </div>
        </div>
    ) : (
        <ChatMessage
            className="comment"
            author={author.fullname}
            timestamp={comment.datetimeLabel}
            density="compact"
            mine={isUserAuthor}
            content={
                <div dangerouslySetInnerHTML={{ __html: comment.content }} />
            }
            actionMenu={(isUserAuthor && !isEditing) && {
                iconOnly: true,
                text: true,
                items: [
                    {
                        key: 'edit',
                        icon: <Icon>edit</Icon>,
                        title: 'Редактировать',
                        onClick: toggleEditing
                    },
                    {
                        key: 'delete',
                        icon: <Icon>delete</Icon>,
                        title: 'Удалить',
                        onClick: handleDelete
                    }
                ]
            }}
        />
    );
}