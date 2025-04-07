import { useCallback } from 'react';

import { FormInput, FormSelect, IconButton, Text } from 'shared/ui-components';

import styles from './ScheduleSelect.module.scss';

const dayLabels = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

export default function ScheduleSelect({ name, label, schedule, onChange }) {
    const handleDayChange = useCallback((itemToChange, index, target) => {
        onChange({
            target: {
                name,
                value: schedule.map(item =>
                    itemToChange !== item ? item : {
                        ...item,
                        day: Number(target.value)
                    }
                )
            }
        });
    }, [name, schedule, onChange]);

    const handleTimeChange = useCallback((itemToChange, index, target) => {
        onChange({
            target: {
                name,
                value: schedule.map(item =>
                    itemToChange !== item ? item : {
                        ...item,
                        [target.name]: target.value
                    }
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
        <div className={styles.root}>
            {label &&
                <Text>{label}</Text>
            }

            {schedule?.map((item, index) =>
                <div key={index} className={styles.item}>
                    <FormSelect
                        className={styles.select}
                        label="День недели"
                        name="day"
                        value={String(item.day)}
                        options={dayLabels.map((label, index) => ({
                            key: label,
                            value: String(index),
                            label,
                            content: label
                        }))}
                        onChange={event => handleDayChange(item, index, event.target)}
                    />

                    <FormInput
                        className={styles.input}
                        type="time"
                        name="from"
                        value={item.from}
                        label="С"
                        step="1800"
                        onChange={event => handleTimeChange(item, index, event.target)}
                    />

                    <FormInput
                        className={styles.input}
                        type="time"
                        name="to"
                        value={item.to}
                        label="До"
                        step="1800"
                        onChange={event => handleTimeChange(item, index, event.target)}
                    />

                    <IconButton
                        type="button"
                        icon="delete"
                        variant="plain"
                        onClick={() => handleDelete(item)}
                    />
                </div>
            )}
        </div>
    );
}