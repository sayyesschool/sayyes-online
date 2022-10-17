import { Link } from 'react-router-dom';

import { List } from 'shared/ui-components';

export default function ClientsList({ clients }) {
    return (
        <List className="clients-list">
            {clients.map(client =>
                <List.Item
                    key={client.id}
                    as={Link}
                    to={client.url}
                    header={client.fullname}
                    content={`${client.email} ${client.phone}`}
                />
            )}
        </List>
    );
}