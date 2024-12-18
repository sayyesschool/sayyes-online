import { useCallback } from 'react';

import { Button, Input, Text } from 'shared/ui-components';

export default function DateTimeSelect({ name, label, items, onChange }) {
    const handleAdd = useCallback(() => {
        onChange({ target: { name } }, items.concat({ date: '', from: '00:00', to: '00:00' }));
    }, [onChange]);

    const handleChange = useCallback((itemToChange, target) => {
        onChange({ target: { name } }, items.map(item =>
            itemToChange !== item ? item : { ...item, [target.name]: target.value }
        ));
    }, [items, onChange]);

    const handleDelete = useCallback(itemToRemove => {
        onChange({ target: { name } }, items.filter(item => item !== itemToRemove));
    }, [items, onChange]);

    return (
        <div className="DateTimeSelect">
            {label &&
                <Text>{label}</Text>
            }

            <div className="DateTimeSelect__fields">
                {items?.map((item, index) =>
                    <DateTimeSelectItem
                        key={index}
                        item={item}
                        onChange={handleChange}
                        onDelete={handleDelete}
                    />
                )}
            </div>

            <Button
                type="button"
                icon="add"
                content="Добавить"
                color="neutral"
                size="small"
                variant="plain"
                onClick={handleAdd}
            />
        </div>
    );
}

function DateTimeSelectItem({
    item,
    onChange,
    onDelete
}) {
    return (
        <div className="DateTimeSelectItem">
            <Input
                type="date"
                name="date"
                value={item.date}
                label="Дата"
                onChange={event => onChange(item, event.target)}
            />

            <Input
                type="time"
                name="from"
                value={item.from}
                label="С"
                step="1800"
                onChange={event => onChange(item, event.target)}
            />

            <Input
                type="time"
                name="to"
                value={item.to}
                label="До"
                step="1800"
                onChange={event => onChange(item, event.target)}
            />

            <Button
                type="button"
                icon="delete"
                color="neutral"
                size="small"
                variant="plain"
                onClick={() => onDelete(item)}
            />
        </div>
    );
}