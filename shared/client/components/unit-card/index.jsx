import React from 'react';
import { Link } from 'react-router-dom';
import {
    Avatar,
    Card
} from 'mdc-react';

export default function UnitCard({ number, unit, onSelectUnit }) {
    return (
        <Card
            component={!onSelectUnit ? Link : undefined}
            to={!onSelectUnit ? unit.uri : undefined}
            outlined
            onClick={onSelectUnit && (() => onSelectUnit(unit))}
        >
            <Card.Media
                imageUrl={unit.imageUrl}
                wide
            />

            <Card.Header
                graphic={<Avatar text={number} />}
                title={unit.title}
                subtitle={unit.lessons && `${unit.lessons?.length} уроков`}
            />
        </Card>
    );
}