import React, { useRef, useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import classnames from 'classnames';
import {
    Chip,
    Icon,
    IconButton,
    Typography
} from 'mdc-react';

import { getWeekData, getWeekLabel } from './utils';

export default function WeekView({ selectedDate, eventsByDate }) {
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
                <IconButton onClick={handlePrevWeekButtonClick}>
                    <Icon>chevron_left</Icon>
                </IconButton>

                <Typography element="span" noMargin>{label}</Typography>

                <IconButton onClick={handleNextWeekButtonClick}>
                    <Icon>chevron_right</Icon>
                </IconButton>
            </header>

            <section className="calendar__week">
                {data.map((date, index) =>
                    <CalendarDay
                        key={date.valueOf()}
                        date={date}
                        isToday={date.isSame(todayRef.current)}
                        events={eventsByDate.get(date.format('YYYY-MM-DD'))}
                    />
                )}
            </section>
        </article>
    );
}

function CalendarDay({ date, isToday, events }) {
    const classNames = classnames('calendar__day', {
        'calendar__day--today': isToday,
        'calendar__day--has-events': events
    });

    return (
        <div className={classNames}>
            <div className="calendar__day__title">
                <Typography element="span" variant="headline6">{date.date()}</Typography>
                <Typography element="span" variant="overline">{date.format('dd')}</Typography>
            </div>

            <div className="calendar__day__content">
                {events && events.map(event =>
                    <Chip
                        key={event.id}
                        component={Link}
                        to={event.url}
                        className="calendar-event-chip"
                        text="Урок"
                    />
                )}
            </div>
        </div>
    );
}

WeekView.defaultProps = {
    weekdayNames: Array.of(...moment.weekdaysMin().slice(1), moment.weekdaysMin()[0]),
    onChange: Function.prototype
};