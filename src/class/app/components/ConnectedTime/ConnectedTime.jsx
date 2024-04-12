import { Text } from 'shared/ui-components';

import useConnectedTime from 'class/hooks/useConnectedTime';
import { formatTime } from 'class/utils';

export default function ConnectedTime() {
    const connectedTime = useConnectedTime();

    return (
        <Text>{formatTime(connectedTime)}</Text>
    );
}