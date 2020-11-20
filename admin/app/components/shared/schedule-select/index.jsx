import React, { useState, useCallback, useEffect } from 'react';
import {
    Button,
    Icon,
    IconButton,
    Layout,
    TextField,
    Typography
} from 'mdc-react';

import WeekdaySelect from '../weekday-picker';

import './index.scss';

export default function ScheduleSelect({ name, schedule, onChange }) {
    const [items, setItems] = useState(schedule);

    useEffect(() => {
        const event = { target: { name } };

        onChange(event, items);
    }, [items]);

    const handleAdd = useCallback(() => {
        setItems(items => [...items, { days: [], from: 0, to: 0 }]);
    }, []);

    const handleDayChange = useCallback((id, days) => {
        console.log(days);
        setItems(items => items.map((item, index) => index !== id ? item : { ...item, days }));
    }, []);

    const handleTimeChange = useCallback((id, name, value) => {
        setItems(items => items.map((item, index) => index !== id ? item : { ...item, [name]: value }));
    }, []);

    const handleDelete = useCallback(id => {
        setItems(items => items.filter((item, index) => index !== id));
    }, []);

    return (
        <div className="schedule-select">
            <Layout column>
                <Typography noMargin>Расписание</Typography>

                {items.length === 0 &&
                    <Typography noMargin>Нет расписания</Typography>
                }

                {items.map((item, index) =>
                    <ScheduleSelectItem
                        key={index}
                        item={item}
                        onDayChange={handleDayChange}
                        onTimeChange={handleTimeChange}
                        onDelete={handleDelete}
                    />
                )}

                <Button type="button" onClick={handleAdd}>Добавить</Button>
            </Layout>
        </div >
    );
}

function ScheduleSelectItem({ item, onDayChange, onTimeChange, onDelete }) {
    const handleDayChange = useCallback(day => {
        console.log(item);
        const set = new Set(item.days);

        set.has(day) ? set.delete(day) : set.add(day);

        onDayChange(item.id, Array.from(set).sort());
    }, [item]);

    const handleTimeChange = useCallback(event => {
        onTimeChange(id, event.target.name, event.target.value);
    }, []);

    const handleDelete = useCallback(() => {
        onDelete(id);
    }, []);

    return (
        <div className="schedule-select-item">
            <WeekdaySelect
                id={item.id}
                name="days"
                values={item.days}
                onChange={handleDayChange}
            />

            <div className="schedule-select__time-select">
                <TextField
                    type="time"
                    name="from"
                    value={item.from}
                    label="С"
                    step="1800"
                    filled
                    onChange={handleTimeChange}
                />

                <TextField
                    type="time"
                    name="to"
                    value={item.to}
                    label="До"
                    step="1800"
                    filled
                    onChange={handleTimeChange}
                />
            </div>

            <IconButton
                type="button"
                icon={<Icon>delete</Icon>}
                onClick={handleDelete}
            />
        </div>
    );
};