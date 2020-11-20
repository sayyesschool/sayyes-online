import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

import { useEnrollment } from 'shared/hooks/enrollment';
import { useCourse } from 'shared/hooks/course';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import PageHeader from 'shared/components/page-header';
import PageContent from 'shared/components/page-content';
import PageSideSheet from 'shared/components/page-side-sheet';
import UnitContent from 'shared/components/class/unit-content';
import CourseContents from 'shared/components/class/course-contents';
import UnitAudio from 'shared/components/class/unit-audio';
import UnitVideo from 'shared/components/class/unit-video';

import './index.scss';

export default function UnitPage({ match }) {
    const rootRef = useRef();

    const [enrollment] = useEnrollment(match.params.enrollmentId);
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

    course.url = `/class/${enrollment.id}/course/${course.id}`;
    unit.url = `${course.url}/unit/${unit.id}`;
    unit.audios = unit._audios.map(title => course.audios.find(audio => audio.title === title));
    unit.videos = unit._videos.map(title => course.videos.find(video => video.title === title));

    // const segments = [course, unit, lesson].filter(item => !!item);
    // const [title] = segments.slice(-1).map(item => item.title);
    // const breadcrumbs = segments
    //     .slice(0, -1)
    //     .map(item => <Link to={item.url}>{item.title}</Link>);

    return (
        <Page ref={rootRef} id="unit-page">
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

            <div>
                <PageHeader
                    title={unit.title}
                    breadcrumbs={[
                        <Link to={course.url}>{course.title}</Link>
                    ]}
                    actions={[
                        { icon: 'list', onClick: () => openSideSheet('contents') },
                        { icon: 'audiotrack', onClick: () => openSideSheet('audio') },
                        { icon: 'movie', onClick: () => openSideSheet('video') },
                        { icon: isFullscreen ? 'fullscreen_exit' : 'fullscreen', onClick: () => toggleFullscreen() }
                    ]}
                />

                <PageContent>
                    <UnitContent
                        course={course}
                        unit={unit}
                    />
                </PageContent>
            </div>
        </Page>
    );
}

const sideSheetTitle = {
    contents: 'Содержание',
    audio: 'Аудио',
    video: 'Видeо'
};