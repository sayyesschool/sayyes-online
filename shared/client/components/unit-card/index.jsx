import { Link } from 'react-router-dom';

import { Card, Image, Text } from 'shared/ui-components';

import './index.scss';

export default function UnitCard({ unit, onSelectUnit }) {
    return (
        <Card
            className="unit-card"
            as={!onSelectUnit ? Link : undefined}
            to={!onSelectUnit ? unit.uri : undefined}
            onClick={onSelectUnit && (() => onSelectUnit(unit))}
        >
            <Card.Preview>
                <Image src={unit.imageUrl} alt="" />
            </Card.Preview>

            <Card.Header fitted>
                <Text as="h3">{unit.title}</Text>

                {unit.lessons &&
                    <Text as="p">{unit.lessons?.length} уроков</Text>
                }
            </Card.Header>
        </Card>
    );
}