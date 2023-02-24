import { useCallback } from 'react';

import Button from 'shared/ui-components/button';
import Icon from 'shared/ui-components/icon';
import Input from 'shared/ui-components/input';
import Text from 'shared/ui-components/text';

import './index.scss';

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
        <div className="datetime-select">
            {label &&
                <Text>{label}</Text>
            }

            {items?.map((item, index) =>
                <div key={index} className="datetime-select-item">
                    <Input
                        type="date"
                        name="date"
                        value={item.date}
                        label="Дата"
                        filled
                        onChange={event => handleChange(item, event.target)}
                    />

                    <Input
                        type="time"
                        name="from"
                        value={item.from}
                        label="С"
                        step="1800"
                        filled
                        onChange={event => handleChange(item, event.target)}
                    />

                    <Input
                        type="time"
                        name="to"
                        value={item.to}
                        label="До"
                        step="1800"
                        filled
                        onChange={event => handleChange(item, event.target)}
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
                className="datetime-select-button--add"
                type="button"
                icon={<Icon>add</Icon>}
                content="Добавить"
                onClick={handleAdd}
            />
        </div>
    );
}