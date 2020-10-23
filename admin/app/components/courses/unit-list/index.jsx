import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
    IconButton,
    List
} from 'mdc-react';

export default function UnitList({ units, onDelete }) {
    const handleClick = useCallback((event, unit) => {
        event.preventDefault();
        event.stopPropagation();

        onDelete(unit);
    }, []);

    return (
        <List className="unit-list" twoLine imageList>
            {units.map((unit, index) =>
                <List.Item
                    key={unit.id}
                    component={Link}
                    to={unit.url}
                    graphic={<img src={STATIC_URL + unit.imageUrl} />}
                    primaryText={unit.title}
                    secondaryText={`${unit.lessons.length} уроков`}
                    meta={
                        <IconButton
                            icon="delete"
                            onClick={event => handleClick(event, unit)}
                        />
                    }
                />
            )}
        </List>
    );
}