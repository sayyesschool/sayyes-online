import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
import {
    IconButton,
    TextField,
    Typography
} from 'mdc-react';

export default forwardRef(ImageField);

import './index.scss';

function ImageField({
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
        <div className="image-field">
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
                outlined
                readOnly
                trailingIcon={
                    <IconButton
                        type="button"
                        icon="insert_photo"
                        onClick={handleClick}
                    />
                }
            />

            <figure className="file-preview">
                <img src={url || file?.url} alt={caption} />

                {file &&
                    <figcaption className="file-meta">
                        <Typography type="caption">Имя: <strong>{file.name}</strong></Typography>

                        <Typography type="caption">Размер: <strong>{Math.ceil(file.size / 1000)} КБ</strong></Typography>
                    </figcaption>
                }
            </figure>
        </div>
    );
}