import { useCallback, useMemo, useRef, useState } from 'react';
import moment from 'moment';

import { getWeekData, getWeekLabel } from 'shared/libs/calendar';
import { Button, Icon, Text } from 'shared/ui-components';
import { formatTime } from 'shared/utils/format';

import WeekTimeEvent from './WeekTimeEvent';

const defaultHours = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
const defaultWeekDayNames = Array.of(...moment.weekdaysMin().slice(1), moment.weekdaysMin()[0]);

export default function WeekTimeView({
    hours = defaultHours,
    weekdayNames = defaultWeekDayNames,
    events,
    onEventClick
}) {
    const dateRef = useRef(moment());

    const [week, setWeek] = useState(dateRef.current.week());

    const handlePrevWeekButtonClick = useCallback(() => {
        setWeek(dateRef.current.subtract(1, 'week').week());
    }, []);

    const handleNextWeekButtonClick = useCallback(() => {
        setWeek(dateRef.current.add(1, 'week').week());
    }, []);

    const weekData = useMemo(() => getWeekData(dateRef.current, events), [events, week]);
    const label = getWeekLabel(dateRef.current);

    return (
        <article className="calendar calendar--week-view calendar--week-time-view">
            <header className="calendar__header">
                <Button
                    icon={<Icon>chevron_left</Icon>}
                    title="Предыдущая неделя"
                    iconOnly
                    flat
                    onClick={handlePrevWeekButtonClick}
                />

                <Text>{label}</Text>

                <Button
                    icon={<Icon>chevron_right</Icon>}
                    title="Следующая неделя"
                    iconOnly
                    flat
                    onClick={handleNextWeekButtonClick}
                />
            </header>

            <section className="calendar__week">
                <table>
                    <colgroup>
                        <col />
                        {weekData.map(day =>
                            <col
                                key={day.weekday}
                                span="1"
                                className={`day${day.isToday ? ' today' : ''}`}
                            />
                        )}
                    </colgroup>

                    <thead>
                        <tr>
                            <th scope="col" />
                            {weekData.map(day =>
                                <th
                                    key={day.weekday}
                                    scope="col"
                                    className={day.isToday ? 'today' : undefined}
                                >
                                    <Text color={day.isToday ? 'brand' : undefined}>{day.label}</Text>
                                </th>
                            )}
                        </tr>
                    </thead>

                    <tbody>
                        {hours.map(hour =>
                            <tr key={hour}>
                                <th scope="row">
                                    {formatTime(hour, 0)}
                                </th>

                                {weekData.map(day =>
                                    <td key={day.weekday}>
                                        {day.eventsByHour.get(hour)?.map((event, index, array) =>
                                            <WeekTimeEvent
                                                key={event.id}
                                                event={event}
                                                style={{
                                                    width: `${100 / array.length}%`,
                                                    height: `${event.duration * 100 / 60}%`,
                                                    top: `${event.startTime.minutes * 100 / 60}%`,
                                                    left: `${100 / array.length * index}%`
                                                }}
                                                onClick={onEventClick}
                                            />
                                        )}
                                    </td>
                                )}
                            </tr>
                        )}
                    </tbody>
                </table>
            </section>
        </article>
    );
}