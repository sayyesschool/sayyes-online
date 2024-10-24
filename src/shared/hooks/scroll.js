import { useCallback, useEffect, useRef, useState } from 'react';

import { throttle } from 'shared/utils/fn';

export function useScroll(elementRef, options = {}) {
    const optionsRef = useRef(options);

    const [isScrolledToBottom, setScrolledToBottom] = useState(false);

    useEffect(() => {
        const element = elementRef.current;

        if (!element) return;

        const handleScroll = throttle(() => {
            const element = elementRef.current;
            // Because handleScroll() is a throttled function,
            // it's possible that it can be called after this component unmounts, and this element will be null.
            // Therefore, if it doesn't exist, don't do anything:
            if (!element) return;

            optionsRef.current?.onScroll?.();

            // On systems using display scaling, scrollTop may return a decimal value, so we need to account for this in the
            // "isScrolledToBottom" calculation.
            const isScrolledToBottom = Math.abs(element.clientHeight + element.scrollTop - element.scrollHeight) < 1;

            if (isScrolledToBottom) {
                optionsRef.current?.onScrolledToBottom?.();
            }

            setScrolledToBottom(isScrolledToBottom);
        }, 300);

        element.addEventListener('scroll', handleScroll);

        return () => {
            element.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToBottom = useCallback(() => {
        elementRef.current?.scrollTo({
            top: elementRef.current.scrollHeight,
            behavior: 'smooth'
        });
    }, []);

    return {
        isScrolledToBottom,
        scrollToBottom
    };
}