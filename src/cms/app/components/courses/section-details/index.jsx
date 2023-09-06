import PageSection from 'shared/components/page-section';

import SectionForm from 'app/components/courses/section-form';

export default function SectionDetails({
    course,
    section,

    onUpdate
}) {
    return (
        <PageSection
            className="SectionDetails"
            title="Детали"
            actions={[{
                key: 'save',
                icon: 'save',
                title: 'Сохранить',
                type: 'submit',
                form: 'section-form'
            }]}
        >
            <SectionForm
                id="section-form"
                course={course}
                section={section}
                onSubmit={onUpdate}
            />
        </PageSection>
    );
}