import React from 'react';
import { Link } from 'react-router-dom';
import {
    List
} from 'mdc-react';

export default function ClientsList({ clients }) {
    return (
        <List className="clients-list" twoLine>
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