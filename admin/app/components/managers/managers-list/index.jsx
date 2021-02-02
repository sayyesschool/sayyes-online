import React from 'react';
import { Link } from 'react-router-dom';
import {
    List
} from 'mdc-react';

export default function ManagersList({ managers }) {
    return (
        <List className="managers-list" twoLine>
            {managers.map(manager =>
                <List.Item
                    key={manager.id}
                    component={Link}
                    to={manager.url}
                    primaryText={manager.fullname}
                    secondaryText={`${manager.email} ${manager.phone}`}
                />
            )}
        </List>
    );
}