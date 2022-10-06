import Button from 'shared/ui-components/button';
import PageSection from 'shared/components/page-section';

import CourseForm from 'app/components/courses/course-form';

import './index.scss';

export default function CourseDetails({ course, onUpdate, ...props }) {
    return (
        <PageSection
            className="course-details"
            title="Детали"
            actions={
                <Button
                    icon="save"
                    type="submit"
                    form="course-form"
                    text
                />
            }
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