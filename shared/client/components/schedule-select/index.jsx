import { useCallback } from 'react';
import {
    Button,
    Dropdown,
    Input,
    Text
} from '@fluentui/react-northstar';

import Icon from 'shared/components/icon';

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
            {label &&
                <Text>{label}</Text>
            }

            {schedule?.map((item, index) =>
                <div key={index} className="schedule-select-item">
                    <Dropdown
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

                    <Input
                        type="time"
                        name="from"
                        value={item.from}
                        label="С"
                        step="1800"
                        filled
                        onChange={event => handleTimeChange(item, event.target)}
                    />

                    <Input
                        type="time"
                        name="to"
                        value={item.to}
                        label="До"
                        step="1800"
                        filled
                        onChange={event => handleTimeChange(item, event.target)}
                    />

                    <Button
                        type="button"
                        icon={<Icon>delete</Icon>}
                        text
                        iconOnly
                        onClick={() => handleDelete(item)}
                    />
                </div>
            )}

            <Button
                className="schedule-select-button--add"
                type="button"
                icon={<Icon>add</Icon>}
                label="Добавить"
                onClick={handleAdd}
            />
        </div>
    );
}