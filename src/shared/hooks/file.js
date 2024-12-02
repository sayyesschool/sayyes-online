import { useCallback, useEffect, useRef, useState } from 'react';

export function useFileInput(options = {}) {
    const optionsRef = useRef(options);
    const fileInputRef = useRef();
    const fileUrlRef = useRef();

    const [file, setFile] = useState();

    optionsRef.current = options;

    useEffect(() => {
        if (!fileInputRef.current) {
            const options = optionsRef.current;
            const input = document.createElement('input');

            input.type = 'file';
            input.name = options.name;
            input.accept = options.accept;

            input.onchange = event => {
                const file = event.target.files[0];
                const fileUrl = fileUrlRef.current;

                if (fileUrl) {
                    URL.revokeObjectURL(fileUrl);
                }

                if (file) {
                    const url = URL.createObjectURL(file);

                    fileUrlRef.current = url;
                    file.url = url;

                    optionsRef.current.onChange?.(file);
                    setFile(file);
                }
            };

            fileInputRef.current = input;
        }

        return () => {
            const fileUrl = fileUrlRef.current;

            if (fileUrl) {
                URL.revokeObjectURL(fileUrl);
            }

            fileInputRef.current.onchange = null;
            fileInputRef.current = null;
        };
    }, []);

    const pick = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    const reset = useCallback(() => {
        fileInputRef.current.value = '';
        setFile(undefined);
        optionsRef.current.onChange?.(undefined);
    }, []);

    return {
        ref: fileInputRef,
        input: fileInputRef.current,
        file,
        setFile,
        pick,
        reset
    };
}