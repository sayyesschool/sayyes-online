import { useCallback, useState } from 'react';
import {
    Card,
    IconButton
} from 'mdc-react';

import { upload } from 'shared/utils/file';

import AudioList from 'shared/components/audio-list';
import AudioForm from 'shared/components/audio-form';
import FormDialog from 'shared/components/form-dialog';

export default function CourseAudios({ course, onCreate, onDelete }) {
    const [audio, setAudio] = useState();

    const handleSubmit = useCallback((data, file) => {
        setAudio(undefined);

        if (file) {
            upload(file, { path: `courses/${course.id}/audios/` })
                .then(response => {
                    onCreate({
                        ...data,
                        url: response.url
                    });
                });
        } else {
            onCreate(data);
        }
    }, [course]);

    const handleClose = useCallback(() => {
        setAudio(undefined);
    }, []);

    return (
        <section className="course-audios">
            <Card>
                <Card.Header
                    title="Аудио"
                    actions={
                        <IconButton
                            icon="add"
                            onClick={() => setAudio({})}
                        />
                    }
                />

                <Card.Section>
                    <AudioList
                        audios={course.audios}
                        onClick={setAudio}
                        onDelete={onDelete}
                    />
                </Card.Section>
            </Card>

            <FormDialog
                title={audio?.id ? 'Редактирование аудио' : 'Новое аудио'}
                open={Boolean(audio)}
                onClose={handleClose}
            >
                <AudioForm
                    id="audio-form"
                    audio={audio}
                    onSubmit={handleSubmit}
                />
            </FormDialog>
        </section>
    );
}