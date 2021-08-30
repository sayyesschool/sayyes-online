import React, { forwardRef, useLayoutEffect, useRef, useImperativeHandle } from 'react';

import './index.scss';

export default forwardRef(TextArea);

function TextArea({ autoResize, ...props }, ref) {
    const elementRef = useRef();

    useImperativeHandle(ref, () => elementRef.current);

    useLayoutEffect(() => {
        if (!elementRef.current || !autoResize) return;

        const element = elementRef.current;

        function setHeight() {
            element.style.height = '1rem';
            element.style.height = `${element.scrollHeight}px`;
        }

        setHeight();

        element.addEventListener('input', setHeight);

        return () => element.removeEventListener('input', setHeight);
    }, [autoResize]);

    return (
        <div className="text-field">
            <textarea ref={elementRef} {...props} />
        </div>
    );
}