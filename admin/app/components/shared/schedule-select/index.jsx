import React, { useCallback } from 'react';
import {
    Button,
    Icon,
    IconButton,
    Select,
    TextField,
    Typography
} from 'mdc-react';

import './index.scss';

const dayLabels = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

export default function ScheduleSelect({ name, schedule, onChange }) {
    const handleAdd = useCallback(() => {
        onChange({ target: { name } }, schedule.concat({ day: 0, time: 0 }));
    }, [onChange]);

    const handleChange = useCallback((itemIndex, name, value) => {
        onChange({ target: { name } }, schedule.map((item, index) =>
            index !== itemIndex ? item : { ...item, [name]: value }
        ));
    }, [schedule, onChange]);

    const handleDelete = useCallback(itemToRemove => {
        onChange({ target: { name } }, schedule.filter(item => item !== itemToRemove));
    }, [schedule, onChange]);

    return (
        <div className="schedule-select">
            <Typography type="subtitle2">Расписание</Typography>

            {schedule.length === 0 &&
                <Typography type="body2">Нет расписания</Typography>
            }

            {schedule.map(item =>
                <div className="schedule-select-item">
                    <Select
                        label="День недели"
                        value={item.day}
                        options={dayLabels.map((label, index) => ({
                            value: index,
                            text: label
                        }))}
                        filled
                        onChange={event => handleChange(index, event.target.name, event.target.value)}
                    />

                    <TextField
                        type="time"
                        name="time"
                        value={item.time}
                        label="Время"
                        step="1800"
                        filled
                        onChange={event => handleChange(index, event.target.name, event.target.value)}
                    />

                    <IconButton
                        type="button"
                        icon={<Icon>delete</Icon>}
                        onClick={() => handleDelete(item)}
                    />
                </div>
            )}

            <Button type="button" outlined onClick={handleAdd}>Добавить</Button>
        </div>
    );
}

// function ScheduleSelectItem() {
//     return (

//     );
// }