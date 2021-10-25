import { useCallback, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
    Card,
    Badge,
    Icon,
    IconButton,
    MenuSurface,
    Typography
} from 'mdc-react';

import NotificationList from 'shared/components/notification-list';

export default function NotificationMenu() {
    const notifications = [];
    const history = useHistory();
    const anchorRef = useRef();
    const [isOpen, setOpen] = useState(false);

    const handleOpenMenu = useCallback(() => {
        setOpen(true);
    }, []);

    const handleCloseMenu = useCallback(() => {
        setOpen(false);
    }, []);

    const handleClickNotification = useCallback(notification => {
        if (notification.url) {
            history.push(notification.url);
        }

        actions.updateNotification(notification.id, { read: true });
    }, []);

    const handleDeleteNotification = useCallback(notification => {
        actions.deleteNotification(notification.id);
    }, []);

    const hasNotifications = notifications.length > 0;

    return (
        <MenuSurface
            anchor={
                <IconButton
                    ref={anchorRef}
                    className="notification-button"
                    onClick={handleOpenMenu}
                >
                    <Badge value={hasNotifications ? notifications.length : undefined}>
                        <Icon>{hasNotifications ? 'notifications_active' : 'notifications_none'}</Icon>
                    </Badge>
                </IconButton>
            }
            open={isOpen}
            fixed
            onClose={handleCloseMenu}
        >
            <Card>
                <Card.Header
                    title="Уведомления"
                    graphic={
                        <Icon>{hasNotifications ? 'notifications_active' : 'notifications_none'}</Icon>
                    }
                    actions={hasNotifications &&
                        <IconButton
                            icon="clear_all"
                            title="Отметить все как прочитанные"
                            onClick={actions.deleteNotifications}
                        />
                    }
                />

                {hasNotifications ?
                    <NotificationList
                        notifications={notifications}
                        onClick={handleClickNotification}
                        onDelete={handleDeleteNotification}
                    />
                    :
                    <Card.Section primary>
                        <Typography type="body2" noMargin>Новых уведомлений пока нет</Typography>
                    </Card.Section>
                }
            </Card>
        </MenuSurface>
    );
}