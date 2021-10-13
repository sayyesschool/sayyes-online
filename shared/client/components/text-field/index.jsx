import React, { forwardRef, useLayoutEffect, useRef, useImperativeHandle } from 'react';
import {
    TextField
} from 'mdc-react';

import './index.scss';

export default forwardRef(TextArea);

function TextArea({ autoResize, ...props }, ref) {
    const textFieldRef = useRef();

    useImperativeHandle(ref, () => textFieldRef.current);

    useLayoutEffect(() => {
        if (!textFieldRef.current || !autoResize) return;

        const element = textFieldRef.current.control;

        function setHeight() {
            element.style.height = '1rem';
            element.style.height = `${element.scrollHeight}px`;
        }

        setHeight();

        element.addEventListener('input', setHeight);

        return () => element.removeEventListener('input', setHeight);
    }, [autoResize]);

    return (
        <TextField
            ref={textFieldRef}
            {...props}
        />
    );
}