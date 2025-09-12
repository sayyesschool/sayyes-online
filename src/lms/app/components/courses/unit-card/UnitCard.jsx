import { useUnitProgress } from 'shared/hooks/courses';
import {
    Avatar,
    Card,
    CircularProgress,
    Flex,
    Heading,
    Icon,
    Image,
    Text
} from 'shared/ui-components';

export default function UnitCard({
    number,
    unit,
    onSelectUnit,
    ...props
}) {
    const progress = useUnitProgress(unit);

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

                    {progress !== undefined && (
                        <CircularProgress
                            value={progress}
                            thickness={3}
                            size="md"
                            determinate
                        >
                            {progress === 100 ?
                                <Icon name="done_all" /> :
                                <Text type="body-sm">{progress}%</Text>}

                        </CircularProgress>
                    )}
                </Flex>
            </Card.Content>
        </Card>
    );
}