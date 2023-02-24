import MonthView from './MonthView';
import WeekView from './WeekView';
import WeekTimeView from './WeekTimeView';

import './index.scss';

const ComponentByView = {
    'week': WeekView,
    'week-time': WeekTimeView,
    'month': MonthView
};

function Calendar({
    value,
    view = 'week',
    events,
    ...props
}) {
    const Component = ComponentByView[view];

    if (!Component) return null;

    return (
        <Component
            selectedDate={value}
            events={events}
            {...props}
        />
    );
}

Calendar.WeekView = WeekView;
Calendar.WeekTimeView = WeekTimeView;
Calendar.MonthView = MonthView;

export { Calendar as default, WeekView, WeekTimeView, MonthView };