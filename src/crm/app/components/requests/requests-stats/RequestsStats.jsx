import { useRef } from 'react';

import { Card, Text } from '@/shared/ui-components';
import { isToday } from 'shared/libs/datetime';

import styles from './RequestsStats.module.scss';

export default function RequestsStats({ requests }) {
    const requestsRef = useRef(requests);

    const todayRequestsCount = requestsRef.current.filter(request => isToday(request.createdAt)).length;

    return (
        <div className={styles.root}>
            <Card>
                <Card.Content>
                    <Text level="body-md">Заявок сегодня</Text>
                    <Text level="h3">{todayRequestsCount}</Text>
                </Card.Content>
            </Card>
        </div>
    );
}