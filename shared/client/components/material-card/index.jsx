import { Link } from 'react-router-dom';
import {
    Card
} from 'mdc-react';

import './index.scss';

export default function MaterialCard({ material, ...props }) {
    return (
        <Card
            component={Link}
            to={material.url}
            className="material-card"
            outlined {...props}
        >
            <Card.Media imageUrl={material.imageUrl} wide>
                <Card.Header
                    title={material.title}
                    subtitle={material.subtitle}
                />
            </Card.Media>
        </Card>
    );
}