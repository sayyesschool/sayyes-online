import { useCallback, useMemo, useRef } from 'react';

import { Accordion, Button, Dialog } from 'shared/ui-components';

import LearnerForm from 'app/components/learners/learner-form';
import EnrollmentForm from 'app/components/enrollments/enrollment-form';
import RequestForm from 'app/components/requests/request-form';

import './index.scss';

export default function RequestProcessFormDialog({ request, open, onSubmit, onClose }) {
    const learnerFormRef = useRef();
    const enrollmentFormRef = useRef();
    const requestFormRef = useRef();

    const learner = useMemo(() => {
        const [firstname, lastname] = request?.contact?.name.split(' ') || [];

        return {
            firstname,
            lastname,
            phone: request?.contact.phone
        };
    }, [request]);

    const handleSubmit = useCallback(() => {
        const learner = learnerFormRef.current?.data;
        const enrollment = enrollmentFormRef.current?.data;
        const request = requestFormRef.current?.data;

        if (!learnerFormRef.current?.form.reportValidity()) {
            return;
        }

        if (!enrollmentFormRef.current?.form.reportValidity()) {
            return;
        }

        onSubmit({ learner, enrollment, request });
    }, [onSubmit]);

    return (
        <Dialog
            title="Обработка заявки"
            open={open}
            content={
                <div className="RequestProcessForm">
                    <Accordion
                        defaultActiveIndex={[0]}
                        items={[
                            {
                                key: 'learner',
                                header: 'Ученик',
                                content: (
                                    <LearnerForm
                                        ref={learnerFormRef}
                                        learner={learner}
                                    />
                                )
                            },
                            {
                                key: 'enrollment',
                                header: 'Обучение',
                                content: (
                                    <EnrollmentForm
                                        ref={enrollmentFormRef}
                                    />
                                )
                            },
                            {
                                key: 'request',
                                header: 'Обращение',
                                content: (
                                    <RequestForm
                                        ref={requestFormRef}
                                        request={request}
                                    />
                                )
                            }
                        ]}
                    />
                </div>
            }
            actions={[
                <Button
                    key="cancel"
                    type="submit"
                    content="Отменить"
                    variant="plain"
                    onClick={onClose}
                />,

                <Button
                    key="submit"
                    type="button"
                    content="Сохранить"
                    onClick={handleSubmit}
                />
            ]}
            onClose={onClose}
        />
    );
}