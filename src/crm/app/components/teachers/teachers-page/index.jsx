import { useCallback, useState } from 'react';

import { useBoolean } from 'shared/hooks/state';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import LoadingIndicator from 'shared/components/loading-indicator';
import FormDialog from 'shared/components/form-dialog';
import Page from 'shared/components/page';

import { useStore } from 'app/store';
import TeachersTable from 'app/components/teachers/teachers-table';
import TeacherForm from 'app/components/teachers/teacher-form';

export default function TeachersPage({ history }) {
    const [teachers, actions] = useStore('teachers.list');
    const [teacher, setTeacher] = useState();

    const [isFormOpen, toggleFormOpen] = useBoolean(false);
    const [isConfirmationDialogOpen, toggleConfirmationDialogOpen] = useBoolean(false);

    const createTeacher = useCallback(data => {
        return actions.createTeacher(data)
            .finally(() => toggleFormOpen(false));
    }, []);

    const deleteTeacher = useCallback(() => {
        return actions.deleteTeacher(teacher.id)
            .finally(() => {
                setTeacher(null);
                toggleConfirmationDialogOpen(false);
            });
    }, [teacher]);

    const handleEdit = useCallback(teacher => {
        history.push(teacher.url, { edit: true });
    }, []);

    const handleDelete = useCallback(teacher => {
        setTeacher(teacher);
        toggleConfirmationDialogOpen(true);
    }, []);

    if (!teachers) return <LoadingIndicator />;

    return (
        <Page className="TeachersPage">
            <Page.Header
                title="Преподаватели"
                actions={[{
                    key: 'add',
                    icon: 'add',
                    title: 'Создать',
                    onClick: toggleFormOpen
                }]}
            />

            <Page.Content>
                <Page.Section variant="outlined" compact>
                    <TeachersTable
                        teachers={teachers}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </Page.Section>
            </Page.Content>

            <FormDialog
                form="teacher-form"
                title="Новый преподаватель"
                open={isFormOpen}
                onClose={toggleFormOpen}
            >
                <TeacherForm
                    id="teacher-form"
                    onSubmit={createTeacher}
                />
            </FormDialog>

            <ConfirmationDialog
                title="Подтвердите действие"
                message={`Вы действительно хотите удалить клиента ${teacher?.fullname}?`}
                open={isConfirmationDialogOpen}
                onConfirm={deleteTeacher}
                onClose={toggleConfirmationDialogOpen}
            />
        </Page>
    );
}