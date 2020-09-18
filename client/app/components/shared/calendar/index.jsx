import React from 'react';
import moment from 'moment';
import 'moment/locale/ru';

import MonthView from './MonthView';
import WeekView from './WeekView';

import './index.scss';

export default function Calendar({
    value,
    view = 'week',
    events = [],
    ...props
}) {
    const eventsByDate = events.reduce((map, event) => {
        const dateString = moment(event.date).format('YYYY-MM-DD');
        const events = map.get(dateString) || [];

        events.push(event);

        return map.set(dateString, events);
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