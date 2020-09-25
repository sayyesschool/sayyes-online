import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import moment from 'moment';
import classnames from 'classnames';
import {
    Badge,
    Icon,
    IconButton,
    Select
} from 'mdc-react';

import { getMonthData } from './utils';
import Calendar from '.';

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
    const dateRef = useRef(moment(selectedDate));
    const [year, setYear] = useState(dateRef.current.year());
    const [month, setMonth] = useState(dateRef.current.month());

    useEffect(() => {
        dateRef.current = moment(selectedDate);
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
        <div className="calendar calendar--month-view">
            <header className="calendar__header">
                <IconButton onClick={handlePrevMonthButtonClick}>
                    <Icon>chevron_left</Icon>
                </IconButton>

                <Select
                    className="calendar__select calendar__month-select"
                    value={month}
                    onChange={handleMonthChange}
                    options={monthNames.map((text, index) => ({ key: index, value: index, text }))}
                    menuProps={{
                        fullWidth: true
                    }}
                />

                <Select
                    className="calendar__select calendar__year-select"
                    value={year}
                    onChange={handleYearChange}
                    options={years.map(year => ({ key: year, value: year, text: year }))}
                    menuProps={{
                        fullWidth: true
                    }}
                />

                <IconButton onClick={handleNextMonthButtonClick}>
                    <Icon>chevron_right</Icon>
                </IconButton>
            </header>

            <table>
                <thead>
                    <tr>
                        {weekdayNames.map(name =>
                            <th key={name}>{name}</th>
                        )}
                    </tr>
                </thead>

                <tbody>
                    {data.map((week, index) =>
                        <tr key={index} className="calendar__week">
                            {week.map((date, index) => date ?
                                <CalendarDay
                                    date={date}
                                    today={date.isSame(todayRef.current, 'day')}
                                    selected={selectedDate && date.isSame(selectedDate, 'day')}
                                    events={eventsByDate.get(date.format('YYYY-MM-DD'))}
                                />
                                :
                                <td key={index} />
                            )}
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
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
        <td className={classNames} onClick={handleDayClick}>
            <Badge value={events?.length} noBackground>
                {date.date()}
            </Badge>
        </td>
    );
}

MonthView.defaultProps = {
    years: Array(11).fill(moment().subtract(6, 'years').year()).map((year, index) => year + index + 1),
    monthNames: moment.months(),
    weekdayNames: Array.of(...moment.weekdaysMin().slice(1), moment.weekdaysMin()[0]),
    onChange: Function.prototype
};