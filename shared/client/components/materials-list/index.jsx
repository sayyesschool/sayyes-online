import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
    IconButton,
    List
} from 'mdc-react';

export default function MaterialsList({ materials, onRemove }) {
    const handleRemove = useCallback((event, materialId) => {
        event.stopPropagation();

        onRemove(materialId);
    }, []);

    return (
        <List>
            {materials.map(material =>
                <List.Item
                    key={material.id}
                    component={Link}
                    to={material.uri}
                    leadingThumbnail={<img src={material.imageUrl} />}
                    primaryText={material.title}
                    secondaryText={material.subtitle}
                    meta={onRemove &&
                        <IconButton
                            icon="remove"
                            title="Убрать курс"
                            onClick={event => handleRemove(event, material.id)}
                        />
                    }
                />
            )}
        </List>
    );
}