import { useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    IconButton
} from 'mdc-react';

import { useCourse } from 'shared/hooks/courses';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import PageHeader from 'shared/components/page-header';
import PageContent from 'shared/components/page-content';
import PageSideSheet from 'shared/components/page-side-sheet';
import CourseContents from 'shared/components/course-contents';
import LessonContent from 'shared/components/lesson-content';
import LessonAudio from 'shared/components/lesson-audio';
import LessonVideo from 'shared/components/lesson-video';

import './index.scss';

export default function LessonPage({ match }) {
    const [course] = useCourse(match.params.course);

    const rootRef = useRef();

    const [isSideSheetOpen, setSideSheetOpen] = useState(false);
    const [sideSheetView, setSideSheetView] = useState('video');

    const openSideSheet = useCallback(view => {
        setSideSheetView(view);
        setSideSheetOpen(true);
    }, []);

    if (!course) return <LoadingIndicator />;

    const unit = course.unitsBySlug.get(match.params.unit);
    const lesson = course.lessonsBySlug.get(match.params.lesson);

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
                        course={course}
                        unit={unit}
                    />
                }
            </PageSideSheet>

            <Page ref={rootRef} className="lesson-page">
                <PageHeader
                    title={lesson.title}
                    breadcrumbs={[
                        <Link to={course.url}>{course.title}</Link>,
                        <Link to={unit.url}>{unit.title}</Link>
                    ]}
                    actions={[
                        <IconButton
                            icon="format_list_bulleted"
                            onClick={() => openSideSheet('contents')}
                        />,
                        (lesson.audios?.length > 0 &&
                            <IconButton
                                icon="audiotrack"
                                onClick={() => openSideSheet('audio')}
                            />
                        ),
                        (lesson.videos?.length > 0 &&
                            <IconButton
                                icon="movie"
                                onClick={() => openSideSheet('video')}
                            />
                        )
                    ]}
                    pullContent
                />

                <PageContent>
                    <LessonContent
                        course={course}
                        unit={unit}
                        lesson={lesson}
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