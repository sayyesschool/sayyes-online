import { Link } from 'react-router-dom';

import { List } from 'shared/ui-components';

export default function ManagersList({ managers }) {
    return (
        <List className="ist">
            {managers.map(manager =>
                <List.Item
                    key={manager.id}
                    as={Link}
                    to={manager.url}
                    content={<>
                        <Text type="body2">{manager.fullname}</Text>
                        <Text type="body3">{manager.email}</Text>
                        <Text type="body3">{manager.phone}</Text>
                    </>}
                />
            )}
        </List>
    );
}