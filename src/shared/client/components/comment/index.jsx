import { useCallback } from 'react';

import { useBoolean } from 'shared/hooks/state';
import { ChatMessage } from 'shared/components/chat';
import CommentForm from 'shared/components/comment-form';
import { Button, Flex, Icon } from 'shared/ui-components';

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
        <div className="Comment Comment--editing">
            <CommentForm
                id="comment-form"
                comment={comment}
                onSubmit={handleSubmit}
            />

            <Flex justifyContent="space-between">
                <Button
                    type="button"
                    content="Отменить"
                    color="neutral"
                    variant="plain"
                    onClick={handleToggle}
                />

                <Button
                    type="submit"
                    content="Сохранить"
                    form="comment-form"
                />
            </Flex>
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