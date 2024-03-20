import { Avatar, Card, Flex, Heading, Image, Text } from 'shared/ui-components';

export default function UnitCard({
    number,
    unit,
    onSelectUnit,
    ...props
}) {
    return (
        <Card
            className="UnitCard"
            onClick={onSelectUnit && (() => onSelectUnit(unit))}
            {...props}
        >
            <Image src={unit.imageUrl} alt="" />

            <Card.Content>
                <Flex alignItems="center" gap="small">
                    <Avatar size="sm" content={number} />

                    <Flex dir="column">
                        <Heading
                            as="h3"
                            type="title-lg"
                            content={unit.title}
                        />

                        {unit.lessons &&
                            <Text as="p" type="body-md">{unit.lessons?.length} уроков</Text>
                        }
                    </Flex>
                </Flex>
            </Card.Content>
        </Card>
    );
}