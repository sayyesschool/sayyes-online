import React from 'react';
import { Link } from 'react-router-dom';
import {
    Avatar,
    Icon,
    List
} from 'mdc-react';

export default function RequestList({ requests }) {
    return (
        <List className="request-list" twoLine>
            {requests.map(request =>
                <List.Item
                    key={request.id}
                    component={Link}
                    to={'/requests'}
                    graphic={<Icon>{request.statusIcon}</Icon>}
                    primaryText={`${request.contact.name} • ${request.contact.phone}`}
                    secondaryText={request.statusLabel}
                    meta={request.manager && <Avatar text={request.manager.initials} title={request.manager.fullname} />}
                />
            )}
        </List>
    );
}