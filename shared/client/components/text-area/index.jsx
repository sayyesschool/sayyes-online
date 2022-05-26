import { forwardRef, useImperativeHandle, useLayoutEffect, useRef } from 'react';
import { TextArea as FluentTextArea } from '@fluentui/react-northstar';

import './index.scss';

function TextArea({ autoResize, ...props }, ref) {
    const elementRef = useRef();

    useImperativeHandle(ref, () => elementRef.current);

    useLayoutEffect(() => {
        if (!elementRef.current || !autoResize) return;

        const element = elementRef.current;

        function setHeight() {
            element.style.height = '32px';
            element.style.height = `${element.scrollHeight + 2}px`;
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