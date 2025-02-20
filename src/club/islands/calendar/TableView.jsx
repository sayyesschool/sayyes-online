import { useCallback } from 'preact/hooks';

import { formatTime } from 'shared/utils/format';

import { defaultHours } from './data';

import styles from './TableView.module.scss';

export default function TableView({
    data,
    hours = defaultHours,
    onEventClick
}) {
    return (
        <div className={styles.root}>
            <table>
                <colgroup>
                    <col />

                    {data.map(day =>
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

                        {data.map(day =>
                            <th
                                key={day.weekday}
                                scope="col"
                            >
                                <span className={day.isToday && styles.today}>
                                    {day.label}
                                </span>
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

                            {data.map(day =>
                                <td key={day.weekday}>
                                    {day.eventsByHour.get(hour)?.map((event, index, array) =>
                                        <Event
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
        </div>
    );
}

function Event({ event, onClick, ...props }) {
    const handleClick = useCallback(() => {
        onClick?.(event);
    }, [event, onClick]);

    return (
        <button
            className={styles.event}
            data-id={event.id}
            onClick={handleClick}
            {...props}
        >
            <span className={styles.title}>
                {event.title}
            </span>

            <span className={styles.level}>
                {event.simpleLevelLabel}
            </span>
        </button>
    );
}