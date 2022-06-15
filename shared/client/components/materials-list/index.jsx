import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Button, list } from '@fluentui/react-northstar';

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
                    as={Link}
                    to={material.uri}
                    media={<img src={material.imageUrl} />}
                    header={material.title}
                    content={material.subtitle}
                    endMedia={onRemove &&
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