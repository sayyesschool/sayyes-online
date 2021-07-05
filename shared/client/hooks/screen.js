import { useState, useEffect } from 'react';

import { useMounted, useUpdated } from 'shared/hooks/lifecycle';
import { useBoolean } from 'shared/hooks/state';

export function useScreenSize() {
    const [screenSize, setScreenSize] = useState();

    useMounted(() => {
        function handleResize() {
            if (window.innerWidth < 640 && screenSize !== 'phone') {
                setScreenSize('phone');
            } else if (window.innerWidth > 640 && window.innerWidth < 960 && screenSize !== 'tablet') {
                setScreenSize('tablet');
            } else if (window.innerWidth > 960 && screenSize !== 'desktop') {
                setScreenSize('desktop');
            }
        }

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    });

    return screenSize;
}

export function useFullScreen(elementRef, deps) {
    const [isFullscreen, toggleFullscreen] = useBoolean(false);

    useEffect(() => {
        function handleFullscreenChange(event) {
            toggleFullscreen(document.fullscreenElement === event.target);
        }

        elementRef.current?.addEventListener('fullscreenchange', handleFullscreenChange);

        return () => {
            elementRef.current?.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, deps);

    useEffect(() => {
        if (isFullscreen) {
            elementRef.current.requestFullscreen();
        } else if (document.fullscreenElement) {
            document.exitFullscreen();
        }
    }, [isFullscreen]);

    return [isFullscreen, toggleFullscreen];
}

export function useScrollToTop(elementRef, deps) {
    useUpdated(() => {
        elementRef.current?.scroll({
            top: 0,
            behavior: 'smooth'
        });
    }, deps);
}

export function useScrollClassName(elementRef, className, deps = []) {
    useEffect(() => {
        if (!elementRef.current) return;

        function handleScroll(event) {
            event.target.classList.toggle(className, event.target.scrollTop > 0);
        }

        elementRef.current.addEventListener('scroll', handleScroll);

        return () => elementRef.current?.removeEventListener('scroll', handleScroll);
    }, deps);
}