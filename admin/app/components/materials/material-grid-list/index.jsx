import { Link } from 'react-router-dom';
import {
    Card,
    LayoutGrid
} from 'mdc-react';

export default function MaterialGridList({ materials }) {
    return (
        <LayoutGrid className="material-grid-list">
            {materials.map(material =>
                <LayoutGrid.Cell key={material.id} span="2">
                    <Card component={Link} to={material.uri}>
                        <img src={material.imageUrl} />

                        <Card.Header
                            title={material.title}
                        />
                    </Card>
                </LayoutGrid.Cell>
            )}
        </LayoutGrid>
    );
}