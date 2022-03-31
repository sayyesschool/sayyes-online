import { useCallback, useState } from 'react';
import {
    Button
} from '@fluentui/react-northstar';

import FormDialog from 'shared/components/form-dialog';
import MaterialIcon from 'shared/components/material-icon';
import PageSection from 'shared/components/page-section';
import VideoForm from 'shared/components/video-form';
import VideoList from 'shared/components/video-list';

import './index.scss';

export default function CourseVideos({ course, onCreate, onUpdate, onDelete }) {
    const [video, setVideo] = useState();

    const handleAdd = useCallback(() => {
        setVideo({});
    }, []);

    const handleCreate = useCallback((data, file) => {
        setVideo(undefined);

        const promise = file ?
            upload(file, { path: `courses/${course.id}/videos/` })
                .then(response => {
                    data.url = response.url;
                })
            :
            Promise.resolve();

        promise.then(() => onCreate(course.id, data));
    }, [course, onCreate]);

    const handleUpdate = useCallback((data, file) => {
        setVideo(undefined);

        const promise = file ?
            upload(file, { path: `courses/${course.id}/videos/` })
                .then(response => {
                    data.url = response.url;
                })
            :
            Promise.resolve();

        promise.then(() => onUpdate(course.id, video.id, data));
    }, [course, video, onUpdate]);

    const handleDelete = useCallback(video => {
        if (confirm('Вы уверены что хотите удалить аудио?')) {
            onDelete(course.id, video.id);
        }
    }, [course, onDelete]);

    const handleClose = useCallback(() => {
        setVideo(undefined);
    }, []);

    return (
        <PageSection
            className="course-videos"
            title="Видео"
            actions={
                <Button
                    icon={<MaterialIcon icon="add" />}
                    iconOnly
                    text
                    onClick={handleAdd}
                />
            }
        >
            <VideoList
                videos={course.videos}
                onDelete={handleDelete}
            />

            <FormDialog
                title={video?.id ? 'Редактирование видео' : 'Новое видео'}
                open={Boolean(video)}
                onClose={handleClose}
            >
                <VideoForm
                    id="video-form"
                    video={video}
                    onSubmit={video?.id ? handleUpdate : handleCreate}
                />
            </FormDialog>
        </PageSection>
    );
}