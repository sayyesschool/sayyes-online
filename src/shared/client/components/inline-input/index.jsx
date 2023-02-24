import { useCallback, useState } from 'react';
import classnames from 'classnames';

import './index.scss';

export default function InlineInput({
    value: _value = '',
    correctValues,
    checked,
    completed,
    required,
    onChange = Function.prototype,
    ...props
}) {
    const [value, setValue] = useState(completed ? correctValues[0] : _value);

    const handleChange = useCallback(event => {
        const value = event.target.value;
        setValue(value);
        onChange(value);
    }, [onChange]);

    const isCorrect = (checked && required) ? (
        correctValues?.length > 0 ?
            correctValues?.includes(value?.trim().toLocaleLowerCase()) :
            value !== ''
    ) : undefined;

    const classNames = classnames('inline-input', {
        'inline-input--correct': isCorrect === true,
        'inline-input--incorrect': isCorrect === false
    });

    return (
        <span className={classNames}>
            <span>{value}</span>

            <input
                value={value}
                required={required}
                onChange={handleChange}
                {...props}
            />
        </span>
    );
}