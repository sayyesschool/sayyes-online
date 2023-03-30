import { useCallback } from 'react';
import classnames from 'classnames';

import { Chip, Flex, Text } from 'shared/ui-components';
import { LessonColorByType } from 'shared/data/lesson';
import { formatTime } from 'shared/utils/format';

export default function WeekTimeEvent({ event, onClick, ...props }) {
    const handleClick = useCallback(() => {
        onClick(event);
    }, [event, onClick]);

    const classNames = classnames('CalendarEvent', `CalendarEvent--${event.status}`);

    return (
        <Chip
            className={classNames}
            color={LessonColorByType[event.status]}
            onClick={onClick && handleClick}
            {...props}
        >
            <Flex className="CalendarEvent__content">
                <Text
                    className="CalendarEvent__title"
                    type="body2"
                    content={event.title}
                    color="primary.solidColor"
                />

                <Text
                    className="CalendarEvent__time"
                    type="body3"
                    content={`${formatTime(event.startTime.hours, event.startTime.minutes)} - ${formatTime(event.endTime.hours, event.endTime.minutes)}`}
                    color="primary.solidColor"
                />
            </Flex>
        </Chip>
    );
}