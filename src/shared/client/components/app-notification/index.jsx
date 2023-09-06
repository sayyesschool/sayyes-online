import { useCallback } from 'react';

import { useStore } from 'shared/hooks/store';
import { hideNotification } from 'shared/store/modules/notification';
import { Snackbar } from 'shared/ui-components';

import './index.scss';

const TypeToColor = {
    'success': 'success',
    'error': 'danger'
};

export default function AppNotification() {
    const [notification, actions] = useStore(state => state.notification, { hideNotification });

    const handleClose = useCallback((event, reason) => {
        actions.hideNotification();
    }, []);

    return (
        <Snackbar
            className="AppNotification"
            open={notification.active}
            autoHideDuration={3000}
            content={notification.text}
            color={TypeToColor[notification.type]}
            size="lg"
            variant="solid"
            onClose={handleClose}
        />
    );
}