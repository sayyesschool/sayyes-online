import { forwardRef, useImperativeHandle, useLayoutEffect, useRef } from 'react';

import './index.scss';

function TextArea({ autoResize, minHeight = 32, ...props }, ref) {
    const elementRef = useRef();

    useImperativeHandle(ref, () => elementRef.current, []);

    useLayoutEffect(() => {
        if (!elementRef.current || !autoResize) return;

        const element = elementRef.current;

        function setHeight() {
            element.style.height = `${minHeight}px`;
            element.style.height = `${(element.scrollHeight || minHeight)}px`;
        }

        setHeight();

        element.addEventListener('input', setHeight);

        return () => element.removeEventListener('input', setHeight);
    }, [autoResize, minHeight]);

    return (
        <textarea
            ref={elementRef}
            {...props}
        />
    );
}

export default forwardRef(TextArea);