import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
import {
    Button,
    FormFieldCustom, FormLabel,
    Image
} from '@fluentui/react-northstar';

import Icon from 'shared/components/icon';

import './index.scss';

export default forwardRef(ImageField);

const defaultValue = {
    src: '',
    alt: ''
};

function ImageField({
    name,
    label,
    accept = 'image/jpeg,image/png,image/jpeg',
    image = defaultValue,
    src = image.src,
    alt: _alt = image.alt,
    error,
    errorMessage,
    onChange,
    ...props
}, ref) {
    const fileInputRef = useRef();
    const altInputRef = useRef();

    const [file, setFile] = useState();
    const [alt, setAlt] = useState(_alt);

    useImperativeHandle(ref, () => ({
        get input() { return fileInputRef.current; },
        get file() { return fileInputRef.current.files[0]; },
        reset: () => fileInputRef.current.reset()
    }));

    const handleChoose = useCallback(() => {
        fileInputRef.current.click();
    }, []);

    const handleChange = useCallback(event => {
        const file = event.target.files[0];

        if (file) {
            onChange({ name }, file);
        }
    }, [name]);

    const handleReset = useCallback(() => {

    }, []);

    return (
        <FormFieldCustom className="image-field" {...props}>
            <input
                ref={fileInputRef}
                type="file"
                name={name}
                accept={accept}
                onChange={handleChange}
            />

            {label &&
                <FormLabel>
                    {label}
                </FormLabel>
            }

            {src &&
                <Image
                    src={src}
                    alt={alt}
                />
            }

            {!file ?
                <Button
                    type="button"
                    content="Выбрать файл"
                    text
                    onClick={handleChoose}
                />
                :
                <Button
                    type="button"
                    icon={<Icon>clear</Icon>}
                    iconOnly
                    text
                    onClick={handleReset}
                />
            }
        </FormFieldCustom>
    );
}