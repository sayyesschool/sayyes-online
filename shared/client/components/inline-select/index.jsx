import { useCallback, useState } from 'react';
import classnames from 'classnames';

import './index.scss';

export default function Select({ values, checked, onChange = Function.prototype, ...props }) {
    const [value, setValue] = useState('');

    const handleChange = useCallback(event => {
        const value = event.target.value;
        setValue(value);
        onChange(value);
    }, [onChange]);

    const isCorrect = values?.includes(value);
    const classNames = classnames('inline-select', {
        'inline-select--correct': checked && isCorrect,
        'inline-select--incorrect': checked && !isCorrect
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