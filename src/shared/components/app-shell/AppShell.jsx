import { useMemo } from 'react';

import AppNotification from 'shared/components/app-notification';
import UI from 'shared/contexts/ui';
import { useNotificationActions } from 'shared/hooks/notification';
import cn from 'shared/utils/classnames';

import styles from './AppShell.module.scss';

export default function AppShell({ store, theme, className, children, ...props }) {
    const { hideNotification, showNotification } = useNotificationActions();

    const contextValue = useMemo(() => ({
        showNotification,
        hideNotification
    }), [showNotification, hideNotification]);

    return (
        <UI.Provider value={contextValue}>
            <div className={cn(className, styles.root)} {...props}>
                {children}
            </div>

            <AppNotification />
        </UI.Provider>
    );
}