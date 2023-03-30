import { forwardRef, useImperativeHandle, useLayoutEffect, useRef } from 'react';
import classnames from 'classnames';

import JoyTextarea from '@mui/joy/Textarea';

const Textarea = forwardRef(({
    start,
    end,
    minHeight = 32,
    autoResize,

    className,
    ...props
}, ref) => {
    const elementRef = useRef();

    const classNames = classnames('ui-Textarea', className);

    useImperativeHandle(ref, () => elementRef, []);

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

    return (
        <JoyTextarea
            ref={elementRef}
            className={classNames}
            startDecorator={start}
            endDecorator={end}
            {...props}
        />
    );
});

export default Textarea;