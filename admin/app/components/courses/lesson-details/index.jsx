import PageFAB from 'shared/components/page-fab';

import LessonForm from 'app/components/courses/lesson-form';

import './index.scss';

export default function LessonDetails({
    course,
    lesson,

    onUpdate
}) {
    return (
        <section className="lesson-details">
            <LessonForm
                course={course}
                lesson={lesson}
                onSubmit={onUpdate}
            />

            <PageFAB
                icon="save"
                type="submit"
                form="lesson-form"
            />
        </section>
    );
}