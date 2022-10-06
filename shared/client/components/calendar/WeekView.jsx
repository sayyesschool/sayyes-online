import { useCallback, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {
    Button,
    Label,
    Text
} from '@fluentui/react-northstar';
import classnames from 'classnames';

import Icon from 'shared/ui-components/icon';

import { getWeekData, getWeekLabel } from './utils';

WeekView.defaultProps = {
    weekdayNames: Array.of(...moment.weekdaysMin().slice(1), moment.weekdaysMin()[0]),
    onChange: Function.prototype
};

export default function WeekView({ eventsByDate }) {
    const todayRef = useRef(new Date());
    const dateRef = useRef(moment());
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
        <article className="calendar calendar--week-view">
            <header className="calendar__header">
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

            <section className="calendar__week">
                {data.map(date =>
                    <div
                        key={date.valueOf()}
                        className={classnames('calendar__day', {
                            'calendar__day--today': date.isSame(todayRef.current) && 'today'
                        })}
                    >
                        <Text className="calendar__day-name" as="div" type="overline">{date.format('dd')}, {date.date()}</Text>

                        <div className="calendar__day-events">
                            {eventsByDate.has(date.toDate().toLocaleDateString()) &&
                                <CalendarEvent
                                    event={eventsByDate.get(date.toDate().toLocaleDateString())}
                                />
                            }
                        </div>
                    </div>
                )}
            </section>
        </article>
    );
}

function CalendarEvent({ event }) {
    return (
        <Label
            component={Link}
            to={event.url}
            icon={<Icon>{event.icon}</Icon>}
            iconPosition="start"
            content={moment(event.date).format('HH:mm')}
            title={event.title}
        />
    );
}