import {
    Button
} from '@fluentui/react-northstar';

import Icon from 'shared/components/material-icon';
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
                    icon={<Icon icon="save" />}
                    type="submit"
                    form="course-form"
                    iconOnly
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