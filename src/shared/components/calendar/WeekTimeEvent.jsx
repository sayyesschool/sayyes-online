import { useCallback } from 'react';
import classnames from 'classnames';

import { LessonColorByType } from 'shared/data/lesson';
import { Chip, Text } from 'shared/ui-components';
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
            sx={{
                position: 'absolute',
                padding: '0 4px',
                maxWidth: 'unset'
            }}
            {...props}
        >
            <Text
                className="CalendarEvent__title"
                as="span"
                type="body-md"
                content={event.title}
                color="primary.solidColor"
            />

            <Text
                className="CalendarEvent__time"
                as="span"
                type="body-xs"
                color="primary.solidColor"
            >
                {formatTime(event.startTime.hours, event.startTime.minutes)}
                -
                {formatTime(event.endTime.hours, event.endTime.minutes)}
            </Text>
        </Chip>
    );
}