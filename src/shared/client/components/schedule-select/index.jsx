import { useCallback } from 'react';

import { Button, FormSelect, Icon, Input, Text } from 'shared/ui-components';

import './index.scss';

const dayLabels = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

export default function ScheduleSelect({ name, label, schedule, onChange }) {
    const handleAdd = useCallback(() => {
        onChange(null, {
            name,
            value: schedule.concat({ day: 0, from: '00:00', to: '00:00' })
        });
    }, [name, schedule, onChange]);

    const handleDayChange = useCallback((itemToChange, target) => {
        onChange(null, {
            name,
            value: schedule.map(item =>
                itemToChange !== item ? item : { ...item, day: Number(target.value) }
            )
        });
    }, [name, schedule, onChange]);

    const handleTimeChange = useCallback((itemToChange, target) => {
        onChange(null, {
            name,
            value: schedule.map(item =>
                itemToChange !== item ? item : { ...item, [target.name]: target.value }
            )
        });
    }, [name, schedule, onChange]);

    const handleDelete = useCallback(itemToRemove => {
        onChange(null, {
            name,
            value: schedule.filter(item => item !== itemToRemove)
        });
    }, [name, schedule, onChange]);

    return (
        <div className="schedule-select">
            {label &&
                <Text>{label}</Text>
            }

            {schedule?.map((item, index) =>
                <div key={index} className="schedule-select-item">
                    <FormSelect
                        label="День недели"
                        name="day"
                        value={String(item.day)}
                        options={dayLabels.map((label, index) => ({
                            key: label,
                            value: String(index),
                            content: label
                        }))}
                        onChange={(event, target) => handleDayChange(item, target)}
                    />

                    <Input
                        type="time"
                        name="from"
                        value={item.from}
                        label="С"
                        step="1800"
                        onChange={event => handleTimeChange(item, event.target)}
                    />

                    <Input
                        type="time"
                        name="to"
                        value={item.to}
                        label="До"
                        step="1800"
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
                content="Добавить"
                onClick={handleAdd}
            />
        </div>
    );
}