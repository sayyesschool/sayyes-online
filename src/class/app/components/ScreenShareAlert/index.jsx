import { Alert, Button, Icon } from 'shared/ui-components';

import './index.scss';

export default function ScreenShareAlert({
    start,
    onDisableSharing,
    ...props
}) {
    return (
        <Alert
            className="ScreenShareAlert"
            start={<Icon name="screen_share" />}
            content="Вы делитесь своим экраном"
            end={
                <Button
                    content="Остановить"
                    variant="soft"
                    size="sm"
                    onClick={onDisableSharing}
                />
            }
            variant="soft"
            color="primary"
            {...props}
        />
    );
}