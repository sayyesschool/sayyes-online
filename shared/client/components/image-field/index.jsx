import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
import {
    Button,
    Card,
    FormFieldCustom, FormLabel,
    Image,
    Input
} from '@fluentui/react-northstar';

import storage from 'shared/services/storage';
import Icon from 'shared/components/material-icon';

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
    value = defaultValue,
    src = value.src,
    alt: _alt = value.alt,
    error,
    errorMessage,
    onChange,
    ...props
}, ref) {
    const fileInputRef = useRef();
    const altInputRef = useRef();

    const [alt, setAlt] = useState(_alt);

    useImperativeHandle(ref, () => ({
        get input() { return fileInputRef.current; },
        get file() { return fileInputRef.current.files[0]; },
        reset: () => fileInputRef.current.reset()
    }));

    const handleAdd = useCallback(() => {
        fileInputRef.current.click();
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
        const path = new URL(src).pathname.split('/').slice(2).join('/');

        storage.delete(path)
            .then(() => {
                onChange(null, {
                    name,
                    value: undefined
                });
            })
            .catch(console.error);
    }, [name, src]);

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

                    <Button
                        type="button"
                        icon={<Icon>add</Icon>}
                        iconOnly
                        text
                        onClick={handleAdd}
                    />
                </FormLabel>
            }

            {src &&
                <Card compact ghost>
                    <Card.TopControls>
                        <Button
                            type="button"
                            icon={<Icon>edit</Icon>}
                            iconOnly
                            text
                            onClick={handleAdd}
                        />

                        <Button
                            type="button"
                            icon={<Icon>delete</Icon>}
                            iconOnly
                            text
                            onClick={handleDelete}
                        />
                    </Card.TopControls>

                    <Card.Preview fitted>
                        <Image
                            src={src}
                            alt={alt}
                            fluid
                        />
                    </Card.Preview>

                    <Card.Footer>
                        <Input
                            ref={altInputRef}
                            label="Описание"
                            labelPosition="inside"
                            fluid
                        />
                    </Card.Footer>
                </Card>
            }
        </FormFieldCustom>
    );
}