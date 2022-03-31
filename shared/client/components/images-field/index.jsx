import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import {
    Button,
    Card,
    Flex,
    FormFieldCustom, FormLabel,
    Image
} from '@fluentui/react-northstar';

import storage from 'shared/services/storage';
import Icon from 'shared/components/material-icon';

import './index.scss';

export default forwardRef(ImagesField);

function ImagesField({
    name,
    label = 'Изображения',
    accept = 'image/jpeg,image/png,image/jpeg',
    images,
    uploadPath,
    onChange,
    ...props
}, ref) {
    const inputRef = useRef();

    useImperativeHandle(ref, () => ({
        get input() { return inputRef.current; },
        reset: () => inputRef.reset()
    }));

    const handleChange = useCallback(event => {
        const file = event.target.files[0];

        if (file) {
            storage.upload(file, {
                path: 'courses/foo/images/'
            })
                .then(response => {
                    onChange(null, {
                        name,
                        value: images.concat({ src: response.data.url })
                    });
                })
                .catch(console.error);
        }
    }, [name, images]);

    const handleAdd = useCallback(() => {
        inputRef.current.click();
    }, []);

    const handleDelete = useCallback(image => {
        const path = new URL(image.src).pathname.split('/').slice(2).join('/');

        storage.delete(path)
            .then(response => {
                onChange(null, {
                    name,
                    value: images.filter(image => image.src !== response.data.url)
                });
            })
            .catch(console.error);
    }, [images]);

    return (
        <FormFieldCustom className="images-field">
            <input
                ref={inputRef}
                type="file"
                accept={accept}
                onChange={handleChange}
                {...props}
            />

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

            <Flex>
                {images.map((image, index) =>
                    <Card key={index} compact>
                        <Card.Preview fitted>
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fluid
                            />
                        </Card.Preview>

                        <Button
                            type="button"
                            icon={<Icon>delete</Icon>}
                            iconOnly
                            text
                            onClick={() => handleDelete(image)}
                        />
                    </Card>
                )}
            </Flex>
        </FormFieldCustom>
    );
}