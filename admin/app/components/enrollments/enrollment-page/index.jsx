import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
    Badge,
    IconButton,
    LayoutGrid
} from 'mdc-react';

import { useBoolean } from 'shared/hooks/state';
import { useEnrollment } from 'shared/hooks/enrollments';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import LoadingIndicator from 'shared/components/loading-indicator';
import FormDialog from 'shared/components/form-dialog';
import Page from 'shared/components/page';
import PageTopBar from 'shared/components/page-top-bar';
import PageContent from 'shared/components/page-content';

import EnrollmentForm from 'app/components/enrollments/enrollment-form';
import EnrollmentCommentsSidePanel from 'app/components/enrollments/enrollment-comments-side-panel';
import EnrollmentCourses from 'app/components/enrollments/enrollment-courses';
import EnrollmentDetails from 'app/components/enrollments/enrollment-details';
import EnrollmentMeta from 'app/components/enrollments/enrollment-meta';
import EnrollmentLessons from 'app/components/enrollments/enrollment-lessons';
import EnrollmentMaterials from 'app/components/enrollments/enrollment-materials';
import EnrollmentPayments from 'app/components/enrollments/enrollment-payments';
import EnrollmentStatus from 'app/components/enrollments/enrollment-status';
import EnrollmentSchedule from 'app/components/enrollments/enrollment-schedule';
import EnrollmentTrialLesson from 'app/components/enrollments/enrollment-trial-lesson';

import './index.scss';

export default function EnrollmentPage({ match, history }) {
    const [enrollment, actions] = useEnrollment(match.params.enrollmentId);

    const [isSidePanelOpen, toggleSidePanel] = useBoolean(false);
    const [isEnrollmentFormOpen, toggleEnrollmentFormOpen] = useBoolean(false);
    const [isConfirmationDialogOpen, toggleConfirmationDialogOpen] = useBoolean(false);

    const updateEnrollment = useCallback(data => {
        return actions.updateEnrollment(enrollment.id, data)
            .then(() => toggleEnrollmentFormOpen(false));
    }, [enrollment]);

    const updateEnrollmentSchedule = useCallback(data => {
        return actions.updateSchedule(enrollment.id, data);
    }, [enrollment]);

    const deleteEnrollment = useCallback(() => {
        return actions.deleteEnrollment(enrollment.id)
            .then(() => {
                history.push(`/clients/${enrollment.client.id}`);
                toggleConfirmationDialogOpen(false);
            });
    }, [enrollment]);

    if (!enrollment) return <LoadingIndicator />;

    return (
        <Page id="enrollment-page" loading={!enrollment}>
            <PageTopBar
                breadcrumbs={[
                    <Link to={enrollment?.client.url}>{enrollment.client.fullname}</Link>
                ]}
                title={enrollment.domainLabel}
                actions={[
                    (enrollment.client?.hhid && {
                        element: 'a',
                        href: `https://sayes.t8s.ru/Profile/${enrollment.client.hhid}`,
                        target: '_blank',
                        icon: 'link',
                        title: 'Открыть в Hollihop'
                    }),
                    <Badge key="comments" value={enrollment.comments.length} inset>
                        <IconButton
                            icon="comment"
                            title="Открыть комментарии"
                            onClick={toggleSidePanel}
                        />
                    </Badge>,
                    {
                        key: 'edit',
                        title: 'Изменить',
                        icon: 'edit',
                        onClick: toggleEnrollmentFormOpen
                    },
                    {
                        key: 'delete',
                        title: 'Удалить',
                        icon: 'delete',
                        onClick: toggleConfirmationDialogOpen
                    }
                ]}
            />

            <EnrollmentCommentsSidePanel
                enrollment={enrollment}
                open={isSidePanelOpen}
                dismissible
                onClose={toggleSidePanel}
            />

            <PageContent>
                <LayoutGrid>
                    <LayoutGrid.Cell span="12">
                        <EnrollmentMeta
                            enrollment={enrollment}
                        />
                    </LayoutGrid.Cell>

                    <LayoutGrid.Cell span="12">
                        <EnrollmentStatus
                            enrollment={enrollment}
                            onUpdate={updateEnrollment}
                        />
                    </LayoutGrid.Cell>

                    <LayoutGrid.Cell desktop="3" tablet="4" mobile="4">
                        <EnrollmentDetails
                            enrollment={enrollment}
                        />
                    </LayoutGrid.Cell>

                    <LayoutGrid.Cell desktop="3" tablet="4" mobile="4">
                        <LayoutGrid.Cell LayoutGrid>
                            <LayoutGrid.Cell span="12">
                                <EnrollmentSchedule
                                    enrollment={enrollment}
                                    onUpdate={updateEnrollmentSchedule}
                                />
                            </LayoutGrid.Cell>

                            <LayoutGrid.Cell span="12">
                                <EnrollmentLessons
                                    enrollment={enrollment}
                                />

                                {/* <EnrollmentTrialLesson
                                    enrollment={enrollment}
                                    onUpdate={updateEnrollment}
                                /> */}
                            </LayoutGrid.Cell>
                        </LayoutGrid.Cell>
                    </LayoutGrid.Cell>

                    <LayoutGrid.Cell desktop="3" tablet="4" mobile="4">
                        <EnrollmentPayments
                            enrollment={enrollment}
                        />
                    </LayoutGrid.Cell>

                    <LayoutGrid.Cell desktop="3" tablet="4" mobile="4">
                        <LayoutGrid.Cell LayoutGrid>
                            <LayoutGrid.Cell span="12">
                                <EnrollmentCourses
                                    enrollment={enrollment}
                                />
                            </LayoutGrid.Cell>

                            <LayoutGrid.Cell span="12">
                                <EnrollmentMaterials
                                    enrollment={enrollment}
                                />
                            </LayoutGrid.Cell>
                        </LayoutGrid.Cell>
                    </LayoutGrid.Cell>
                </LayoutGrid>
            </PageContent>

            <FormDialog
                form="enrollment-form"
                title="Редактирование обучения"
                open={isEnrollmentFormOpen}
                onClose={toggleEnrollmentFormOpen}
            >
                <EnrollmentForm
                    id="enrollment-form"
                    enrollment={enrollment}
                    onSubmit={updateEnrollment}
                />
            </FormDialog>

            <ConfirmationDialog
                title="Подтвердите действие"
                message="Вы действительно хотите удалить обучение?"
                open={isConfirmationDialogOpen}
                onConfirm={deleteEnrollment}
                onClose={toggleConfirmationDialogOpen}
            />
        </Page>
    );
}