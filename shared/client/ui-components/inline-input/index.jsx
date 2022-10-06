import { useCallback, useState } from 'react';
import classnames from 'classnames';

import './index.scss';

export default function InlineInput({ values, checked, onChange = Function.prototype, ...props }) {
    const [value, setValue] = useState(props.value || '');

    const handleChange = useCallback(event => {
        const value = event.target.value;
        setValue(value);
        onChange(value);
    }, [onChange]);

    const isCorrect = values?.includes(value);

    const classNames = classnames('inline-input', {
        'inline-input--correct': checked && isCorrect,
        'inline-input--incorrect': checked && !isCorrect
    });

    return (
        <span className={classNames}>
            <span>{value}</span>

            <input
                value={value}
                onChange={handleChange}
                {...props}
            />
        </span>
    );
}