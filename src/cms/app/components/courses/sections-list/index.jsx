import { useCallback } from 'react';
import { Link } from 'react-router-dom';

import { IconButton, List, Text } from 'shared/ui-components';
import { wordEnding } from 'shared/utils/format';

const exerciseWordEnding = wordEnding('упражнени', ['е', 'я', 'й']);

export default function SectionsList({ sections, onReorder, onDelete }) {
    return (
        <List className="SectionsList NumberedList">
            {sections.map((section, index) =>
                <ListItem
                    key={section.id}
                    index={index}
                    section={section}
                    first={index === 0}
                    last={index === sections.length - 1}
                    onMove={onReorder}
                    onDelete={onDelete}
                />
            )}
        </List>
    );
}

function ListItem({ index, section, first, last, onMove, onDelete }) {
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

        onDelete(section);
    }, [section, onDelete]);

    return (
        <List.Item
            key={section.id}
            as={Link}
            to={section.uri}
            media={index + 1}
            content={<>
                <Text>{section.title}</Text>
                <Text type="body2">{section.exercises?.length} {exerciseWordEnding(section.exercises?.length)}</Text>
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