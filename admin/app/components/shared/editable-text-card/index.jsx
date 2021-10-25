import { useEffect, useCallback, useRef } from 'react';
import {
    Card,
    IconButton,
    TextField,
    Typography
} from 'mdc-react';

import { useBoolean } from 'shared/hooks/state';

import './index.scss';

export default function EditableTextCard({ title, subtitle, text, onUpdate }) {
    const textFieldRef = useRef();

    const [isEditing, toggleEditing] = useBoolean(false);

    useEffect(() => {
        if (isEditing) {
            textFieldRef.current.control.focus();
        }
    }, [isEditing]);

    const handleSubmit = useCallback(() => {
        const value = textFieldRef.current.control.value;

        onUpdate(value)
            .then(() => toggleEditing(false));
    }, []);

    return (
        <Card className="editable-text-card">
            <Card.Header
                title={title}
                subtitle={(!isEditing && !text) && subtitle}
                actions={
                    isEditing ?
                        [
                            <IconButton
                                icon="save"
                                onClick={handleSubmit}
                            />,
                            <IconButton
                                icon="close"
                                onClick={toggleEditing}
                            />
                        ]
                        :
                        <IconButton
                            icon="edit"
                            onClick={toggleEditing}
                        />
                }
            />

            {isEditing ?
                <Card.Section>
                    <TextField
                        ref={textFieldRef}
                        defaultValue={text}
                        filled
                        textarea
                    />
                </Card.Section>
                :
                (text &&
                    <Card.Section primary>
                        <Typography noMargin>{text}</Typography>
                    </Card.Section>
                )
            }
        </Card>
    );
}