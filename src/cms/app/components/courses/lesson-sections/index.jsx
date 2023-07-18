import { useCallback, useState } from 'react';

import { useBoolean } from 'shared/hooks/state';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import FormDialog from 'shared/components/form-dialog';
import PageSection from 'shared/components/page-section';

import SectionForm from 'app/components/courses/section-form';
import SectionsList from 'app/components/courses/sections-list';

export default function LessonSections({
    lesson,
    selectedSection,

    onCreate,
    onDelete,
    onReorder
}) {
    const [section, setSection] = useState(selectedSection);
    const [isFormOpen, toggleFormOpen] = useBoolean(false);
    const [isConfirmationDialogOpen, toggleConfirmationDialogOpen] = useBoolean(false);

    const handleCreate = useCallback(data => {
        return onCreate(data)
            .finally(() => toggleFormOpen(false));
    }, []);

    const handleDelete = useCallback(() => {
        return onDelete(section)
            .finally(() => toggleConfirmationDialogOpen(false));
    }, [section]);

    const handleReorder = useCallback((index, dir) => {
        const sections = lesson._sections.slice();
        const section = sections[index];
        const otherSection = sections[index + dir];

        sections[index + dir] = section;
        sections[index] = otherSection;

        onReorder({ _sections: sections });
    }, [lesson]);

    const handleDeleteRequest = useCallback(section => {
        setSection(section);
        toggleConfirmationDialogOpen(true);
    }, []);

    return (
        <PageSection
            className="LessonSections"
            title="Секции"
            actions={[{
                key: 'add',
                icon: 'add',
                title: 'Добавить секцию',
                onClick: toggleFormOpen
            }]}
            compact
        >
            {lesson.sections?.length > 0 &&
                <SectionsList
                    sections={lesson.sections}
                    selectedSection={selectedSection}
                    onSelect={selectedSection && setSection}
                    onReorder={handleReorder}
                    onDelete={handleDeleteRequest}
                />
            }

            <FormDialog
                title="Новая секция"
                open={isFormOpen}
                onClose={toggleFormOpen}
            >
                <SectionForm
                    id="section-form"
                    onSubmit={handleCreate}
                />
            </FormDialog>

            <ConfirmationDialog
                title="Удалить секцию?"
                message={section && `Секция "${section.title}" будет удалена без возможности восстановления.`}
                open={isConfirmationDialogOpen}
                onConfirm={handleDelete}
                onClose={toggleConfirmationDialogOpen}
            />
        </PageSection>
    );
}