import React from 'react';
import {
    IconButton
} from 'mdc-react';

import PDFViewer from 'shared/components/pdf-viewer';
import ExerciseContent from 'app/components/class/exercise-content';

import './index.scss';

export default function LessonContent({ number, course, unit, lesson }) {
    return (
        <article className="lesson-content">
            <header className="lesson-content__header">
                <h1 className="lesson-title"><b>Lesson 1</b> <span>{lesson.title}</span><IconButton icon="panorama_fish_eye" /></h1>
            </header>

            <section>
                {lesson.document &&
                    <PDFViewer
                        file={`https://static.sayes.ru/courses/${course.slug}/documents/${lesson.document}`}
                    />
                }

                {lesson.image &&
                    <img
                        src={`https://static.sayes.ru/courses/${course.slug}/images/${lesson.image}`}
                    />
                }

                {lesson.exercises &&
                    lesson.exercises.map((exercise, index) =>
                        <ExerciseContent
                            key={exercise.id}
                            number={index + 1}
                            course={course}
                            unit={unit}
                            lesson={lesson}
                            exercise={exercise}
                        />
                    )
                }
            </section>
        </article>
    );
}