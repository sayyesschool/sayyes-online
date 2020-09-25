import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
    IconButton,
    TabBar, Tab,
    Typography
} from 'mdc-react';

import PageSideSheet from 'shared/components/page-side-sheet';
import PDFViewer from 'shared/components/pdf-viewer';

import CourseContents from 'app/components/class/course-contents';
import UnitAudio from 'app/components/class/unit-audio';
import UnitVideo from 'app/components/class/unit-video';

import './index.scss';

export default function UnitContent({ enrollment, course, unit }) {
    const [view, setView] = useState('contents');
    const [isSideSheetOpen, setSideSheetOpen] = useState(false);
    const [activeLessonIndex, setActiveLessonIndex] = useState(0);

    const handleSideSheet = useCallback(view => {
        setView(view);
        setSideSheetOpen(true);
    }, []);

    if (!unit) return <LoadingIndicator />;

    return (
        <div id="unit-content">
            <header>
                <Typography variant="headline5" noMargin>
                    <Link to={`/class/${enrollment.id}`}>{course.title}</Link> › {unit.title}</Typography>

                <div>
                    <IconButton
                        icon="list"
                        onClick={() => handleSideSheet('contents')}
                    />

                    <IconButton
                        icon="library_music"
                        onClick={() => handleSideSheet('audio')}
                    />

                    <IconButton
                        icon="video_library"
                        onClick={() => handleSideSheet('video')}
                    />
                </div>
            </header>

            <TabBar value={activeLessonIndex} onChange={setActiveLessonIndex} minWidth>
                {unit.lessons.map((lesson, index) =>
                    <Tab
                        value={index}
                        label={`Lesson ${index + 1}`}
                    />
                )}
            </TabBar>

            <PageSideSheet
                title={sideSheetTitles[view]}
                open={isSideSheetOpen}
                onClose={() => setSideSheetOpen(false)}
            >
                {view === 'contents' &&
                    <CourseContents
                        course={course}
                    />
                }

                {view === 'audio' &&
                    <UnitAudio
                        course={course}
                        unit={unit}
                    />
                }

                {view === 'video' &&
                    <UnitVideo
                        course={course}
                        unit={unit}
                    />
                }
            </PageSideSheet>

            <section>
                {unit.document &&
                    <PDFViewer
                        file={`https://static.sayes.ru/courses/${course.slug}/documents/${unit.document}`}
                    />
                }

                <div className="lesson-content">
                    {unit.lessons.map((lesson, index) =>
                        <img
                            key={index}
                            src={`https://static.sayes.ru/courses/${course.slug}/images/${lesson.image}.png`}
                            style={{ display: index === activeLessonIndex ? 'block' : 'none' }}
                        />
                    )}
                </div>
            </section>
        </div>
    );
}

const sideSheetTitles = {
    contents: 'Содержание',
    audio: 'Аудио',
    video: 'Видeо'
};