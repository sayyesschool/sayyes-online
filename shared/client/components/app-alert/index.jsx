import { useCallback } from 'react';

import { useStore } from 'shared/hooks/store';
import { hideNotification } from 'shared/store/modules/notification';
import NotificationAlert from 'shared/components/notification-alert';

export default function App() {
    const [notification, actions] = useStore(state => state.notification, { hideNotification });

    const handleClose = useCallback(() => {
        actions.hideNotification();
    }, []);

    return (
        <NotificationAlert
            className="app-alert"
            type={notification.type}
            open={notification.active}
            content={notification.text}
            onClose={handleClose}
        />
    );
}