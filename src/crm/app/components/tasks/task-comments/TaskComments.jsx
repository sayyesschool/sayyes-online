import { useCallback } from 'react';

import Comment from 'shared/components/comment';
import { useBoolean } from 'shared/hooks/state';
import { Button, Flex } from 'shared/ui-components';

export default function TaskComments({ comments, user, onChange }) {
    const [isCommenting, toggleCommenting] = useBoolean(false);

    const handleCreateComment = useCallback(data => {
        const newComment = {
            content: data,
            authorId: user.id
        };

        toggleCommenting(false);

        onChange(prev => [newComment, ...prev]);
    }, [user, toggleCommenting, onChange]);

    const handleUpdateComment = useCallback((commentId, data) => {
        onChange(prev => {
            return prev.map(comment => {
                if (comment.id === commentId) {
                    return { ...comment, content: data };
                }

                return comment;
            });
        });
    }, [onChange]);

    const handleDeleteComment = useCallback(commentId => {
        return onChange(prev => {
            return prev.filter(comment => comment.id !== commentId);
        });
    }, [onChange]);

    return (
        <Flex gap="m" column>
            {isCommenting ? (
                <Comment
                    user={user}
                    editing
                    onSave={handleCreateComment}
                    onCancel={toggleCommenting}
                />
            ) : (
                <Button
                    content="Оставить комментарий"
                    icon="comment"
                    variant="outlined"
                    text
                    onClick={toggleCommenting}
                />
            )}

            {comments.map(comment => (
                <Comment
                    key={comment.id}
                    comment={comment}
                    user={user}
                    onSave={handleUpdateComment}
                    onDelete={handleDeleteComment}
                />
            ))}
        </Flex>
    );
}