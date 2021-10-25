import { useCallback, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {
    Chip,
    DataTable,
    Icon,
    IconButton,
    Typography
} from 'mdc-react';

import { formatTime } from 'shared/utils/format';
import { getWeekData, getWeekLabel } from './utils';

const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];

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
                <DataTable>
                    <DataTable.Header>
                        <DataTable.HeaderRow>
                            <DataTable.HeaderCell />

                            {data.map(date =>
                                <DataTable.HeaderCell key={date.valueOf()} className={date.isSame(todayRef.current) && 'today'}>
                                    <Typography type="overline">{date.format('dd')}, {date.date()}</Typography>
                                </DataTable.HeaderCell>
                            )}
                        </DataTable.HeaderRow>
                    </DataTable.Header>

                    <DataTable.Content>
                        {hours.map(hour =>
                            <DataTable.Row>
                                <DataTable.Cell>
                                    {formatTime(hour, 0)}
                                </DataTable.Cell>

                                {data.map(date =>
                                    <DataTable.Cell>
                                        <CalendarEvent
                                            date={date}
                                            hour={hour}
                                            eventsByDate={eventsByDate}
                                        />
                                    </DataTable.Cell>
                                )}
                            </DataTable.Row>
                        )}
                    </DataTable.Content>
                </DataTable>
            </section>
        </article>
    );
}

function CalendarEvent({ date, hour, eventsByDate }) {
    const key = date.utc().hours(hour).minutes(0).seconds(0).millisecond(0).toISOString();
    const event = eventsByDate.get(key);

    return event ? (
        <Chip
            component={Link}
            to={event.url}
            icon={<Icon>{event.icon}</Icon>}
            text={event.title}
            title={event.title}
            outlined
        />
    ) : null;
}

WeekView.defaultProps = {
    weekdayNames: Array.of(...moment.weekdaysMin().slice(1), moment.weekdaysMin()[0]),
    onChange: Function.prototype
};