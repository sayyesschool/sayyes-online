import React, { useEffect, useCallback } from 'react';

import { useBoolean } from 'shared/hooks/state';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import PageTopBar from 'shared/components/page-top-bar';
import PageContent from 'shared/components/page-content';

import { useStore } from 'app/hooks/store';
import FormPanel from 'app/components/shared/form-panel';
import TeachersTable from 'app/components/teachers/teachers-table';
import TeacherForm from 'app/components/teachers/teacher-form';

export default function TeachersPage({ history }) {
    const [teachers, actions] = useStore('teachers.list');

    const [isFormOpen, toggleFormOpen] = useBoolean(false);

    const handleSubmit = useCallback(data => {
        actions.createTeacher(data)
            .then(() => toggleClientFormOpen(false));
    }, []);

    const handleEdit = useCallback(teacher => {
        history.push(teacher.url, { edit: true });
    }, []);

    const handleDelete = useCallback(teacher => {
        history.push(teacher.url, { delete: true });
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
                        unelevated: true,
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

            <FormPanel
                form="teacher-form"
                title="Новый преподаватель"
                open={isFormOpen}
                modal
                onClose={toggleFormOpen}
            >
                <TeacherForm
                    onSubmit={handleSubmit}
                />
            </FormPanel>
        </Page>
    );
}