import { useCallback } from 'react';

import { useBoolean } from 'shared/hooks/state';
import { Button, Flex } from 'shared/ui-components';

import TaskComment from 'crm/components/tasks/task-comment';

export default function TaskComments({ user, comments, setComments }) {
    const [isCommenting, toggleCommenting] = useBoolean(false);

    const handleCreateComment = useCallback(data => {
        const newComment = {
            content: data,
            authorId: user.id,
            createdAt: new Date().toISOString()
        };

        setComments(prev => [newComment, ...prev]);
    }, [setComments, user]);

    const handleUpdateComment = useCallback((data, commentId) => {
        setComments(prev => {
            return prev.map(comment => {
                if (comment.id === commentId) {
                    return { ...comment, content: data };
                }

                return comment;
            });
        });
    }, [setComments]);

    const handleDeleteComment = useCallback(commentId => {
        return setComments(prev => {
            return prev.filter(comment => comment.id !== commentId);
        });
    }, [setComments]);

    return (
        <Flex gap="smaller" column>
            {isCommenting ? (
                <TaskComment
                    user={user}
                    toggleCommenting={toggleCommenting}
                    editing
                    onSave={handleCreateComment}
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
                <TaskComment
                    key={comment.id}
                    user={user}
                    comment={comment}
                    onSave={handleUpdateComment}
                    onDelete={handleDeleteComment}
                />
            ))}
        </Flex>
    );
}