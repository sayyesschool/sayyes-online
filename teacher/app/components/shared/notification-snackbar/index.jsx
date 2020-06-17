import React from 'react';
import { Snackbar } from 'mdc-react';
import classnames from 'classnames';

import './index.scss';

export default function NotificationSnackbar({ type, text, ...props }) {
    return (
        <Snackbar
            label={text}
            className={classnames('notification-snackbar', {
                'notification-snackbar--error': type === 'error',
                'notification-snackbar--info': type === 'info',
                'notification-snackbar--warning': type === 'warning',
                'notification-snackbar--success': type === 'success',
            })}
            {...props}
        />
    );
}