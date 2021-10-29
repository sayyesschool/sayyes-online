import { useCallback, useState } from 'react';

import { upload } from 'shared/utils/file';

import AudioList from 'shared/components/audio-list';
import AudioForm from 'shared/components/audio-form';
import FormDialog from 'shared/components/form-dialog';
import PageFAB from 'shared/components/page-fab';

export default function CourseAudios({ course, onCreate, onUpdate, onDelete }) {
    const [audio, setAudio] = useState();

    const handleCreate = useCallback((data, file) => {
        setAudio(undefined);

        const promise = file ?
            upload(file, { path: `courses/${course.id}/audios/` })
                .then(response => {
                    data.url = response.url;
                })
            :
            Promise.resolve();

        promise.then(() => onCreate(course.id, data));
    }, [course, onCreate]);

    const handleUpdate = useCallback((data, file) => {
        setAudio(undefined);

        const promise = file ?
            upload(file, { path: `courses/${course.id}/audios/` })
                .then(response => {
                    data.url = response.url;
                })
            :
            Promise.resolve();

        promise.then(() => onUpdate(course.id, audio.id, data));
    }, [course, audio, onUpdate]);

    const handleDelete = useCallback(audio => {
        if (confirm('Вы уверены что хотите удалить аудио?')) {
            onDelete(course.id, audio.id);
        }
    }, [course, audio, onDelete]);

    const handleClose = useCallback(() => {
        setAudio(undefined);
    }, []);

    return (
        <section className="course-audios">
            <AudioList
                audios={course.audios}
                onSelect={setAudio}
                onDelete={handleDelete}
            />

            <FormDialog
                title={audio?.id ? 'Редактирование аудио' : 'Новое аудио'}
                open={Boolean(audio)}
                fullscreen
                onClose={handleClose}
            >
                <AudioForm
                    id="audio-form"
                    audio={audio}
                    onSubmit={audio?.id ? handleUpdate : handleCreate}
                />
            </FormDialog>

            <PageFAB
                icon="add"
                onClick={() => setAudio({})}
            />
        </section>
    );
}