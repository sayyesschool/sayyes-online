import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import {
    Button,
    Flex,
    Header,
    Segment
} from '@fluentui/react-northstar';

import { useBoolean } from 'shared/hooks/state';
import FormDialog from 'shared/components/form-dialog';
import MaterialIcon from 'shared/components/material-icon';

import { useActions } from 'app/hooks/store';
import EnrollmentForm from 'app/components/enrollments/enrollment-form';
import EnrollmentsList from 'app/components/enrollments/enrollments-list';

export default function ClientEnrollments({ client }) {
    const history = useHistory();
    const enrollmentActions = useActions('enrollments');

    const [isEnrollmentFormOpen, toggleEnrollmentFormOpen] = useBoolean(false);

    const createEnrollment = useCallback(data => {
        return enrollmentActions.createEnrollment(data)
            .then(({ data }) => history.push(`/clients/${client?.id}/enrollments/${data?.id}`));
    }, [client]);

    const enrollments = client?.enrollments.map(enrollment => ({ ...enrollment, url: `${client.url}${enrollment.url}` }));

    return (
        <Segment as="section" className="client-enrollments">
            <Flex space="between" vAlign="center">
                <Header
                    as="h3"
                    content="Обучение"
                />

                <Button
                    icon={<MaterialIcon icon="add" />}
                    title="Создать обучение"
                    text
                    iconOnly
                    onClick={toggleEnrollmentFormOpen}
                />
            </Flex>

            <EnrollmentsList
                enrollments={enrollments}
            />

            <FormDialog
                form="enrollment-form"
                title="Новое обучение"
                open={isEnrollmentFormOpen}
                onClose={toggleEnrollmentFormOpen}
            >
                <EnrollmentForm
                    id="enrollment-form"
                    enrollment={{
                        client
                    }}
                    onSubmit={createEnrollment}
                />
            </FormDialog>
        </Segment>
    );
}