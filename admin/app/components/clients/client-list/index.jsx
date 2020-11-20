import React from 'react';
import { Link } from 'react-router-dom';
import {
    List
} from 'mdc-react';

export default function ClientList({ clients }) {
    return (
        <List className="client-list" twoLine>
            {clients.map(client =>
                <List.Item
                    key={client.id}
                    component={Link}
                    to={client.url}
                    primaryText={client.fullname}
                    secondaryText={`${client.email} ${client.phone}`}
                />
            )}
        </List>
    );
}