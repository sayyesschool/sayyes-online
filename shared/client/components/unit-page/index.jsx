import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { useCourse } from 'shared/hooks/courses';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import PageHeader from 'shared/components/page-header';
import PageContent from 'shared/components/page-content';
import PageSideSheet from 'shared/components/page-side-sheet';
import CourseContents from 'shared/components/course-contents';
import UnitContent from 'shared/components/unit-content';
import UnitAudio from 'shared/components/unit-audio';
import UnitVideo from 'shared/components/unit-video';

import './index.scss';

export default function UnitPage({ match }) {
    const rootRef = useRef();

    const [course] = useCourse(match.params.courseId);

    const [isFullscreen, setFullscreen] = useState(false);
    const [isSideSheetOpen, setSideSheetOpen] = useState(false);
    const [sideSheetView, setSideSheetView] = useState('video');

    useEffect(() => {
        if (course) {
            rootRef.current?.addEventListener('fullscreenchange', event => {
                setFullscreen(document.fullscreenElement === event.target);
            });
        }
    }, [course]);

    useEffect(() => {
        if (isFullscreen) {
            rootRef.current.requestFullscreen();
        } else if (document.fullscreenElement) {
            document.exitFullscreen();
        }
    }, [course, isFullscreen]);

    const openSideSheet = useCallback(view => {
        setSideSheetView(view);
        setSideSheetOpen(true);
    }, []);

    const toggleFullscreen = useCallback(() => {
        setFullscreen(value => !value);
    }, []);

    if (!course) return <LoadingIndicator />;

    const unit = course.unitsById.get(match.params.unitId);

    return (
        <>
            <PageSideSheet
                title={sideSheetTitle[sideSheetView]}
                open={isSideSheetOpen}
                onClose={() => setSideSheetOpen(false)}
            >
                {sideSheetView === 'audio' &&
                    <UnitAudio unit={unit} />
                }

                {sideSheetView === 'video' &&
                    <UnitVideo unit={unit} />
                }

                {sideSheetView === 'contents' &&
                    <CourseContents course={course} unit={unit} />
                }
            </PageSideSheet>

            <Page ref={rootRef} id="unit-page">
                <PageHeader
                    title={unit.title}
                    breadcrumbs={[
                        <Link to={course.url}>{course.title}</Link>
                    ]}
                    actions={[
                        { icon: 'list', onClick: () => openSideSheet('contents') },
                        unit.audios?.length > 0 && { icon: 'audiotrack', onClick: () => openSideSheet('audio') },
                        unit.videos?.length > 0 && { icon: 'movie', onClick: () => openSideSheet('video') },
                        { icon: isFullscreen ? 'fullscreen_exit' : 'fullscreen', onClick: () => toggleFullscreen() }
                    ]}
                />

                <PageContent>
                    <UnitContent
                        course={course}
                        unit={unit}
                    />
                </PageContent>
            </Page>
        </>
    );
}

const sideSheetTitle = {
    contents: 'Содержание',
    audio: 'Аудио',
    video: 'Видeо'
};