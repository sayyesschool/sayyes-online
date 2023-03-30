import { Card, Heading, Image, Text } from 'shared/ui-components';

export default function MaterialCard({ material, ...props }) {
    return (
        <Card
            className="sy-MaterialCard"
            {...props}
        >
            <Card.Overflow>
                <Image src={material.imageUrl} />
            </Card.Overflow>

            <Heading>{material.title}</Heading>
            <Text>{material.subtitle}</Text>
        </Card>
    );
}