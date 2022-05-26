import { useCallback, useEffect, useRef } from 'react';

import storage from 'shared/services/storage';

export function useFileUpload({ accept, path }) {
    const inputRef = useRef();

    // useImperativeHandle(ref, () => ({
    //     get input() { return inputRef.current; },
    //     get file() { return inputRef.current.files[0]; },
    //     reset: () => inputRef.current.reset()
    // }));

    useEffect(() => {
        const input = document.createElement('input');

        input.type = 'file';
        input.accept = accept;
        input.onchange = handleChange;

        inputRef.current = input;
    }, []);

    const handleAdd = useCallback(() => {
        inputRef.current.click();
    }, []);

    const handleChange = useCallback(event => {
        const file = event.target.files[0];

        if (file) {
            storage.upload(file, {
                path: 'courses/foo/images/'
            }).then(response => {
                onChange(null, {
                    name,
                    value: {
                        src: response.data.url,
                        alt: altInputRef.current.value
                    }
                });
            }).catch(console.error);
        }
    }, [name]);

    const handleDelete = useCallback(() => {
        storage.delete(src)
            .then(() => {
                onChange(null, {
                    name,
                    value: undefined
                });
            })
            .catch(console.error);
    }, [name, src]);

    return {
        ref: inputRef,
        get input() {
            return inputRef.current;
        },
        get file() {
            return inputRef.current.files[0];
        },
        reset: () => inputRef.current?.reset(),
        pick: () => inputRef.current?.click()
    };
}