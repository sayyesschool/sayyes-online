import { useCallback, useState } from 'react';

import classnames from 'shared/utils/classnames';

import './index.scss';

export default function Select({
    id,
    values,
    correctValue,
    checked,
    completed,
    onChange = Function.prototype,
    ...props
}) {
    const [value, setValue] = useState(completed ? correctValue : '');

    const handleChange = useCallback(event => {
        const value = event.target.value;
        setValue(value);
        onChange(value, event.target, event);
    }, [onChange]);

    const isCorrect = checked ? value === correctValue : undefined;

    const classNames = classnames('InlineSelect', {
        'InlineSelect--correct': isCorrect === true,
        'InlineSelect--incorrect': isCorrect === false
    });

    return (
        <select
            className={classNames}
            value={value}
            data-id={id}
            onChange={handleChange}
            {...props}
        >
            <option value="" />

            {values?.map(value =>
                <option key={value} value={value}>{value}</option>
            )}
        </select>
    );
}