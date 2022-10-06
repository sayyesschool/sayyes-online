import { useCallback } from 'react';
import { Link } from 'react-router-dom';

import { Button, List } from 'shared/ui-components';

import './index.scss';

export default function LessonsList({ lessons, onReorder, onDelete }) {
    return (
        <List className="lesson-list numbered-list" navigable>
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
            header={lesson.title}
            content={`${lesson.exercises?.length} упражнений`}
            endMedia={<>
                {!first &&
                    <Button
                        icon="arrow_upward"
                        text
                        onClick={handleMoveUp}
                    />
                }

                {!last &&
                    <Button
                        icon="arrow_downward"
                        text
                        onClick={handleMoveDown}
                    />
                }

                {onDelete &&
                    <Button
                        icon="delete"
                        text
                        onClick={handleDelete}
                    />
                }
            </>}
        />
    );
}