import { useCallback } from 'react';

import { useStore } from 'shared/hooks/store';
import { hideNotification } from 'shared/store/modules/notification';
import NotificationAlert from 'shared/components/notification-alert';

export default function AppAlert() {
    const [notification, actions] = useStore(state => state.notification, { hideNotification });

    const handleClose = useCallback(() => {
        actions.hideNotification();
    }, []);

    return (
        <NotificationAlert
            className="AppAlert"
            type={notification.type}
            //open={notification.active}
            content={notification.text}
            open={false}
            onClose={handleClose}
        />
    );
}