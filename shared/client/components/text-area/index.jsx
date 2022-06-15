import { forwardRef, useImperativeHandle, useLayoutEffect, useRef } from 'react';
import { TextArea as FluentTextArea } from '@fluentui/react-northstar';

import './index.scss';

function TextArea({ minHeight = 32, autoResize, ...props }, ref) {
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
    }, [autoResize]);

    return (
        <FluentTextArea
            ref={elementRef}
            {...props}
        />
    );
}

export default forwardRef(TextArea);