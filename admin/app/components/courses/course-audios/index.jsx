import { useCallback, useState } from 'react';
import {
    Button
} from '@fluentui/react-northstar';

import AudioList from 'shared/components/audio-list';
import AudioForm from 'shared/components/audio-form';
import FormDialog from 'shared/components/form-dialog';
import Icon from 'shared/components/icon';
import PageSection from 'shared/components/page-section';
import { uploadFile } from 'shared/services/storage';

import './index.scss';

export default function CourseAudios({ course, onCreate, onUpdate, onDelete }) {
    const [audio, setAudio] = useState();

    const handleAdd = useCallback(() => {
        setAudio({});
    }, []);

    const handleCreate = useCallback((data, file) => {
        setAudio(undefined);

        const promise = file ?
            uploadFile(file, { path: `courses/${course.id}/audios/` })
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
            uploadFile(file, { path: `courses/${course.id}/audios/` })
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
        <PageSection
            className="course-audios"
            title="Аудио"
            actions={[
                <Button
                    key="search"
                    icon={<Icon>search</Icon>}
                    iconOnly
                    text
                    onClick={handleAdd}
                />,
                <Button
                    key="add"
                    icon={<Icon>add</Icon>}
                    iconOnly
                    text
                    onClick={handleAdd}
                />
            ]}
        >
            <AudioList
                audios={course.audios}
                onSelect={setAudio}
                onDelete={handleDelete}
            />

            <FormDialog
                title={audio?.id ? 'Редактирование аудио' : 'Новое аудио'}
                open={Boolean(audio)}
                onClose={handleClose}
            >
                <AudioForm
                    id="audio-form"
                    audio={audio}
                    onSubmit={audio?.id ? handleUpdate : handleCreate}
                />
            </FormDialog>
        </PageSection>
    );
}