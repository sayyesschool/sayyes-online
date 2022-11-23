import { useCallback, useState } from 'react';
import classnames from 'classnames';

import './index.scss';

export default function Select({
    values,
    correctValue,
    checked,
    onChange = Function.prototype,
    ...props
}) {
    const [value, setValue] = useState('');

    const handleChange = useCallback(event => {
        const value = event.target.value;
        setValue(value);
        onChange(value);
    }, [onChange]);

    const isCorrect = checked ? value === correctValue : undefined;

    const classNames = classnames('inline-select', {
        'inline-select--correct': isCorrect === true,
        'inline-select--incorrect': isCorrect === false
    });

    return (
        <select
            className={classNames}
            value={value}
            onChange={handleChange}
            {...props}
        >
            <option value="" />

            {values.map(value =>
                <option key={value} value={value}>{value}</option>
            )}
        </select>
    );
}