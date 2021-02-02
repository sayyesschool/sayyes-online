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

export default function ScheduleSelect({ name, schedule: items, onChange }) {
    const handleAdd = useCallback(() => {
        onChange({ target: { name } }, [...items, { days: [], from: 0, to: 0 }]);
    }, [items, onChange]);

    const handleDayChange = useCallback((id, days) => {
        onChange({ target: { name } }, items.map(item => {
            if (item.id !== id) return item;
            return { ...item, days };
        }));
    }, [items, onChange]);

    const handleTimeChange = useCallback((id, name, value) => {
        console.log(id, name, value, items);
        onChange({ target: { name } }, items.map(item => item.id !== id ? item : { ...item, [name]: value }));
    }, [items, onChange]);

    const handleDelete = useCallback(id => {
        onChange({ target: { name } }, items.filter(item => item.id !== id));
    }, [items, onChange]);

    return (
        <div className="schedule-select">
            <Layout column>
                <Typography noMargin>Расписание</Typography>

                {items.length === 0 &&
                    <Typography type="body2" noMargin>Нет расписания</Typography>
                }

                {items.map((item, index) =>
                    <div className="schedule-select-item">
                        <WeekdaySelect
                            name="days"
                            values={item.days}
                            onChange={days => handleDayChange(item.id, days)}
                        />

                        <div className="schedule-select__time-select">
                            <TextField
                                type="time"
                                name="from"
                                value={item.from}
                                label="С"
                                step="1800"
                                filled
                                onChange={(event) => handleTimeChange(item, event.target.name, event.target.value)}
                            />

                            <TextField
                                type="time"
                                name="to"
                                value={item.to}
                                label="До"
                                step="1800"
                                filled
                                onChange={(event) => handleTimeChange(item, event.target.name, event.target.value)}
                            />
                        </div>

                        <IconButton
                            type="button"
                            icon={<Icon>delete</Icon>}
                            onClick={() => handleDelete(item.id)}
                        />
                    </div>
                )}

                <Button type="button" onClick={handleAdd}>Добавить</Button>
            </Layout>
        </div >
    );
}