import { Alert, Icon } from 'shared/ui-components';

import './index.scss';

export default function ScreenShareAlert({
    onDisableSharing,
    ...props
}) {
    return (
        <Alert
            className="screen-share-alert"
            icon={<Icon>screen_share</Icon>}
            header="Вы делитесь своим экраном"
            actions={[
                {
                    key: 'stop',
                    content: 'Остановить',
                    primary: true,
                    flat: true,
                    onClick: onDisableSharing
                }
            ]}
            info
            fitted
            {...props}
        />
    );
}