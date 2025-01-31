import classnames from 'shared/utils/classnames';

import MonthView from './MonthView';
import WeekTimeView from './WeekTimeView';
import WeekView from './WeekView';

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

    const classNames = classnames('Calendar', `Calendar--${view}`);

    return (
        <div className={classNames}>
            <Component
                selectedDate={value}
                events={events}
                {...props}
            />
        </div>
    );
}

Calendar.WeekView = WeekView;
Calendar.WeekTimeView = WeekTimeView;
Calendar.MonthView = MonthView;

export { Calendar as default, MonthView, WeekTimeView, WeekView };