import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import {
    Button,
    Input,
    Text
} from '@fluentui/react-northstar';

import AudioPlayer from 'shared/components/audio-player';
import Icon from 'shared/components/material-icon';

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

            <Input
                value={file.name}
                label={label}
                icon={
                    <Button
                        type="button"
                        icon={<Icon>upload_file</Icon>}
                        onClick={handleClick}
                    />
                }
                fluid
                readOnly
            />

            {file?.size &&
                <Text size="smallest">Размер: {Math.ceil(file.size / 1000)} КБ</Text>
            }

            {file?.url &&
                <AudioPlayer src={file.url} />
            }
        </div>
    );
}

export default forwardRef(AudioField);