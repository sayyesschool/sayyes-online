import { useCallback, useEffect, useState } from 'react';

import ConfirmationDialog from 'shared/components/confirmation-dialog';
import FormDialog from 'shared/components/form-dialog';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import { Grid } from 'shared/ui-components';

import MeetingDetails from 'crm/components/meetings/meeting-details';
import MeetingForm from 'crm/components/meetings/meeting-form';
import MeetingParticipants from 'crm/components/meetings/meeting-participants';
import MeetingRegistrationForm from 'crm/components/meetings/meeting-registration-Form';
import MeetingRegistrations from 'crm/components/meetings/meeting-registrations';
import { useStore } from 'crm/hooks/store';

import './index.scss';

export default function Meeting({ match, history }) {
    const [meeting, actions] = useStore('meetings.single');

    const [isMeetingFormOpen, setMeetingFormOpen] = useState(false);
    const [isRegistrationFormOpen, setRegistrationFormOpen] = useState(false);
    const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

    useEffect(() => {
        actions.getMeeting(match.params.meetingId);
    }, []);

    const handleUpdateMeeting = useCallback(data => {
        actions.updateMeeting(meeting.id, data)
            .then(() => setMeetingFormOpen(false));
    }, [meeting]);

    const handleDeleteMeeting = useCallback(() => {
        actions.deleteMeeting(meeting.id)
            .then(() => history.push('/meetings'));
    }, [meeting]);

    const handleAddRegistration = useCallback(registration => {
        actions.addRegistration(meeting.id, registration)
            .then(() => setRegistrationFormOpen(false));
    }, [meeting]);

    const handleUpdateRegistration = useCallback((registration, action) => {
        actions.updateRegistration(meeting.id, registration.id, action);
    }, [meeting]);

    const handleRemoveRegistration = useCallback(registration => {
        if (confirm('Вы уверены что хотите удалить регистрацию? Отменить операцию будет невозможно.')) {
            actions.removeRegistration(meeting.id, registration.id);
        }
    }, [meeting]);

    const toggleRegistrationForm = useCallback(() => {
        setRegistrationFormOpen(value => !value);
    }, []);

    if (!meeting) return <LoadingIndicator />;

    return (
        <Page id="meeting-page" loading={!meeting}>
            <Page.Header
                title={meeting.title}
                toolbar={[
                    {
                        key: 'register',
                        icon: 'person_add',
                        title: 'Добавить регистрацию',
                        onClick: () => setRegistrationFormOpen(true)
                    },
                    {
                        key: 'delete',
                        icon: 'delete',
                        title: 'Удалить встречу',
                        onClick: () => setConfirmationDialogOpen(true)
                    }
                ]}
            />

            <Page.Content>
                <Grid>
                    <Grid.Item span="4">
                        <MeetingDetails
                            meeting={meeting}
                        />
                    </Grid.Item>

                    <Grid.Item span="4">
                        <MeetingRegistrations
                            registrations={meeting.registrations}
                            onAdd={toggleRegistrationForm}
                            onUpdate={handleUpdateRegistration}
                            onRemove={handleRemoveRegistration}
                        />
                    </Grid.Item>

                    <Grid.Item span="4">
                        <MeetingParticipants
                            participants={meeting.participants}
                        />
                    </Grid.Item>
                </Grid>
            </Page.Content>

            <FormDialog
                title="Редактирование встречи"
                open={isMeetingFormOpen}
                form="meeting-form"
                onClose={() => setMeetingFormOpen(false)}
            >
                <MeetingForm
                    meeting={meeting}
                    onSubmit={handleUpdateMeeting}
                />
            </FormDialog>

            <FormDialog
                title="Новая регистрация"
                open={isRegistrationFormOpen}
                form="meeting-registration-form"
                onClose={toggleRegistrationForm}
            >
                <MeetingRegistrationForm
                    onSubmit={handleAddRegistration}
                />
            </FormDialog>

            <ConfirmationDialog
                title="Удалить встречу?"
                open={isConfirmationDialogOpen}
                onConfirm={handleDeleteMeeting}
                onClose={() => setConfirmationDialogOpen(false)}
            />
        </Page>
    );
}