import { forwardRef, useCallback, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react';
import classnames from 'classnames';

import './index.scss';

function InlineTextarea({
    id,
    value: _value = '',
    correctValues,
    checked,
    completed,
    required,
    onChange = Function.prototype,
    ...props
}, ref) {
    const elementRef = useRef();

    const [value, setValue] = useState(completed ? correctValues[0] : _value);

    useImperativeHandle(ref, () => elementRef.current);

    useLayoutEffect(() => {
        if (!elementRef.current) return;

        const element = elementRef.current;

        function setHeight() {
            element.style.height = '30px';
            element.style.height = `${element.scrollHeight + 2}px`;
        }

        setHeight();

        element.addEventListener('input', setHeight);

        return () => element.removeEventListener('input', setHeight);
    }, []);

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

    const classNames = classnames('InlineTextarea', {
        'InlineTextarea--correct': isCorrect === true,
        'InlineTextarea--incorrect': isCorrect === false
    });

    return (
        <textarea
            ref={elementRef}
            className={classNames}
            value={value}
            required={required}
            data-id={id}
            onChange={handleChange}
            {...props}
        />
    );
}

export default forwardRef(InlineTextarea);