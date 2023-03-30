import { useCallback } from 'react';

import { useBoolean } from 'shared/hooks/state';
import Comment from 'shared/components/comment';
import { Box, Button, Heading } from 'shared/ui-components';

export default function PostComments({
    user,
    post,
    onCreate,
    onUpdate,
    onDelete
}) {
    const [isCommenting, toggleCommenting] = useBoolean(false);

    const handleCreateComment = useCallback((_, data) => {
        return onCreate(post.id, data)
            .then(() => toggleCommenting(false));
    }, [post, onCreate]);

    const handleUpdateComment = useCallback((commentId, data) => {
        return onUpdate(post.id, commentId, data);
    }, [post, onUpdate]);

    const handleDeleteComment = useCallback(commentId => {
        return onDelete(post.id, commentId);
    }, [post, onDelete]);

    return (
        <Box className="PostComments">
            {post.comments.length > 0 &&
                <Heading as="h4">Комментарии</Heading>
            }

            {post.comments.map(comment =>
                <Comment
                    key={comment.id}
                    user={user}
                    comment={comment}
                    onSave={handleUpdateComment}
                    onDelete={handleDeleteComment}
                />
            )}

            {isCommenting ?
                <Comment
                    user={user}
                    editing
                    onToggle={toggleCommenting}
                    onSave={handleCreateComment}
                />
                :
                <Button
                    className="reply-button"
                    icon="reply"
                    content="Ответить"
                    size="sm"
                    variant="plain"
                    onClick={toggleCommenting}
                />
            }
        </Box>
    );
}