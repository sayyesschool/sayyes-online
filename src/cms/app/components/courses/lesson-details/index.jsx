import PageSection from 'shared/components/page-section';

import LessonForm from 'app/components/courses/lesson-form';

export default function LessonDetails({
    course,
    lesson,

    onUpdate
}) {
    return (
        <PageSection
            title="Детали"
            className="lesson-details"
            actions={[{
                key: 'save',
                icon: 'save',
                title: 'Сохранить',
                type: 'submit',
                form: 'lesson-form'
            }]}
        >
            <LessonForm
                id="lesson-form"
                course={course}
                lesson={lesson}
                onSubmit={onUpdate}
            />
        </PageSection>
    );
}