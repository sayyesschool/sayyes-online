import Button from 'shared/ui-components/button';
import PageSection from 'shared/components/page-section';

import LessonForm from 'app/components/courses/lesson-form';

import './index.scss';

export default function LessonDetails({
    course,
    lesson,

    onUpdate
}) {
    return (
        <PageSection
            title="Детали"
            className="lesson-details"
            actions={
                <Button
                    type="submit"
                    form="lesson-form"
                    icon="save"
                    text
                />
            }
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