import PageSection from 'shared/components/page-section';

import CourseForm from 'app/components/courses/course-form';

export default function CourseDetails({ course, onUpdate, ...props }) {
    return (
        <PageSection
            className="sy-CourseDetails"
            title="Детали"
            actions={[{
                key: 'save',
                icon: 'save',
                title: 'Сохранить',
                type: 'submit',
                form: 'course-form'
            }]}
            {...props}
        >
            <CourseForm
                id="course-form"
                course={course}
                onSubmit={onUpdate}
            />
        </PageSection>
    );
}