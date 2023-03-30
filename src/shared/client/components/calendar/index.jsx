import classnames from 'classnames';

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

export { Calendar as default, WeekView, WeekTimeView, MonthView };