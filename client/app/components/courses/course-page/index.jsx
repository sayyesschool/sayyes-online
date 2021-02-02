import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import { useEnrollment } from 'shared/hooks/enrollments';
import { useCourse } from 'shared/hooks/courses';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import PageHeader from 'shared/components/page-header';
import PageContent from 'shared/components/page-content';
import PageSideSheet from 'shared/components/page-side-sheet';
import CourseContent from 'shared/components/course-content';
import CourseContents from 'shared/components/course-contents';
import UnitContent from 'shared/components/unit-content';
import UnitAudio from 'shared/components/unit-audio';
import UnitVideo from 'shared/components/unit-video';

import './index.scss';

export default function CoursePage({ match }) {
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

    if (!course) return <LoadingIndicator />;


    const unit = course.unitsById.get(match.params.unitId);

    return (
        <>
            {unit &&
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
            }

            <Page ref={rootRef} id="course-page">
                <PageHeader
                    title={unit ? unit.title : course.title}
                    breadcrumbs={unit && [
                        <Link to={course.url}>{course.title}</Link>
                    ]}
                    actions={unit && [
                        { icon: 'list', onClick: () => openSideSheet('contents') },
                        unit.audios?.length > 0 && { icon: 'audiotrack', onClick: () => openSideSheet('audio') },
                        unit.videos?.length > 0 && { icon: 'movie', onClick: () => openSideSheet('video') },
                        { icon: isFullscreen ? 'fullscreen_exit' : 'fullscreen', onClick: () => toggleFullscreen() }
                    ]}
                    pullContent
                />

                <PageContent>
                    <Switch>
                        <Route exact path="*/courses/:courseId">
                            <CourseContent
                                course={course}
                            />
                        </Route>

                        <Route exact path="*/courses/:courseId/units/:unitId">
                            <UnitContent
                                course={course}
                                unit={unit}
                            />
                        </Route>
                    </Switch>
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