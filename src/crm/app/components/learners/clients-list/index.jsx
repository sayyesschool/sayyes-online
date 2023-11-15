import { Link } from 'react-router-dom';

import { List, Text } from 'shared/ui-components';

export default function ClientsList({ clients }) {
    return (
        <List className="ClientsList">
            {clients.map(client =>
                <List.Item
                    key={client.id}
                    as={Link}
                    to={client.url}
                    content={<>
                        <Text type="body2">{client.fullname}</Text>
                        <Text type="body3">{client.email} {client.phone}</Text>
                    </>}
                />
            )}
        </List>
    );
}