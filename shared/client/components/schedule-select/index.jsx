import React, { useCallback } from 'react';
import {
    Icon,
    IconButton,
    Select,
    TextField,
    Typography
} from 'mdc-react';

import './index.scss';

const dayLabels = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

export default function ScheduleSelect({ name, label, schedule, onChange }) {
    const handleAdd = useCallback(() => {
        onChange({ target: { name } }, schedule.concat({ day: 0, from: '00:00', to: '00:00' }));
    }, [onChange]);

    const handleDayChange = useCallback((itemToChange, target) => {
        onChange({ target: { name } }, schedule.map(item =>
            itemToChange !== item ? item : { ...item, day: Number(target.value) }
        ));
    }, [schedule, onChange]);

    const handleTimeChange = useCallback((itemToChange, target) => {
        onChange({ target: { name } }, schedule.map(item =>
            itemToChange !== item ? item : { ...item, [target.name]: target.value }
        ));
    }, [schedule, onChange]);

    const handleDelete = useCallback(itemToRemove => {
        onChange({ target: { name } }, schedule.filter(item => item !== itemToRemove));
    }, [schedule, onChange]);

    return (
        <div className="schedule-select">
            <header className="schedule-select__header">
                <Typography type="subtitle2">{label}</Typography>

                <IconButton type="button" icon="add" onClick={handleAdd} />
            </header>

            {schedule.length > 0 ?
                schedule.map((item, index) =>
                    <div key={index} className="schedule-select-item">
                        <Select
                            label="День недели"
                            name="day"
                            value={String(item.day)}
                            options={dayLabels.map((label, index) => ({
                                key: label,
                                value: String(index),
                                text: label
                            }))}
                            filled
                            onChange={event => handleDayChange(item, event.target)}
                        />

                        <TextField
                            type="time"
                            name="from"
                            value={item.from}
                            label="С"
                            step="1800"
                            filled
                            onChange={event => handleTimeChange(item, event.target)}
                        />

                        <TextField
                            type="time"
                            name="to"
                            value={item.to}
                            label="До"
                            step="1800"
                            filled
                            onChange={event => handleTimeChange(item, event.target)}
                        />

                        <IconButton
                            type="button"
                            icon={<Icon>delete</Icon>}
                            onClick={() => handleDelete(item)}
                        />
                    </div>
                )
                :
                <Typography type="body2">Нет расписания</Typography>
            }
        </div>
    );
}