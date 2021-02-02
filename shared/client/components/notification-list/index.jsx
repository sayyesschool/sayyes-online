import React from 'react';
import {
    Icon,
    IconButton,
    List, ListItem
} from 'mdc-react';

import './index.scss';

export default function NotificationList({ notifications, onClick, onDelete }) {
    return (
        <List className="notification-list" twoLine dense>
            {notifications.map(notification =>
                <ListItem
                    key={notification.id}
                    activated={!notification.read}
                >
                    <ListItem.Graphic>
                        <Icon>{notification.icon}</Icon>
                    </ListItem.Graphic>

                    <ListItem.Text
                        primary={notification.title}
                        secondary={notification.publishedAt}
                        onClick={() => onClick(notification)}
                    />

                    <ListItem.Meta>
                        <IconButton
                            icon="clear"
                            onClick={() => onDelete(notification)}
                        />
                    </ListItem.Meta>
                </ListItem>
            )}
        </List >
    );
}