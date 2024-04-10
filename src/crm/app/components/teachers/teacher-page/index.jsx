import { useCallback, useEffect } from 'react';

import ConfirmationDialog from 'shared/components/confirmation-dialog';
import FormDialog from 'shared/components/form-dialog';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import { useBoolean } from 'shared/hooks/state';
import { Grid } from 'shared/ui-components';

import PasswordForm from 'crm/components/shared/password-form';
import TeacherDetails from 'crm/components/teachers/teacher-details';
import TeacherEnrollments from 'crm/components/teachers/teacher-enrollments';
import TeacherForm from 'crm/components/teachers/teacher-form';
import TeacherLessons from 'crm/components/teachers/teacher-lessons';
import { useStore } from 'crm/hooks/store';

export default function TeacherPage({ match, location, history }) {
    const [teacher, actions] = useStore('teachers.single');

    const [isTeacherFormOpen, toggleTeacherFormOpen] = useBoolean(false);
    const [isPasswordDialogOpen, togglePasswordDialogOpen] = useBoolean(false);
    const [isConfirmationDialogOpen, toggleConfirmationDialogOpen] = useBoolean(false);

    useEffect(() => {
        actions.getTeacher(match.params.id)
            .then(() => {
                if (location.state?.edit) {
                    toggleTeacherFormOpen(true);
                } else if (location.state?.delete) {
                    toggleConfirmationDialogOpen(true);
                }
            });

        return () => actions.unsetTeacher();
    }, []);

    const updateTeacher = useCallback(data => {
        return actions.updateTeacher(teacher.id, data)
            .then(() => toggleTeacherFormOpen(false));
    }, [teacher]);

    const updatePassword = useCallback(password => {
        return actions.updateTeacher(teacher.id, { password })
            .finally(() => togglePasswordDialogOpen(false));
    }, [teacher]);

    const deleteTeacher = useCallback(() => {
        return actions.deleteTeacher(teacher.id)
            .then(() => history.push('/teachers'));
    }, [teacher]);

    if (!teacher) return <LoadingIndicator />;

    return (
        <Page className="TeacherPage">
            <Page.Header
                title={teacher?.fullname}
                breadcrumbs={[
                    {
                        text: 'Преподаватели',
                        url: '/teachers'
                    }
                ]}
                actions={[
                    {
                        key: 'password',
                        title: 'Изменить пароль',
                        icon: 'password',
                        onClick: togglePasswordDialogOpen
                    },
                    {
                        key: 'edit',
                        title: 'Редактировать',
                        icon: 'edit',
                        onClick: toggleTeacherFormOpen
                    },
                    {
                        key: 'delete',
                        title: 'Удалить',
                        icon: 'delete',
                        onClick: toggleConfirmationDialogOpen
                    }
                ]}
            />

            <Page.Content>
                <Grid gap="medium">
                    <Grid.Item xs={3}>
                        <TeacherDetails
                            teacher={teacher}
                            onEdit={toggleTeacherFormOpen}
                        />
                    </Grid.Item>

                    <Grid.Item xs={3}>
                        <TeacherLessons
                            teacher={teacher}
                        />
                    </Grid.Item>

                    <Grid.Item xs={3}>
                        <TeacherEnrollments
                            teacher={teacher}
                        />
                    </Grid.Item>
                </Grid>
            </Page.Content>

            <FormDialog
                form="teacher-form"
                title="Данные преподавателя"
                open={isTeacherFormOpen}
                onClose={toggleTeacherFormOpen}
            >
                <TeacherForm
                    id="teacher-form"
                    teacher={teacher}
                    onSubmit={updateTeacher}
                />
            </FormDialog>

            <FormDialog
                form="password-form"
                title="Изменение пароля"
                open={isPasswordDialogOpen}
                onClose={togglePasswordDialogOpen}
            >
                <PasswordForm
                    id="password-form"
                    onSubmit={updatePassword}
                />
            </FormDialog>

            <ConfirmationDialog
                title="Подтвердите действие"
                message="Вы действительно хотите удалить преподавателя?"
                open={isConfirmationDialogOpen}
                onConfirm={deleteTeacher}
                onClose={toggleConfirmationDialogOpen}
            />
        </Page>
    );
}