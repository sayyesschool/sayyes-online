import { Link } from 'react-router-dom';
import { Image, List } from '@fluentui/react-northstar';

export default function MaterialsList({ materials }) {
    return (
        <List className="materials-list">
            {materials.map(material =>
                <List.Item
                    key={material.id}
                    component={Link}
                    to={material.url}
                    media={
                        <Image src={material.imageUrl} alt="" />
                    }
                    header={material.title}
                />
            )}
        </List>
    );
}