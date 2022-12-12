import { forwardRef, useImperativeHandle, useLayoutEffect, useRef } from 'react';
import { TextArea as FluentTextArea } from '@fluentui/react-northstar';

import './index.scss';

function Textarea({ minHeight = 32, native, autoResize, ...props }, ref) {
    const elementRef = useRef();

    useImperativeHandle(ref, () => elementRef.current, []);

    useLayoutEffect(() => {
        if (!elementRef.current || !autoResize) return;

        const element = elementRef.current;

        function setHeight() {
            element.style.height = `${minHeight}px`;
            element.style.height = `${element.scrollHeight ? (element.scrollHeight + 2) : minHeight}px`;
        }

        setHeight();

        element.addEventListener('input', setHeight);

        return () => element.removeEventListener('input', setHeight);
    }, [autoResize]);

    const Element = native ? 'textarea' : FluentTextArea;

    return (
        <Element
            ref={elementRef}
            {...props}
        />
    );
}

export default forwardRef(Textarea);