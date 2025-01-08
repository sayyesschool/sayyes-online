import { useMemo } from 'react';

import AppNotification from 'shared/components/app-notification';
import cn from 'shared/utils/classnames';

import UI from 'cms/contexts/ui';
import { useStore } from 'crm/hooks/store';

import styles from './AppShell.module.scss';

export default function AppShell({ store, theme, className, children, ...props }) {
    const [{ hideNotification, showNotification }] = useStore('notification');

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