import { useEffect } from 'react';

export function usePageTitle(title) {
    useEffect(() => {
        const documentTitle = document.title;

        document.title = title ? `${documentTitle} • ${title}` : documentTitle;

        return () => {
            document.title = documentTitle;
        };
    }, [title]);
}