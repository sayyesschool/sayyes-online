import { useCallback, useState } from 'react';

import classnames from 'shared/utils/classnames';

export default function InlineInput({
    id,
    value: _value = '',
    correctValues,
    checked,
    completed,
    required,
    onChange = Function.prototype,
    ...props
}) {
    const [value, setValue] = useState(_value);

    const handleChange = useCallback(event => {
        const value = event.target.value;
        setValue(value);
        onChange(value, event.target, event);
    }, [onChange]);

    const isCorrect = (checked && required) ? (
        correctValues?.length > 0 ?
            correctValues?.includes(value?.trim().toLocaleLowerCase()) :
            value !== ''
    ) : undefined;

    const classNames = classnames('InlineInput', {
        'InlineInput--correct': isCorrect === true,
        'InlineInput--incorrect': isCorrect === false
    });

    return (
        <span className={classNames}>
            <span>{value}</span>

            <input
                value={value}
                required={required}
                data-id={id}
                onChange={handleChange}
                {...props}
            />
        </span>
    );
}