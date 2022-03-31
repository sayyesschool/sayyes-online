import { forwardRef, useCallback, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react';
import { TextArea } from '@fluentui/react-northstar';

import './index.scss';

export default forwardRef(function InlineTextarea({ onChange = Function.prototype, ...props }, ref) {
    const elementRef = useRef();

    const [value, setValue] = useState(props.value || '');

    useImperativeHandle(ref, () => elementRef.current);

    useLayoutEffect(() => {
        if (!elementRef.current) return;

        const element = elementRef.current;

        function setHeight() {
            element.style.height = '36px';
            element.style.height = `${element.scrollHeight + 3}px`;
        }

        setHeight();

        element.addEventListener('input', setHeight);

        return () => element.removeEventListener('input', setHeight);
    }, []);

    const handleChange = useCallback(event => {
        const value = event.target.value;
        setValue(value);
        onChange(value);
    }, [onChange]);

    return (
        <TextArea
            ref={elementRef}
            className="inline-textarea"
            value={value}
            onChange={handleChange}
            {...props}
        />
    );
});