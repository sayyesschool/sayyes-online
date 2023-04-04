import { Text } from 'shared/ui-components';

import useConnectedTime from 'app/hooks/useConnectedTime';
import { formatTime } from 'app/utils';

export default function ConnectedTime() {
    const connectedTime = useConnectedTime();

    return (
        <Text>{formatTime(connectedTime)}</Text>
    );
}