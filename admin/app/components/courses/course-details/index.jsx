import PageFAB from 'shared/components/page-fab';

import CourseForm from 'app/components/courses/course-form';

import './index.scss';

export default function CourseDetails({ course, onUpdate }) {
    return (
        <section className="course-details">
            <CourseForm
                id="course-form"
                course={course}
                onSubmit={onUpdate}
            />

            <PageFAB
                icon="save"
                type="submit"
                form="course-form"
            />
        </section>
    );
}