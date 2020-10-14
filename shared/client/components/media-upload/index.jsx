import React, { useRef, useState, useCallback } from 'react';
import {
    Card,
    Icon,
    IconButton
} from 'mdc-react';

import FileInput from 'shared/components/file-input';

export default function MediaUpload({ media, folder, onUpdate }) {
    const fileInputRef = useRef();

    const [isEditing, setEditing] = useState(false);

    const handleSave = useCallback(() => {
        if (!fileInputRef.current.file) return;

        const file = fileInputRef.current.file;
        const formData = new FormData();
        const [, extension] = file.name.split('.');
        const filename = `${media.id}.${extension}`;

        formData.append('file', file, filename);
        formData.append('folder', 'courses/bright-ideas-1/images');

        fetch('https://static.sayes.ru/upload.php', {
            method: 'POST',
            body: formData
        }).then(response => response.json())
            .then(response => {
                onUpdate({ image: response.url });
            });
    }, []);

    return (
        <section className="lesson-media">
            <Card>
                <Card.Header
                    graphic={<Icon>insert_photo</Icon>}
                    title="Изображение"
                    subtitle={media.imageUrl}
                    actions={isEditing ?
                        <IconButton
                            icon="edit"
                            onClick={() => setEditing(true)}
                        />
                        :
                        <IconButton
                            icon="save"
                            onClick={handleSave}
                        />
                    }
                />

                {isEditing ?
                    <Card.Media
                        imageUrl={lesson.imageUrl}
                        wide
                    />
                    :
                    <FileInput
                        ref={fileInputRef}
                    />
                }
            </Card>
        </section>
    );
}