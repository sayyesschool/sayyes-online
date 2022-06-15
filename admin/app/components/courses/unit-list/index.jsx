import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
    Button,
    List
} from '@fluentui/react-northstar';

import Icon from 'shared/components/material-icon';

import './index.scss';

export default function UnitList({ units, onDelete }) {
    const handleClick = useCallback((event, unit) => {
        event.preventDefault();
        event.stopPropagation();

        onDelete(unit);
    }, [onDelete]);

    return (
        <List as="nav" className="unit-list numbered-list" navigable>
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
                            icon={<Icon>delete</Icon>}
                            iconOnly
                            text
                            onClick={event => handleClick(event, unit)}
                        />
                    }
                />
            )}
        </List>
    );
}