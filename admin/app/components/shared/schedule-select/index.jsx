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

export default function ScheduleSelect({ schedule, onChange }) {
    const [items, setItems] = useState(schedule);

    const handleAdd = useCallback(() => {
        setItems(items => [...items, { days: [], from: 0, to: 0 }]);
    }, []);

    const handleDaysChange = useCallback((id, days) => {
        setItems(items => items.map((item, index) => index !== id ? item : { ...item, days }));
    }, []);

    const handleTimeChange = useCallback((id, name, value) => {
        setItems(items => items.map((item, index) => index !== id ? item : { ...item, [name]: value }));
    }, []);

    const handleDelete = useCallback(id => {
        setItems(items => items.filter((item, index) => index !== id));
    }, []);

    useEffect(() => {
        const event = { target: { name: 'study.schedule' } };

        onChange(event, items);
    }, [items]);

    return (
        <div className="schedule-select">
            <Layout column>
                <Layout row justifyContent="space-between" alignItems="center">
                    <Typography noMargin>Расписание</Typography>
                    <Button onClick={handleAdd}>Добавить</Button>
                </Layout>

                {items.length === 0 &&
                    <Typography noMargin>Нет расписания</Typography>
                }

                {items.map((item, index) =>
                    <Layout key={index} column>
                        <WeekdaySelect
                            name="days"
                            selectedValues={item.days}
                            onChange={(event, values) => handleDaysChange(index, values)}
                        />

                        <Layout row>
                            <TextField
                                type="time"
                                name="from"
                                value={item.from}
                                placeholder="С"
                                step="1800"
                                onChange={(event, option) => handleTimeChange(index, 'from', option.key)}
                            />

                            <TextField
                                type="time"
                                name="to"
                                value={item.to}
                                placeholder="До"
                                step="1800"
                                onChange={(event, option) => handleTimeChange(index, 'to', option.key)}
                            />
                        </Layout>

                        <IconButton
                            type="button"
                            icon={<Icon>delete</Icon>}
                            onClick={() => handleDelete(index)}
                        />
                    </Layout>
                )}
            </Layout>
        </div>
    );
}