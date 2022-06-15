import { useEffect, useRef } from 'react';
import { Alert } from '@fluentui/react-northstar';
import classnames from 'classnames';

import './index.scss';

export default function NotificationSnackbar({ type, open, text, className, onClose, ...props }) {
    const timeoutRef = useRef();

    useEffect(() => {
        if (open === true) {
            timeoutRef.current = setTimeout(() => {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
                onClose();
            }, 5000);
        }

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
        };
    }, [open]);

    const classNames = classnames('notification-alert', className);

    return (
        <Alert
            className={classNames}
            content={text}
            visible={open}
            info={type === 'info'}
            danger={type === 'error'}
            warning={type === 'warning'}
            success={type === 'success'}
            dismissible
            onVisibleChange={onClose}
            {...props}
        />
    );
}