import React, { useState, useCallback } from 'react';

import { useBoolean } from 'shared/hooks/state';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import LoadingIndicator from 'shared/components/loading-indicator';
import FormDialog from 'shared/components/form-dialog';
import Page from 'shared/components/page';
import PageTopBar from 'shared/components/page-top-bar';
import PageContent from 'shared/components/page-content';

import { useStore } from 'app/hooks/store';
import TeachersTable from 'app/components/teachers/teachers-table';
import TeacherForm from 'app/components/teachers/teacher-form';

export default function TeachersPage({ history }) {
    const [teachers, actions] = useStore('teachers.list');
    const [teacher, setTeacher] = useState();

    const [isFormOpen, toggleFormOpen] = useBoolean(false);
    const [isConfirmationDialogOpen, toggleConfirmationDialogOpen] = useBoolean(false);

    const createTeacher = useCallback(data => {
        return actions.createTeacher(data)
            .then(() => toggleFormOpen(false));
    }, []);

    const deleteTeacher = useCallback(() => {
        return actions.deleteTeacher(teacher.id)
            .then(() => {
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
        <Page id="teachers-page">
            <PageTopBar
                title="Преподаватели"
                actions={[
                    {
                        key: 'add',
                        label: 'Создать',
                        icon: 'add',
                        outlined: true,
                        onClick: toggleFormOpen
                    }
                ]}
            />

            <PageContent>
                <TeachersTable
                    teachers={teachers}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </PageContent>

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