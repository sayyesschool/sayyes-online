import React, { useRef, useState, useCallback, useMemo } from 'react';
import {
    Dialog,
    Button,
    Icon,
    TabBar, Tab
} from 'mdc-react';

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

    const [activeTab, setActiveTab] = useState('client');

    const handleSubmit = useCallback(() => {
        const client = clientFormRef.current.data;
        const enrollment = enrollmentFormRef.current.data;
        const request = requestFormRef.current.data;

        if (!clientFormRef.current.form.reportValidity()) {
            console.log('ALERT CLIENT');
            return;
        }

        if (!enrollmentFormRef.current.form.reportValidity()) {
            console.log('ALERT ENROLLMENT');
            return;
        }

        onSubmit({ client, enrollment, request });
    }, [onSubmit]);

    return (
        <Dialog
            className="request-process-dialog"
            title="Обработка заявки"
            open={open}
            onClose={onClose}
        >
            <TabBar
                value={activeTab}
                onChange={setActiveTab}
                minWidth
            >
                <Tab
                    value="client"
                    icon={<Icon>person</Icon>}
                    label="Клиент"
                />

                <Tab
                    value="enrollment"
                    icon={<Icon>school</Icon>}
                    label="Обучение"
                />

                <Tab
                    value="request"
                    icon={<Icon>assignment</Icon>}
                    label="Обращение"
                />
            </TabBar>

            <Dialog.Content>
                <ClientForm
                    ref={clientFormRef}
                    client={client}
                    style={{ display: activeTab === 'client' ? 'block' : 'none' }}
                />

                <EnrollmentForm
                    ref={enrollmentFormRef}
                    style={{ display: activeTab === 'enrollment' ? 'block' : 'none' }}
                />

                <RequestForm
                    ref={requestFormRef}
                    request={request}
                    style={{ display: activeTab === 'request' ? 'block' : 'none' }}
                />
            </Dialog.Content>

            <Dialog.Actions>
                <Button type="button" outlined onClick={onClose}>Отменить</Button>


                <Button type="button" unelevated onClick={handleSubmit}>{activeTab === 'request' ? 'Сохранить' : 'Далее'}</Button>
            </Dialog.Actions>
        </Dialog >
    );
}