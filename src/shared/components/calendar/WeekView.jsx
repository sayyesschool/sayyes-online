import { useCallback, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { getWeekData, getWeekLabel } from 'shared/libs/calendar';
import datetime from 'shared/libs/datetime';
import { Button, Icon, Label, Text } from 'shared/ui-components';
import classnames from 'shared/utils/classnames';

WeekView.defaultProps = {
    weekdayNames: Array.of(...datetime.weekdaysMin().slice(1), datetime.weekdaysMin()[0]),
    onChange: Function.prototype
};

export default function WeekView({ eventsByDate }) {
    const todayRef = useRef(new Date());
    const dateRef = useRef(datetime());

    const [week, setWeek] = useState(dateRef.current.month());

    const handlePrevWeekButtonClick = useCallback(() => {
        setWeek(dateRef.current.subtract(1, 'week').week());
    }, []);

    const handleNextWeekButtonClick = useCallback(() => {
        setWeek(dateRef.current.add(1, 'week').week());
    }, []);

    const data = useMemo(() => getWeekData(dateRef.current), [week]);
    const label = getWeekLabel(dateRef.current);

    return (
        <>
            <header className="Calendar__header">
                <Button.Group
                    buttons={[
                        {
                            icon: <Icon>chevron_left</Icon>,
                            key: 'prev',
                            title: 'Предыдущая неделя',
                            iconOnly: true,
                            onClick: handlePrevWeekButtonClick
                        },
                        {
                            key: 'current',
                            content: label
                        },
                        {
                            icon: <Icon>chevron_right</Icon>,
                            key: 'prev',
                            title: 'Следующая неделя',
                            iconOnly: true,
                            onClick: handleNextWeekButtonClick
                        }
                    ]}
                />
            </header>

            <section className="Calendar__week">
                {data.map(date =>
                    <div
                        key={date.valueOf()}
                        className={classnames('Calendar__day', {
                            'Calendar__day--today': date.isSame(todayRef.current) && 'today'
                        })}
                    >
                        <Text
                            className="Calendar__day-name" as="div"
                            type="overline"
                        >{date.format('dd')}, {date.date()}</Text>

                        <div className="Calendar__day-events">
                            {eventsByDate.has(date.toDate().toLocaleDateString()) &&
                                <CalendarEvent
                                    event={eventsByDate.get(date.toDate().toLocaleDateString())}
                                />
                            }
                        </div>
                    </div>
                )}
            </section>
        </>
    );
}

function CalendarEvent({ event }) {
    return (
        <Label
            component={Link}
            to={event.url}
            icon={<Icon>{event.icon}</Icon>}
            iconPosition="start"
            content={datetime(event.date).format('HH:mm')}
            title={event.title}
        />
    );
}