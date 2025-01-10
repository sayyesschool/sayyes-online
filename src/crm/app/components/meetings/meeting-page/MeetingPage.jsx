import { useCallback } from 'react';

import CopyButton from '@/shared/components/copy-button';
import ConfirmButton from 'shared/components/confirm-button';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import { useMeeting } from 'shared/hooks/meetings';
import { useTeachers } from 'shared/hooks/teachers';
import { Grid } from 'shared/ui-components';

import MeetingDetails from 'crm/components/meetings/meeting-details';
import MeetingRegistrations from 'crm/components/meetings/meeting-registrations';

import styles from './MeetingPage.module.scss';

export default function Meeting({ match, history }) {
    const [meeting, actions] = useMeeting(match.params.meetingId);
    const [teachers] = useTeachers();

    const handleUpdateMeeting = useCallback(data => {
        return actions.updateMeeting(meeting.id, data);
    }, [actions, meeting]);

    const handleDeleteMeeting = useCallback(() => {
        return actions.deleteMeeting(meeting.id)
            .then(() => history.push('/meetings'));
    }, [actions, history, meeting]);

    const handleAddRegistration = useCallback(registration => {
        return actions.addRegistration(meeting.id, registration);
    }, [actions, meeting]);

    const handleUpdateRegistration = useCallback((registration, action) => {
        return actions.updateRegistration(meeting.id, registration.id, action);
    }, [actions, meeting]);

    const handleRemoveRegistration = useCallback(registration => {
        if (confirm('Вы уверены что хотите удалить регистрацию? Отменить операцию будет невозможно.')) {
            return actions.removeRegistration(meeting.id, registration.id);
        } else {
            Promise.resolve();
        }
    }, [actions, meeting]);

    if (!meeting) return <LoadingIndicator />;

    return (
        <Page
            id="meeting-page"
            className={styles.root}
            loading={!meeting}
        >
            <Page.Header
                breadcrumbs={[
                    { content: 'Встречи', to: '/meetings' }
                ]}
                title={meeting.title}
                description={meeting.zoomId && `Zoom ID: ${meeting.zoomId} / Пароль: ${meeting.password}`}
                actions={[
                    meeting.joinUrl && (
                        <CopyButton
                            key="copy"
                            title="Копировать ссылку для входа"
                            icon="link"
                            copyContent={meeting.joinUrl}
                        />
                    ),
                    <ConfirmButton
                        key="delete"
                        icon="delete"
                        title="Удалить"
                        message="Удалить встречу?"
                        onConfirm={handleDeleteMeeting}
                    />
                ]}
            />

            <Page.Content>
                <Grid gap="m">
                    <Grid.Item md={8}>
                        <MeetingDetails
                            meeting={meeting}
                            hosts={teachers}
                            onUpdate={handleUpdateMeeting}
                        />
                    </Grid.Item>

                    <Grid.Item md={4}>
                        <MeetingRegistrations
                            registrations={meeting.registrations}
                            onCreate={handleAddRegistration}
                            onUpdate={handleUpdateRegistration}
                            onDelete={handleRemoveRegistration}
                        />
                    </Grid.Item>
                </Grid>
            </Page.Content>
        </Page>
    );
}