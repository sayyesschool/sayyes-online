import { useCallback, useEffect } from 'react';

import { useBoolean } from 'shared/hooks/state';
import { Flex, Grid } from 'shared/ui-components';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import LoadingIndicator from 'shared/components/loading-indicator';
import FormDialog from 'shared/components/form-dialog';
import Page from 'shared/components/page';

import { useStore } from 'app/hooks/store';
import TeacherForm from 'app/components/teachers/teacher-form';
import TeacherDetails from 'app/components/teachers/teacher-details';
import TeacherEnrollments from 'app/components/teachers/teacher-enrollments';
import TeacherLessons from 'app/components/teachers/teacher-lessons';

export default function TeacherPage({ match, location, history }) {
    const [teacher, actions] = useStore('teachers.single');

    const [isTeacherFormOpen, toggleTeacherFormOpen] = useBoolean(false);
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