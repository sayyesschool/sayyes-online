import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { getMonthData } from 'shared/libs/calendar';
import datetime from 'shared/libs/datetime';
import { Button, Select, Text } from 'shared/ui-components';
import classnames from 'shared/utils/classnames';

export default function MonthView({
    selectedDate,
    years,
    monthNames,
    weekdayNames,
    eventsByDate,
    onChange,
    children
}) {
    const todayRef = useRef(new Date());
    const dateRef = useRef(datetime(selectedDate));

    const [year, setYear] = useState(dateRef.current.year());
    const [month, setMonth] = useState(dateRef.current.month());

    useEffect(() => {
        dateRef.current = datetime(selectedDate);
        setYear(dateRef.current.year());
        setMonth(dateRef.current.month());
    }, [selectedDate]);

    const handlePrevMonthButtonClick = useCallback(() => {
        setMonth(dateRef.current.subtract(1, 'month').month());
        setYear(dateRef.current.year());
    }, []);

    const handleNextMonthButtonClick = useCallback(() => {
        setMonth(dateRef.current.add(1, 'month').month());
        setYear(dateRef.current.year());
    }, []);

    const handleMonthChange = useCallback(event => {
        setMonth(dateRef.current.month(event.target.value).month());
        setYear(dateRef.current.year());
    }, []);

    const handleYearChange = useCallback(event => {
        setYear(dateRef.current.year(event.target.value).year());
    }, []);

    const handleDayClick = useCallback(date => {
        onChange(date);
    }, []);

    const data = useMemo(() => getMonthData(dateRef.current), [year, month]);

    return (
        <>
            <header className="Calendar__header">
                <Button
                    icon="chevron_left"
                    iconOnly
                    onClick={handlePrevMonthButtonClick}
                />

                <Select
                    className="calendar__select calendar__month-select"
                    options={monthNames.map((text, index) => ({ key: index, value: index, content: text }))}
                    placeholder="Select your hero"
                    checkable
                />

                <Select
                    className="calendar__select calendar__year-select"
                    options={years.map(year => ({ key: year, value: year, content: year }))}
                    placeholder="Select your hero"
                    checkable
                />

                <Button
                    icon="chevron_right"
                    iconOnly
                    onClick={handleNextMonthButtonClick}
                />
            </header>

            <article>
                <header>
                    {weekdayNames.map(name =>
                        <div key={name}>
                            <Text>{name}</Text>
                        </div>
                    )}
                </header>

                <section>
                    {data.map((week, index) =>
                        <div key={index} className="Calendar__week">
                            {week.map((date, index) =>
                                <div
                                    key={index}
                                    className={classnames('Calendar__day', date && {
                                        'Calendar__day--today': date.isSame(todayRef.current, 'day'),
                                        'Calendar__day--selected': selectedDate && date.isSame(selectedDate, 'day'),
                                        'Calendar__day--has-events': eventsByDate.has(date.format('YYYY-MM-DD'))
                                    })}
                                >
                                    {date &&
                                        <div className="Calendar__day-label">{date.date()}</div>
                                    }
                                </div>
                            )}
                        </div>
                    )}
                </section>
            </article>
        </>
    );
}

function CalendarDay({ date, today, selected, events, onClick }) {
    const handleDayClick = useCallback(() => {
        onClick(date);
    }, [date]);

    const classNames = classnames('calendar__day', {
        'calendar__day--today': today,
        'calendar__day--selected': selected,
        'calendar__day--has-events': events
    });

    return (
        <div className={classNames} >

        </div>
    );
}

MonthView.defaultProps = {
    years: Array(11).fill(datetime().subtract(6, 'years').year()).map((year, index) => year + index + 1),
    monthNames: datetime.months(),
    weekdayNames: Array.of(...datetime.weekdaysMin().slice(1), datetime.weekdaysMin()[0]),
    onChange: Function.prototype
};