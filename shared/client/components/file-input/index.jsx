import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
import {
    IconButton,
    TextField,
    Typography
} from 'mdc-react';

export default forwardRef(FileInput);

import './index.scss';

function FileInput({
    name = 'file',
    label,
    accept = 'image/jpeg,image/png,image/jpeg',
    url,
    caption,
    ...props
}, ref) {
    const inputRef = useRef();
    const [file, setFile] = useState();

    useImperativeHandle(ref, () => ({
        get input() { return inputRef.current; },
        reset: () => setFile(undefined)
    }));

    const handleChange = useCallback(event => {
        const file = event.target.files[0];

        if (file) {
            const url = URL.createObjectURL(file);
            file.url = url;

            setFile(file);
        }
    }, []);

    const handleClick = useCallback(() => {
        inputRef.current.click();
    }, []);

    return (
        <div className="file-input">
            <input
                ref={inputRef}
                type="file"
                name={name}
                accept={accept}
                onChange={handleChange}
                {...props}
            />

            <TextField
                label={label}
                defaultValue={caption}
                filled
                readOnly
                trailingIcon={
                    <IconButton
                        type="button"
                        icon="insert_photo"
                        onClick={handleClick}
                    />
                }
            />

            {(!file && url) &&
                <img src={url} alt={caption} />
            }

            {file && <figure className="file-preview">
                <img src={file.url} />

                <figcaption className="file-meta">
                    <Typography type="caption">Имя: <strong>{file.name}</strong></Typography>

                    <Typography type="caption">Размер: <strong>{Math.ceil(file.size / 1000)} КБ</strong></Typography>
                </figcaption>
            </figure>
            }
        </div>
    );
}