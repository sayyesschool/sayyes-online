import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import moment from 'moment';
import classnames from 'classnames';
import {
    Badge,
    DataTable,
    Icon,
    IconButton,
    Select,
    Typography
} from 'mdc-react';

import { getMonthData } from './utils';

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
                    filled
                    menuProps={{
                        fullWidth: true,
                        listProps: {
                            dense: true
                        }
                    }}
                />

                <Select
                    className="calendar__select calendar__year-select"
                    value={year}
                    onChange={handleYearChange}
                    options={years.map(year => ({ key: year, value: year, text: year }))}
                    filled
                    menuProps={{
                        fullWidth: true,
                        listProps: {
                            dense: true
                        }
                    }}
                />

                <IconButton onClick={handleNextMonthButtonClick}>
                    <Icon>chevron_right</Icon>
                </IconButton>
            </header>

            <DataTable>
                <DataTable.Header>
                    <DataTable.HeaderRow>
                        {weekdayNames.map(name =>
                            <DataTable.HeaderCell key={name}>
                                <Typography type="overline">{name}</Typography>
                            </DataTable.HeaderCell>
                        )}
                    </DataTable.HeaderRow>
                </DataTable.Header>

                <DataTable.Content>
                    {data.map((week, index) =>
                        <DataTable.Row key={index} className="calendar__week">
                            {week.map((date, index) =>
                                <DataTable.Cell
                                    className={classnames('calendar__day', date && {
                                        'calendar__day--today': date.isSame(todayRef.current, 'day'),
                                        'calendar__day--selected': selectedDate && date.isSame(selectedDate, 'day'),
                                        'calendar__day--has-events': eventsByDate.has(date.format('YYYY-MM-DD'))
                                    })}
                                >
                                    {date &&
                                        <div className="calendar__day-label">{date.date()}</div>
                                    }
                                </DataTable.Cell>
                            )}
                        </DataTable.Row>
                    )}
                </DataTable.Content>
            </DataTable>
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
        <div className={classNames} >
            <Badge value={events?.length} noBackground>
                { }
            </Badge>
        </div>
    );
}

MonthView.defaultProps = {
    years: Array(11).fill(moment().subtract(6, 'years').year()).map((year, index) => year + index + 1),
    monthNames: moment.months(),
    weekdayNames: Array.of(...moment.weekdaysMin().slice(1), moment.weekdaysMin()[0]),
    onChange: Function.prototype
};