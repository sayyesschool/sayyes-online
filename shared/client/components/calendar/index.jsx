import 'moment/locale/ru';

import MonthView from './MonthView';
import WeekView from './WeekView';

import './index.scss';

function Calendar({
    value,
    view = 'week',
    events = [],
    ...props
}) {
    const eventsByDate = events.reduce((map, event) => {
        return map.set(event.date.toLocaleDateString(), event);
    }, new Map());

    if (view === 'week') {
        return (
            <WeekView
                selectedDate={value}
                eventsByDate={eventsByDate}
                {...props}
            />
        );
    }

    if (view === 'month') {
        return (
            <MonthView
                selectedDate={value}
                eventsByDate={eventsByDate}
                {...props}
            />
        );
    }
}

Calendar.WeekView = WeekView;
Calendar.MonthView = MonthView;

export { Calendar as default, WeekView, MonthView };