import { useCallback } from 'react';
import classnames from 'classnames';

import { Flex, Label, Text } from 'shared/ui-components';
import { ColorByType } from 'shared/data/lesson';
import { formatTime } from 'shared/utils/format';

export default function WeekTimeEvent({ event, onClick, ...props }) {
    const handleClick = useCallback(() => {
        onClick(event);
    }, [event]);

    const classNames = classnames('calendar-event', `calendar-event--${event.status}`);

    return (
        <Label
            className={classNames}
            color={ColorByType[event.status]}
            onClick={onClick && handleClick}
            {...props}
        >
            <Flex className="calendar-event__content">
                <Text className="calendar-event__title">{event.title}</Text>
                <Text className="calendar-event__time" size="small">{formatTime(event.startTime.hours, event.startTime.minutes)} - {formatTime(event.endTime.hours, event.endTime.minutes)}</Text>
            </Flex>
        </Label>
    );
}