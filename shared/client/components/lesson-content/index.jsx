import React from 'react';
import {
    Avatar,
    Card,
    LayoutGrid,
    List
} from 'mdc-react';

//import PDFViewer from 'shared/components/pdf-viewer';
import ExerciseContent from 'shared/components/exercise-content';

import './index.scss';

export default function LessonContent({ course, unit, lesson }) {
    return (
        <section className="lesson-content">
            <Card>
                {/* {lesson.document &&
                    <PDFViewer
                        file={`https://static.sayes.ru/courses/${course.slug}/documents/${lesson.document}`}
                    />
                } */}

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
            </Card>
        </section>
    );
}