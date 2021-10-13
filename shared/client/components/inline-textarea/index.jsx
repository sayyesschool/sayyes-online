import React, { forwardRef, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react';

import './index.scss';

export default forwardRef(function InlineTextarea({ values }, ref) {
    const elementRef = useRef();

    const [value, setValue] = useState('');

    useImperativeHandle(ref, () => elementRef.current);

    useLayoutEffect(() => {
        if (!elementRef.current) return;

        const element = elementRef.current;

        function setHeight() {
            element.style.height = '36px';
            element.style.height = `${element.scrollHeight}px`;
        }

        setHeight();

        element.addEventListener('input', setHeight);

        return () => element.removeEventListener('input', setHeight);
    }, []);

    return (
        <textarea
            ref={elementRef}
            className="inline-textarea"
            value={value}
            onChange={event => setValue(event.target.value)}
        />
    );
});