import { useCallback, useMemo, useRef } from 'react';
import { Accordion, Dialog, Flex, Status } from '@fluentui/react-northstar';

import ClientForm from 'app/components/clients/client-form';
import EnrollmentForm from 'app/components/enrollments/enrollment-form';
import RequestForm from 'app/components/requests/request-form';

import './index.scss';

export default function RequestProcessFormDialog({ request, open, onSubmit, onClose }) {
    const clientFormRef = useRef();
    const enrollmentFormRef = useRef();
    const requestFormRef = useRef();

    const client = useMemo(() => {
        const [firstname, lastname] = request?.contact?.name.split(' ') || [];

        return {
            firstname,
            lastname,
            phone: request?.contact.phone
        };
    }, [request]);

    const handleSubmit = useCallback(() => {
        const client = clientFormRef.current?.data;
        const enrollment = enrollmentFormRef.current?.data;
        const request = requestFormRef.current?.data;

        if (!clientFormRef.current?.form.reportValidity()) {
            console.log('ALERT CLIENT');
            return;
        }

        if (!enrollmentFormRef.current?.form.reportValidity()) {
            console.log('ALERT ENROLLMENT');
            return;
        }

        onSubmit({ client, enrollment, request });
    }, [onSubmit]);

    return (
        <Dialog
            className="request-process-dialog"
            header="Обработка заявки"
            open={open}
            content={
                <Accordion
                    defaultActiveIndex={[0]}
                    panels={[
                        {
                            key: 'client',
                            title: (
                                <Flex vAlign="center" space="between">
                                    Клиент
                                    <Status status="unknown" />
                                </Flex>
                            ),
                            content: (
                                <ClientForm
                                    ref={clientFormRef}
                                    client={client}
                                />
                            )
                        },
                        {
                            key: 'enrollment',
                            title: (
                                <Flex vAlign="center" space="between">
                                    Обучение
                                    <Status status="unknown" />
                                </Flex>
                            ),
                            content: (
                                <EnrollmentForm
                                    ref={enrollmentFormRef}
                                />
                            )
                        },
                        {
                            key: 'request',
                            title: (
                                <Flex vAlign="center" space="between">
                                    Обращение
                                    <Status status="unknown" />
                                </Flex>
                            ),
                            content: (
                                <RequestForm
                                    ref={requestFormRef}
                                    request={request}
                                />
                            )
                        }
                    ]}
                />
            }
            cancelButton={{
                type: 'submit',
                content: 'Отменить',
                onClick: onClose
            }}
            confirmButton={{
                type: 'button',
                content: 'Сохранить',
                onClick: handleSubmit
            }}
            onClose={onClose}
        />
    );
}