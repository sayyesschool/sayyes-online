import { useCallback, useEffect, useRef, useState } from 'react';
import classnames from 'classnames';

import { useBoolean } from 'shared/hooks/state';
import { ButtonGroup, IconButton, Text } from 'shared/ui-components';

export default function EditableText({
    content,
    onChange = Function.prototype,
    onUpdate = Function.prototype,

    className,
    ...props
}) {
    const inputRef = useRef();

    const [isEditing, toggleEditing] = useBoolean(false);
    const [value, setValue] = useState(content);

    const handleChange = useCallback(event => {
        const value = event.target.value;

        setValue(value);
        onChange(value);
    }, [onChange]);

    const handleUpdate = useCallback(() => {
        const value = inputRef.current.value?.trim();

        setValue(value);
        onUpdate(value);
        toggleEditing();
    }, [onUpdate]);

    useEffect(() => {
        if (isEditing) inputRef.current?.focus();
    }, [isEditing]);

    const classNames = classnames(className, 'EditableText', {
        'EditableText--editing': isEditing
    });

    return (
        <Text
            className={classNames}
            content={!isEditing ? value :
                <span className="EditableText__input">
                    <span>{value}</span>

                    <input
                        ref={inputRef}
                        value={value}
                        required
                        onChange={handleChange}
                    />
                </span>
            }
            end={isEditing ?
                <ButtonGroup variant="plain" spacing={1}>
                    <IconButton
                        icon="close"
                        color="neutral"
                        size="small"
                        variant="plain"
                        onClick={toggleEditing}
                    />

                    <IconButton
                        icon="check"
                        color="neutral"
                        size="small"
                        variant="plain"
                        onClick={handleUpdate}
                    />
                </ButtonGroup>
                :
                <IconButton
                    icon="edit"
                    color="neutral"
                    size="small"
                    variant="plain"
                    onClick={toggleEditing}
                />
            }
            {...props}
        />
    );
}