import { useCallback } from 'react';
import { Link } from 'react-router-dom';

import { IconButton, Image, List } from 'shared/ui-components';

export default function MaterialsList({ materials, onRemove }) {
    const handleRemove = useCallback((event, materialId) => {
        event.stopPropagation();

        onRemove(materialId);
    }, []);

    return (
        <List className="MaterialsList">
            {materials?.map(material =>
                <List.Item
                    key={material.id}
                    as={Link}
                    to={material.uri}
                    media={
                        <Image src={material.imageUrl} alt="" />
                    }
                    content={<>
                        <Text type="body1">{material.subtitle}</Text>
                        <Text type="body2">{material.title}</Text>
                    </>}
                    endMedia={onRemove &&
                        <IconButton
                            icon="remove"
                            title="Убрать курс"
                            color="danger"
                            size="sm"
                            onClick={event => handleRemove(event, material.id)}
                        />
                    }
                />
            )}
        </List>
    );
}