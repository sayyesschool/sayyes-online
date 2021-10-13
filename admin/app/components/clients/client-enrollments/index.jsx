import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import {
    Card,
    Icon,
    IconButton
} from 'mdc-react';

import { useBoolean } from 'shared/hooks/state';
import FormDialog from 'shared/components/form-dialog';

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
        <section className="client-enrollments">
            <Card>
                <Card.Header
                    graphic={<Icon>school</Icon>}
                    title="Обучение"
                    actions={
                        <IconButton
                            icon="add"
                            title="Создать обучение"
                            onClick={toggleEnrollmentFormOpen}
                        />
                    }
                />

                {enrollments?.length > 0 &&
                    <EnrollmentsList
                        enrollments={enrollments}
                    />
                }
            </Card>

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
        </section>
    );
}