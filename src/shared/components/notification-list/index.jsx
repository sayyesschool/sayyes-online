import { IconButton, List } from 'shared/ui-components';

import './index.scss';

export default function NotificationsList({ notifications, onClick, onDelete }) {
    return (
        <List className="NotificationsList">
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