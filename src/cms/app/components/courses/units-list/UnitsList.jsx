import { useCallback } from 'react';
import { Link } from 'react-router-dom';

import { IconButton, List, Text } from 'shared/ui-components';

export default function UnitsList({ units, onDelete }) {
    const handleClick = useCallback((event, unit) => {
        event.preventDefault();
        event.stopPropagation();

        onDelete(unit);
    }, [onDelete]);

    return (
        <List className="UnitsList NumberedList">
            {units.map((unit, index) =>
                <List.Item
                    key={unit.id}
                    as={Link}
                    to={unit.uri}
                    // media={index + 1}
                    content={<>
                        <Text>{unit.title}</Text>
                        <Text type="body-sm">{unit.lessons.length} уроков</Text>
                    </>}
                    endAction={
                        <IconButton
                            icon="delete"
                            color="neutral"
                            size="sm"
                            variant="plain"
                            onClick={event => handleClick(event, unit)}
                        />
                    }
                />
            )}
        </List>
    );
}