import { useLayoutEffect, useRef } from 'react';

import { FormTextArea as FluentFormTextArea } from '@fluentui/react-northstar';

export default function FormTextArea({ resize, ...props }) {
    const elementRef = useRef();

    useLayoutEffect(() => {
        if (!resize === 'auto' || !elementRef.current) return;

        const element = elementRef.current;

        function setHeight() {
            element.style.height = '32px';
            element.style.height = `${element.scrollHeight + 2}px`;
        }

        setHeight();

        element.addEventListener('input', setHeight);

        return () => element.removeEventListener('input', setHeight);
    }, [resize]);

    return (
        <FluentFormTextArea
            ref={elementRef}
            fluid
            resize={resize !== 'auto' ? resize : undefined}
            {...props}
        />
    );
}