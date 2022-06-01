import { Link } from 'react-router-dom';
import { Card, Header, Image } from '@fluentui/react-northstar';

import './index.scss';

export default function UnitCard({ number, unit, onSelectUnit }) {
    return (
        <Card
            className="unit-card"
            as={!onSelectUnit ? Link : undefined}
            to={!onSelectUnit ? unit.url : undefined}
            onClick={onSelectUnit && (() => onSelectUnit(unit))}
        >
            <Card.Media
                imageUrl={unit.imageUrl}
                wide
            />
            <Card.Preview>
                <Image src={unit.imageUrl} alt="" />
            </Card.Preview>

            <Card.Header>
                <Header
                    content={unit.title}
                    description={unit.lessons && `${unit.lessons?.length} уроков`}
                />
            </Card.Header>
        </Card>
    );
}