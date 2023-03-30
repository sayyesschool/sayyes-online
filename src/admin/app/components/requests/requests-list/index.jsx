import { Link } from 'react-router-dom';

import StatusIcon from 'shared/components/status-icon';
import { Avatar, List, ListItem, Text } from 'shared/ui-components';

export default function RequestsList({ requests }) {
    return (
        <List className="sy-RequestsList">
            {requests?.map(request =>
                <ListItem
                    key={request.id}
                    as={Link}
                    to={request.url}
                    decorator={
                        <StatusIcon
                            status={request.status}
                        />
                    }
                    content={<>
                        <Text type="body2" noWrap>{request.contact.name}</Text>
                        <Text type="body3" noWrap>{request.contact.phone}</Text>
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