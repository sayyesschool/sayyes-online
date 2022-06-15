import { Segment } from '@fluentui/react-northstar';

import './index.scss';

export default function MaterialContent({ material, item, props }) {
    return (
        <Segment className="material-content" outlined {...props}>
            {item ?
                <iframe src={item.documentUrl} />
                :
                <img src={material.imageUrl} />
            }
        </Segment>
    );
}