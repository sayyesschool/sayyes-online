import {
    IconButton,
    List
} from 'mdc-react';

import './index.scss';

export default function NotificationList({ notifications, onClick, onDelete }) {
    return (
        <List className="notification-list">
            {notifications.map(notification =>
                <List.Item
                    key={notification.id}
                    leadingIcon={notification.icon}
                    primaryText={notification.title}
                    secondaryText={notification.publishedAt}
                    activated={!notification.read}
                    trailingIcon={
                        <IconButton
                            icon="clear"
                            onClick={() => onDelete(notification)}
                        />
                    }
                    onClick={() => onClick(notification)}
                />
            )}
        </List>
    );
}