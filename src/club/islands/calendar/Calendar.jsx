import { useCallback, useMemo, useRef, useState } from 'preact/hooks';

import { Icon, Text } from 'shared/custom-components';
import { getWeekData, getWeekLabel } from 'shared/libs/calendar';
import datetime from 'shared/libs/datetime';

import ListView from './ListView';
import TableView from './TableView';

import styles from './Calendar.module.scss';

const views = {
    'list': ListView,
    'table': TableView
};

export default function Calendar({
    events,
    view: defaultView = 'list',
    ...props
}) {
    const dateRef = useRef(datetime());

    const [week, setWeek] = useState(dateRef.current.week());
    const [view, setView] = useState(defaultView);

    const data = useMemo(() => getWeekData(dateRef.current, events), [events, week]);

    const handlePrevWeekButtonClick = useCallback(() => {
        setWeek(dateRef.current.subtract(1, 'week').week());
    }, []);

    const handleNextWeekButtonClick = useCallback(() => {
        setWeek(dateRef.current.add(1, 'week').week());
    }, []);

    const View = views[view];

    if (!View) return null;

    const label = getWeekLabel(dateRef.current);

    return (
        <div className={styles.root}>
            <header className={styles.header}>
                <button
                    className={styles.button}
                    title="Предыдущая неделя"
                    onClick={handlePrevWeekButtonClick}
                >
                    <Icon name="chevron_left" />
                </button>

                <Text>{label}</Text>

                <button
                    className={styles.button}
                    title="Следующая неделя"
                    onClick={handleNextWeekButtonClick}
                >
                    <Icon name="chevron_right" />
                </button>
            </header>

            <div className={styles.body}>
                <View
                    events={events}
                    data={data}
                    {...props}
                />
            </div>
        </div>
    );
}