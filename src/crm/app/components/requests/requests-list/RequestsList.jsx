import { Link } from 'react-router-dom';

import { useSetting } from 'shared/store/settings';
import { Avatar, List, ListItem, Text } from 'shared/ui-components';

export default function RequestsList({ requests }) {
    const [requestTypes = {}] = useSetting('request.types');

    return (
        <List className="RequestsList">
            {requests?.map(request =>
                <ListItem
                    key={request.id}
                    as={Link}
                    to={request.url}
                    content={<>
                        <Text
                            type="body-md"
                            content={requestTypes[request.type]}
                            end={
                                <Text
                                    content={request.dateTimeString}
                                    type="body-sm"
                                    inline
                                />
                            }
                            noWrap
                        />

                        {request.contact &&
                            <Text
                                type="body-sm"
                                noWrap
                            >
                                {request.contact.name} · {request.contact.phone || request.contact.email}
                            </Text>
                        }
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