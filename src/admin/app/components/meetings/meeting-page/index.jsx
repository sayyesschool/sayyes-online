import { useCallback, useEffect, useState } from 'react';
import {
    LayoutGrid, LayoutGridCell
} from 'mdc-react';

import ConfirmationDialog from 'shared/components/confirmation-dialog';
import LoadingIndicator from 'shared/components/loading-indicator';
import FormDialog from 'shared/components/form-dialog';
import Page from 'shared/components/page';
import PageTopBar from 'shared/components/page-top-bar';
import PageContent from 'shared/components/page-content';

import { useStore } from 'app/hooks/store';
import MeetingForm from 'app/components/meetings/meeting-form';
import MeetingDetails from 'app/components/meetings/meeting-details';
import MeetingRegistrations from 'app/components/meetings/meeting-registrations';
import MeetingRegistrationForm from 'app/components/meetings/meeting-registration-Form';
import MeetingParticipants from 'app/components/meetings/meeting-participants';

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
            <PageTopBar
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

            <PageContent>
                <LayoutGrid>
                    <LayoutGridCell span="4">
                        <MeetingDetails
                            meeting={meeting}
                        />
                    </LayoutGridCell>

                    <LayoutGridCell span="4">
                        <MeetingRegistrations
                            registrations={meeting.registrations}
                            onAdd={toggleRegistrationForm}
                            onUpdate={handleUpdateRegistration}
                            onRemove={handleRemoveRegistration}
                        />
                    </LayoutGridCell>

                    <LayoutGridCell span="4">
                        <MeetingParticipants
                            participants={meeting.participants}
                        />
                    </LayoutGridCell>
                </LayoutGrid>
            </PageContent>

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

//- script(src='//cdn.quilljs.com/1.3.6/quill.min.js')
//- script.
//-     new Quill('#editor', {
//-         modules: {
//-             toolbar: [
//-                 [{ header: [1, 2, false] }],
//-                 ['bold', 'italic', 'underline'],
//-                 [{ 'list': 'ordered'}, { 'list': 'bullet' }],
//-                 [{ 'indent': '-1'}, { 'indent': '+1' }],
//-                 ['link']
//-             ],
//-         },
//-         placeholder: 'Заметки',
//-         theme: 'snow'
//-     });