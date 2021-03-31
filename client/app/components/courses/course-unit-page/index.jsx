import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
    IconButton
} from 'mdc-react';

import { useEnrollment } from 'shared/hooks/enrollments';
import { useCourse } from 'shared/hooks/courses';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import PageHeader from 'shared/components/page-header';
import PageContent from 'shared/components/page-content';
import PageSideSheet from 'shared/components/page-side-sheet';
import CourseContents from 'shared/components/course-contents';
import UnitContent from 'shared/components/unit-content';
import LessonAudio from 'shared/components/lesson-audio';
import LessonVideo from 'shared/components/lesson-video';

import './index.scss';

export default function CourseUnitPage({ match }) {
    const [enrollment] = useEnrollment(match.params.enrollmentId);
    const [course] = useCourse(match.params.courseId);

    const rootRef = useRef();

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

    if (!enrollment || !course) return <LoadingIndicator />;

    const unit = course.unitsById.get(match.params.unitId);

    return (
        <>
            <PageSideSheet
                title={sideSheetTitle[sideSheetView]}
                open={isSideSheetOpen}
                onClose={() => setSideSheetOpen(false)}
            >
                {sideSheetView === 'audio' &&
                    <LessonAudio lesson={lesson} />
                }

                {sideSheetView === 'video' &&
                    <LessonVideo lesson={lesson} />
                }

                {sideSheetView === 'contents' &&
                    <CourseContents
                        enrollment={enrollment}
                        course={course}
                        unit={unit}
                    />
                }
            </PageSideSheet>

            <Page ref={rootRef} id="course-unit-page">
                <PageHeader
                    title={unit.title}
                    breadcrumbs={[
                        <Link to={enrollment.url + course.url}>{course.title}</Link>
                    ]}
                    actions={[
                        <IconButton
                            icon="format_list_bulleted"
                            onClick={() => openSideSheet('contents')}
                        />,
                        (unit.audios?.length > 0 &&
                            <IconButton
                                icon="audiotrack"
                                onClick={() => openSideSheet('audio')}
                            />
                        ),
                        (unit.videos?.length > 0 &&
                            <IconButton
                                icon="movie"
                                onClick={() => openSideSheet('video')}
                            />
                        ),
                        <IconButton
                            icon={isFullscreen ? 'fullscreen_exit' : 'fullscreen'}
                            onClick={() => toggleFullscreen()}
                        />
                    ]}
                    pullContent
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