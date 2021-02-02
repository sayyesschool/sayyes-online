import React, { useEffect, useCallback } from 'react';
import {
    LayoutGrid as Grid
} from 'mdc-react';

import { useBoolean } from 'shared/hooks/state';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import PageTopBar from 'shared/components/page-top-bar';
import PageContent from 'shared/components/page-content';

import { useStore } from 'app/hooks/store';
import FormPanel from 'app/components/shared/form-panel';
import TeacherForm from 'app/components/teachers/teacher-form';
import TeacherDetails from 'app/components/teachers/teacher-details';

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

    const handleUpdate = useCallback(data => {
        teacherActions.updateTeacher(teacher.id, data)
            .then(() => setTeacherFormOpen(false));
    }, [teacher]);

    const handleDelete = useCallback(() => {
        teacherActions.deleteTeacher(teacher.id)
            .then(() => history.push('/teachers'));
    }, [teacher]);

    if (!teacher) return <LoadingIndicator />;

    return (
        <Page id="teacher">
            <PageTopBar
                title={teacher?.fullname}
                actions={[
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
                            onEdit={() => toggleTeacherFormOpen(true)}
                        />
                    </Grid.Cell>

                    <Grid.Cell span="3">
                        {/* <TeacherEnrollments
                            teacher={teacher}
                            onCreate={() => setEnrollmentFormOpen(true)}
                        /> */}
                    </Grid.Cell>
                </Grid>
            </PageContent>

            <FormPanel
                form="teacher-form"
                title="Данные преподавателя"
                open={isTeacherFormOpen}
                modal
                onClose={() => toggleTeacherFormOpen()}
            >
                <TeacherForm
                    teacher={teacher}
                    onSubmit={handleUpdate}
                />
            </FormPanel>

            <ConfirmationDialog
                title="Подтвердите действие"
                message="Вы действительно хотите удалить преподавателя?"
                open={isConfirmationDialogOpen}
                onConfirm={handleDelete}
                onClose={toggleConfirmationDialogOpen}
            />
        </Page>
    );
}