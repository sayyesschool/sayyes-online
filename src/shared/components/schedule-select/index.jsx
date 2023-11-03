import { useCallback } from 'react';

import { Button, FormSelect, FormInput, IconButton, Text } from 'shared/ui-components';

import './index.scss';

const dayLabels = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

export default function ScheduleSelect({ name, label, schedule, onChange }) {
    const handleAdd = useCallback(() => {
        onChange({
            target: {
                name,
                value: schedule.concat({ day: 0, from: '00:00', to: '00:00' })
            }
        });
    }, [name, schedule, onChange]);

    const handleDayChange = useCallback((itemToChange, target) => {
        onChange({
            target: {
                name,
                value: schedule.map(item =>
                    itemToChange !== item ? item : { ...item, day: Number(target.value) }
                )
            }
        });
    }, [name, schedule, onChange]);

    const handleTimeChange = useCallback((itemToChange, target) => {
        onChange({
            target: {
                name,
                value: schedule.map(item =>
                    itemToChange !== item ? item : { ...item, [target.name]: target.value }
                )
            }
        });
    }, [name, schedule, onChange]);

    const handleDelete = useCallback(itemToRemove => {
        onChange({
            target: {
                name,
                value: schedule.filter(item => item !== itemToRemove)
            }
        });
    }, [name, schedule, onChange]);

    return (
        <div className="ScheduleSelect">
            {label &&
                <Text>{label}</Text>
            }

            {schedule?.map((item, index) =>
                <div key={index} className="ScheduleSelectItem">
                    <FormSelect
                        className="ScheduleSelectItem__day-select"
                        label="День недели"
                        name="day"
                        value={String(item.day)}
                        options={dayLabels.map((label, index) => ({
                            key: label,
                            value: String(index),
                            label,
                            content: label
                        }))}
                        onChange={event => handleDayChange(item, event.target)}
                    />

                    <FormInput
                        className="ScheduleSelectItem__time-input"
                        type="time"
                        name="from"
                        value={item.from}
                        label="С"
                        step="1800"
                        onChange={event => handleTimeChange(item, event.target)}
                    />

                    <FormInput
                        className="ScheduleSelectItem__time-input"
                        type="time"
                        name="to"
                        value={item.to}
                        label="До"
                        step="1800"
                        onChange={event => handleTimeChange(item, event.target)}
                    />

                    <IconButton
                        type="button"
                        icon="delete"
                        variant="plain"
                        onClick={() => handleDelete(item)}
                    />
                </div>
            )}

            <Button
                className="ScheduleSelect__add-button"
                type="button"
                icon="add"
                variant="soft"
                content="Добавить"
                onClick={handleAdd}
            />
        </div>
    );
}