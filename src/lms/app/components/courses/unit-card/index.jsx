import { Card, Heading, Image, Text } from 'shared/ui-components';

import './index.scss';

export default function UnitCard({ unit, onSelectUnit, ...props }) {
    return (
        <Card
            className="UnitCard"
            onClick={onSelectUnit && (() => onSelectUnit(unit))}
            {...props}
        >
            <Image src={unit.imageUrl} alt="" />

            <Heading as="h3" type="h6">{unit.title}</Heading>

            {unit.lessons &&
                <Text as="p">{unit.lessons?.length} уроков</Text>
            }
        </Card>
    );
}