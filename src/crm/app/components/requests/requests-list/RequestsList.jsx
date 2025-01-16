import { Link } from 'react-router-dom';

import { Avatar, List, ListItem, Text } from 'shared/ui-components';

export default function RequestsList({ requests }) {
    return (
        <List className="RequestsList">
            {requests?.map(request =>
                <ListItem
                    key={request.id}
                    as={Link}
                    to={request.url}
                    content={<>
                        <Text type="body-md" noWrap>{request.contact.name}</Text>
                        <Text type="body-sm" noWrap>{request.contact.phone || request.contact.email}</Text>
                    </>}
                    endAction={request.manager &&
                        <Avatar
                            text={request.manager.initials}
                            imageUrl={request.manager.imageUrl}
                            size="sm"
                        />
                    }
                />
            )}
        </List>
    );
}