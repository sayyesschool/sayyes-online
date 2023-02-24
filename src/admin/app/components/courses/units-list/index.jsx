import { useCallback } from 'react';
import { Link } from 'react-router-dom';

import { Button, List } from 'shared/ui-components';

import './index.scss';

export default function UnitsList({ units, onDelete }) {
    const handleClick = useCallback((event, unit) => {
        event.preventDefault();
        event.stopPropagation();

        onDelete(unit);
    }, [onDelete]);

    return (
        <List className="units-list numbered-list" navigable>
            {units.map((unit, index) =>
                <List.Item
                    key={unit.id}
                    as={Link}
                    to={unit.uri}
                    media={index + 1}
                    header={unit.title}
                    content={`${unit.lessons.length} уроков`}
                    endMedia={
                        <Button
                            icon="delete"
                            text
                            onClick={event => handleClick(event, unit)}
                        />
                    }
                />
            )}
        </List>
    );
}