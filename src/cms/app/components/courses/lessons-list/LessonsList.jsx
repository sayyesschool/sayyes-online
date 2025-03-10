import { useCallback } from 'react';
import { Link } from 'react-router-dom';

import { IconButton, List, Text } from 'shared/ui-components';
import { wordEnding } from 'shared/utils/format';

const sectionWordEnding = wordEnding('секци', ['я', 'и', 'й']);

export default function LessonsList({ lessons, onReorder, onDelete }) {
    return (
        <List className="LessonList NumberedList">
            {lessons.map((lesson, index) =>
                <ListItem
                    key={lesson.id}
                    index={index}
                    lesson={lesson}
                    first={index === 0}
                    last={index === lessons.length - 1}
                    onMove={onReorder}
                    onDelete={onDelete}
                />
            )}
        </List>
    );
}

function ListItem({ index, lesson, first, last, onMove, onDelete }) {
    const handleMoveUp = useCallback(event => {
        event.preventDefault();
        event.stopPropagation();

        onMove(index, -1);
    }, [index, onMove]);

    const handleMoveDown = useCallback(event => {
        event.preventDefault();
        event.stopPropagation();

        onMove(index, 1);
    }, [index, onMove]);

    const handleDelete = useCallback(event => {
        event.preventDefault();
        event.stopPropagation();

        onDelete(lesson);
    }, [lesson, onDelete]);

    return (
        <List.Item
            key={lesson.id}
            as={Link}
            to={lesson.uri}
            media={index + 1}
            content={<>
                <Text>{lesson.title}</Text>
                <Text type="body-sm">{lesson.sections.length} {sectionWordEnding(lesson.sections.length)}</Text>
            </>}
            endAction={<>
                {!first &&
                    <IconButton
                        icon="arrow_upward"
                        color="neutral"
                        size="sm"
                        variant="plain"
                        onClick={handleMoveUp}
                    />
                }

                {!last &&
                    <IconButton
                        icon="arrow_downward"
                        color="neutral"
                        size="sm"
                        variant="plain"
                        onClick={handleMoveDown}
                    />
                }

                {onDelete &&
                    <IconButton
                        icon="delete"
                        color="neutral"
                        size="sm"
                        variant="plain"
                        onClick={handleDelete}
                    />
                }
            </>}
        />
    );
}