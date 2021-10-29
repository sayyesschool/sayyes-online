import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import {
    IconButton,
    TextField
} from 'mdc-react';

import AudioPlayer from 'shared/components/audio-player';

import './index.scss';

function AudioField({
    name = 'file',
    filename = '',
    url,
    label,
    ...props
}, ref) {
    const inputRef = useRef();

    const [file, setFile] = useState({
        name: filename,
        url
    });

    useImperativeHandle(ref, () => ({
        get input() { return inputRef.current; },
        get file() { return inputRef.current.files[0]; },

        reset: () => setFile(undefined)
    }), [inputRef.current]);

    useEffect(() => {
        if (file?.url) return () => {
            URL.revokeObjectURL(file.url);
        };
    }, [file]);

    const handleChange = useCallback(event => {
        const file = event.target.files[0];

        if (file) {
            file.url = URL.createObjectURL(file);

            setFile(file);
        }
    }, []);

    const handleClick = useCallback(() => {
        inputRef.current.click();
    }, []);

    return (
        <div className="audio-field">
            <input
                ref={inputRef}
                type="file"
                name={name}
                accept="audio/mpeg"
                onChange={handleChange}
                {...props}
            />

            <TextField
                value={file.name}
                label={label}
                trailingIcon={
                    <IconButton
                        type="button"
                        icon="upload_file"
                        onClick={handleClick}
                    />
                }
                helperText={file.size && `Размер: ${Math.ceil(file.size / 1000)} КБ`}
                outlined
                readOnly
            />

            {file.url &&
                <AudioPlayer src={file.url} />
            }
        </div>
    );
}

export default forwardRef(AudioField);