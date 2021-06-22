import React from 'react';
import {
    Banner,
    Button,
    Icon
} from 'mdc-react';

import './index.scss';

export default function ScreenShareButton({
    onDisableSharing,
    ...props
}) {
    return (
        <Banner
            className="screen-sharing-banner"
            icon={<Icon>screen_share</Icon>}
            text="Вы делитесь своим экраном"
            action={
                <Button onClick={onDisableSharing}>Остановить</Button>
            }
            centered
            {...props}
        />
    );
}