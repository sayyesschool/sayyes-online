import { useCallback, useEffect } from 'react';

import { RefEntity } from 'core/models/common/constants';

import ConfirmationDialog from 'shared/components/confirmation-dialog';
import FormDialog from 'shared/components/form-dialog';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import { UserDomainLabel } from 'shared/data/user';
import { useManagers } from 'shared/hooks/managers';
import { useBoolean } from 'shared/hooks/state';
import { useTeacher } from 'shared/hooks/teachers';
import { useUser } from 'shared/hooks/user';
import { Chip, Grid } from 'shared/ui-components';

import PasswordForm from 'crm/components/shared/password-form';
import TasksReference from 'crm/components/tasks/tasks-reference';
import TeacherDetails from 'crm/components/teachers/teacher-details';
import TeacherEnrollments from 'crm/components/teachers/teacher-enrollments';
import TeacherForm from 'crm/components/teachers/teacher-form';
import TeacherLessons from 'crm/components/teachers/teacher-lessons';
import TeacherTasks from 'crm/components/teachers/teacher-tasks';

export default function TeacherPage({ match, location, history }) {
    const [user] = useUser();
    const [teacher, actions] = useTeacher(match.params.id);
    const [managers] = useManagers();

    const [isTeacherFormOpen, toggleTeacherFormOpen] = useBoolean(false);
    const [isPasswordDialogOpen, togglePasswordDialogOpen] = useBoolean(false);
    const [isConfirmationDialogOpen, toggleConfirmationDialogOpen] = useBoolean(false);

    useEffect(() => {
        if (location.state?.edit) {
            toggleTeacherFormOpen(true);
        } else if (location.state?.delete) {
            toggleConfirmationDialogOpen(true);
        }
    }, []);

    const updateTeacher = useCallback(data => {
        return actions.updateTeacher(teacher.id, data)
            .then(() => toggleTeacherFormOpen(false));
    }, [teacher, actions]);

    const updatePassword = useCallback(password => {
        return actions.updateTeacher(teacher.id, { password })
            .finally(() => togglePasswordDialogOpen(false));
    }, [teacher, actions]);

    const deleteTeacher = useCallback(() => {
        return actions.deleteTeacher(teacher.id)
            .then(() => history.push('/teachers'));
    }, [teacher, actions]);

    if (!teacher) return <LoadingIndicator />;

    return (
        <Page className="TeacherPage">
            <Page.Header
                title={teacher.fullname}
                breadcrumbs={[
                    { content: 'Преподаватели', to: '/teachers' }
                ]}
                description={
                    <Chip.Group
                        chips={teacher.domains.map(domain => ({
                            key: domain,
                            content: UserDomainLabel[domain]
                        }))}
                        variant="plain"
                    />
                }
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

                    <Grid.Item xs={12}>
                        <TeacherTasks
                            teacher={teacher}
                        />
                    </Grid.Item>
                </Grid>
            </Page.Content>

            <FormDialog
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