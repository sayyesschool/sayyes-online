import { Link } from 'react-router-dom';
import { Card, Grid, Image, Text } from '@fluentui/react-northstar';

export default function MaterialGridList({ materials }) {
    return (
        <Grid
            className="material-grid-list"
            columns="6"
            content={materials.map(material =>
                <Card
                    key={material.id}
                    as={Link}
                    to={material.uri}
                >
                    <Card.Preview>
                        <Image src={material.imageUrl} alt="" />
                    </Card.Preview>

                    <Card.Header>
                        <Text>{material.title}</Text>
                    </Card.Header>
                </Card>
            )}
        />
    );
}