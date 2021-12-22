import { Link } from 'react-router-dom';
import {
    Avatar,
    Card
} from 'mdc-react';

import './index.scss';

export default function UnitCard({ number, unit, onSelectUnit }) {
    return (
        <Card
            className="unit-card"
            component={!onSelectUnit ? Link : undefined}
            to={!onSelectUnit ? unit.url : undefined}
            onClick={onSelectUnit && (() => onSelectUnit(unit))}
        >
            <Card.Media
                imageUrl={unit.imageUrl}
                wide
            />

            <Card.Header
                graphic={<Avatar text={number} size="medium" />}
                title={unit.title}
                subtitle={unit.lessons && `${unit.lessons?.length} уроков`}
            />
        </Card>
    );
}