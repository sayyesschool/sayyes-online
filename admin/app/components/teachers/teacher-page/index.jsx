import { useCallback, useEffect } from 'react';
import { Box, Grid } from '@fluentui/react-northstar';

import { useBoolean } from 'shared/hooks/state';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import LoadingIndicator from 'shared/components/loading-indicator';
import FormDialog from 'shared/components/form-dialog';
import Page from 'shared/components/page';
import PageContent from 'shared/components/page-content';
import PageHeader from 'shared/components/page-header';

import { useStore } from 'app/hooks/store';
import TeacherForm from 'app/components/teachers/teacher-form';
import TeacherDetails from 'app/components/teachers/teacher-details';
import TeacherEnrollments from 'app/components/teachers/teacher-enrollments';
import TeacherLessons from 'app/components/teachers/teacher-lessons';

import './index.scss';

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
        <Page id="teacher-page">
            <PageHeader
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

            <PageContent>
                <Grid columns="minmax(0, 1fr) minmax(0, 3fr)">
                    <Box>
                        <TeacherDetails
                            teacher={teacher}
                            onEdit={toggleTeacherFormOpen}
                        />
                    </Box>

                    <Box>
                        <TeacherEnrollments
                            teacher={teacher}
                        />

                        <TeacherLessons
                            teacher={teacher}
                        />
                    </Box>
                </Grid>
            </PageContent>

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