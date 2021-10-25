import { useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    LayoutGrid as Grid
} from 'mdc-react';

import { useBoolean } from 'shared/hooks/state';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import LoadingIndicator from 'shared/components/loading-indicator';
import FormDialog from 'shared/components/form-dialog';
import Page from 'shared/components/page';
import PageTopBar from 'shared/components/page-top-bar';
import PageContent from 'shared/components/page-content';

import { useStore } from 'app/hooks/store';
import TeacherForm from 'app/components/teachers/teacher-form';
import TeacherDetails from 'app/components/teachers/teacher-details';
import TeacherEnrollments from 'app/components/teachers/teacher-enrollments';

import './index.scss';

export default function TeacherPage({ match, location, history }) {
    const [teacher, teacherActions] = useStore('teachers.single');

    const [isTeacherFormOpen, toggleTeacherFormOpen] = useBoolean(false);
    const [isConfirmationDialogOpen, toggleConfirmationDialogOpen] = useBoolean(false);

    useEffect(() => {
        teacherActions.getTeacher(match.params.id)
            .then(() => {
                if (location.state?.edit) {
                    toggleTeacherFormOpen(true);
                } else if (location.state?.delete) {
                    toggleConfirmationDialogOpen(true);
                }
            });
    }, []);

    const updateTeacher = useCallback(data => {
        return teacherActions.updateTeacher(teacher.id, data)
            .then(() => toggleTeacherFormOpen(false));
    }, [teacher]);

    const deleteTeacher = useCallback(() => {
        return teacherActions.deleteTeacher(teacher.id)
            .then(() => history.push('/teachers'));
    }, [teacher]);

    if (!teacher) return <LoadingIndicator />;

    return (
        <Page id="teacher">
            <PageTopBar
                breadcrumbs={[
                    <Link to="/teachers">Преподаватели</Link>
                ]}
                title={teacher?.fullname}
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
                <Grid>
                    <Grid.Cell span="3">
                        <TeacherDetails
                            teacher={teacher}
                            onEdit={toggleTeacherFormOpen}
                        />
                    </Grid.Cell>

                    <Grid.Cell span="3">
                        <TeacherEnrollments
                            teacher={teacher}
                        />
                    </Grid.Cell>
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