import { useCallback, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {
    Chip,
    Icon,
    IconButton,
    Typography
} from 'mdc-react';
import classnames from 'classnames';

import { formatTime } from 'shared/utils/format';
import { getWeekData, getWeekLabel } from './utils';

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
                <IconButton onClick={handlePrevWeekButtonClick}>
                    <Icon>chevron_left</Icon>
                </IconButton>

                <Typography element="span" noMargin>{label}</Typography>

                <IconButton onClick={handleNextWeekButtonClick}>
                    <Icon>chevron_right</Icon>
                </IconButton>
            </header>

            <section className="calendar__week">
                {data.map(date =>
                    <div
                        key={date.valueOf()}
                        className={classnames('calendar__day', {
                            'calendar__day--today': date.isSame(todayRef.current) && 'today'
                        })}
                    >
                        <Typography className="calendar__day-name" element="div" type="overline">{date.format('dd')}, {date.date()}</Typography>

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
        <Chip
            component={Link}
            to={event.url}
            icon={<Icon>{event.icon}</Icon>}
            text={moment(event.date).format('HH:mm')}
            title={event.title}
            outlined
        />
    );
}

WeekView.defaultProps = {
    weekdayNames: Array.of(...moment.weekdaysMin().slice(1), moment.weekdaysMin()[0]),
    onChange: Function.prototype
};