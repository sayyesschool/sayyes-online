import React from 'react';
import { Link } from 'react-router-dom';
import {
    Avatar,
    Icon,
    List
} from 'mdc-react';

export default function RequestsList({ requests }) {
    return (
        <List className="requests-list" twoLine>
            {requests.map(request =>
                <List.Item
                    key={request.id}
                    component={Link}
                    to={request.url}
                    graphic={<Icon>{request.statusIcon}</Icon>}
                    primaryText={`${request.contact.name}`}
                    secondaryText={request.contact.phone}
                    meta={request.manager &&
                        <Avatar
                            text={request.manager.initials}
                            title={request.manager.fullname}
                        />
                    }
                />
            )}
        </List>
    );
}