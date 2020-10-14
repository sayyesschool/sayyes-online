import React, { forwardRef, useRef, useState, useImperativeHandle, useCallback } from 'react';
import {
    Button,
    FormField,
    Typography
} from 'mdc-react';

export default forwardRef(FileInput);

import './index.scss';

function FileInput({
    name = 'file',
    label,
    accept = 'image/jpeg,image/png,image/jpeg',
    imageUrl,
    ...props
}, ref) {
    const inputRef = useRef();
    const [file, setFile] = useState();
    const [previewUrl, setPreviewUrl] = useState(imageUrl);

    useImperativeHandle(ref, () => inputRef.current);

    const handleChange = useCallback(event => {
        const file = event.target.files[0];
        const url = URL.createObjectURL(file);

        setFile(file);
        setPreviewUrl(url);
    }, []);

    const handleClick = useCallback(event => {
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

            {label &&
                <Typography element="p" variant="subtitle2">{label}</Typography>
            }

            {previewUrl &&
                <figure className="file-preview">
                    <img src={previewUrl} />

                    {imageUrl &&
                        <figcaption>{imageUrl}</figcaption>
                    }
                </figure>
            }

            {file &&
                <div className="file-meta">
                    <Typography element="p" variant="caption">Имя: <strong>{file.name}</strong></Typography>
                    <Typography element="p" variant="caption">Размер: <strong>{Math.ceil(file.size / 1000)} КБ</strong></Typography>
                </div>
            }

            <Button type="button" onClick={handleClick}>Выбрать файл</Button>
        </div>
    );
}