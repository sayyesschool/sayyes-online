import { useEffect, useState } from 'preact/hooks';

import { Item } from 'shared/custom-components';
import cn from 'shared/utils/classnames';

import styles from './ListView.module.scss';

export default function ListView({
    data,
    onEventClick
}) {
    const [activeDate, setActiveDate] = useState();

    useEffect(() => {
        setActiveDate(data.find(date => date.isToday) ?? data[0]);
    }, [data]);

    return (
        <div className={styles.root}>
            <div className={styles.header}>
                {data.map(date =>
                    <div
                        key={date.valueOf()}
                        className={cn(styles.day, date.isToday && styles.today, date === activeDate && styles.active)}
                    >
                        <button onClick={() => setActiveDate(date)}>
                            {date.label}

                            {date.events.length > 0 &&
                                <span>{date.events.length}</span>
                            }
                        </button>
                    </div>
                )}
            </div>

            <div className={styles.content}>
                <div className="grid grid-3-md grid-2-sm gap-m">
                    {activeDate?.events.map(meeting =>
                        <div
                            key={meeting}
                            className="meeting-card card card--sm card--hover"
                            onClick={() => onEventClick(meeting)}
                        >
                            <div className="card__header">
                                <div className="tags">
                                    <span className="tag tag--outlined">{meeting.simpleLevelLabel}</span>

                                    <span
                                        className={`tag tag--${meeting.online ? 'yellow' : 'purple'}`}
                                    >
                                        {meeting.online ? 'Онлайн' : 'Оффлайн'}
                                    </span>
                                </div>

                                <p className="card__subtitle">{meeting.datetime}</p>
                                <h3 className="card__title">{meeting.title}</h3>

                                <ul className="list gap-xs">
                                    {meeting.host &&
                                        <Item
                                            content={meeting.host.fullname}
                                            iconClassName="teacher-icon"
                                            icon
                                        />
                                    }

                                    <Item
                                        content={meeting.durationLabel}
                                        iconClassName="time-icon"
                                        icon
                                    />
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}