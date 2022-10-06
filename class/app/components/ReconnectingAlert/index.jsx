import { Alert } from '@fluentui/react-northstar';

import Icon from 'shared/ui-components/icon';

export default function ReconnectingAlert() {
    return (
        <Alert
            icon={<Icon>error</Icon>}
            header="Connection lost"
            content="Reconnecting..."
        />
    );
}