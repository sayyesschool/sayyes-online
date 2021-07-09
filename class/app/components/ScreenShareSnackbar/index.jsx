import React from 'react';
import {
    Snackbar,
    Button,
    Icon
} from 'mdc-react';

import './index.scss';

export default function ScreenShareSnackbar({
    onDisableSharing,
    ...props
}) {
    return (
        <Snackbar
            className="screen-sharing-snackbar"
            icon={<Icon>screen_share</Icon>}
            label="Вы делитесь своим экраном"
            action={
                <Button onClick={onDisableSharing}>Остановить</Button>
            }
            leading
            dismissible={false}
            {...props}
        />
    );
}