import {
    Card
} from 'mdc-react';

import './index.scss';

export default function MaterialContent({ material, item, props }) {
    return (
        <Card className="material-content" outlined {...props}>
            {item ?
                <iframe src={item.documentUrl} />
                :
                <img src={material.imageUrl} />
            }
        </Card>
    );
}