import { useCallback } from 'react';
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

export default function CommentCard({
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

    const classNames = classnames('comment-card', {
        'comment-card--editing': isEditing
    });

    const author = comment.author || user;
    const isUserAuthor = user?.id === author?.id;

    return (
        <Card className={classNames} outlined={isEditing}>
            <Card.Header
                graphic={author &&
                    <Avatar
                        src={author.imageUrl}
                        text={author.initials}
                        size="small"
                    />
                }
                title={author?.fullname}
                subtitle={comment.datetimeLabel}
                actions={(isUserAuthor && !isEditing) &&
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
                            id="comment-form"
                            comment={comment}
                            onSubmit={handleSubmit}
                        />
                    </Card.Section>

                    <Card.Actions>
                        <Card.Action button>
                            <Button type="button" onClick={handleToggle}>Отменить</Button>
                        </Card.Action>

                        <Card.Action button>
                            <Button type="submit" form="comment-form" outlined>Сохранить</Button>
                        </Card.Action>
                    </Card.Actions>
                </>
                :
                <Card.Section primary>
                    <article className="comment-content" dangerouslySetInnerHTML={{ __html: comment.content }} />
                </Card.Section>
            }
        </Card>
    );
}