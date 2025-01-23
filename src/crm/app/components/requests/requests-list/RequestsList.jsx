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
                    content={request.contact && <>
                        <Text
                            type="body-md"
                            content={request.contact.name}
                            noWrap
                        />

                        <Text
                            type="body-sm"
                            content={request.contact.phone || request.contact.email}
                            noWrap
                        />
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