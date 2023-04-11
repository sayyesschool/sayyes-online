import { useCallback, useEffect, useRef, useState } from 'react';

import { useBoolean } from 'shared/hooks/state';
import { IconButton } from 'shared/ui-components';

import './index.scss';

export default function EditableText({
    content,
    required,
    onChange = Function.prototype,
    onUpdate = Function.prototype
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

    return isEditing ? (
        <span className="EditableText">
            <span className="EditableText__input">
                <span>{value}</span>

                <input
                    ref={inputRef}
                    value={value}
                    required={required}
                    onChange={handleChange}
                />
            </span>

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
        </span>
    ) : (
        <span className="EditableText">
            <span>{value}</span>

            <IconButton
                icon="edit"
                color="neutral"
                size="small"
                variant="plain"
                onClick={toggleEditing}
            />
        </span>
    );
}