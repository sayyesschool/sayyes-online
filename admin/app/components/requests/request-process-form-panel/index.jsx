import React, { useRef, useState, useCallback } from 'react';
import {
    Icon,
    TabBar, Tab,
    SideSheet
} from 'mdc-react';

import ClientForm from 'app/components/clients/client-form';
import EnrollmentForm from 'app/components/enrollments/enrollment-form';
import RequestForm from 'app/components/requests/request-form';

import './index.scss';

export default function RequestProcessFormPanel({ request, open, onSubmit, onClose }) {
    const [activeTab, setActiveTab] = useState('client');
    const [client, setClient] = useState();
    const [enrollment, setEnrollment] = useState();

    const handleClientSubmit = useCallback(data => {
        setClient(data);
        setActiveTab('enrollment');
    }, []);

    const handleEnrollmentSubmit = useCallback(data => {
        setEnrollment(data);
        setActiveTab('request');
    }, []);

    const handleRequestSubmit = useCallback(request => {
        onSubmit({ client, enrollment, request });
    }, [client, enrollment]);

    return (
        <SideSheet
            className="request-process-panel"
            open={open}
            title="Обработка заявки"
            modal
            style={{ top: 0, width: '480px' }}
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
                    disabled={!client}
                    label="Обучение"
                />

                <Tab
                    value="request"
                    icon={<Icon>assignment</Icon>}
                    disabled={!enrollment}
                    label="Обращение"
                />
            </TabBar>

            <SideSheet.Content>

                <TabPanel shown={activeTab === 'client'}>
                    <ClientForm
                        client={{
                            firstname: request?.contact.name,
                            phone: request?.contact.phone
                        }}
                        onSubmit={handleClientSubmit}
                    />
                </TabPanel>

                <TabPanel shown={activeTab === 'enrollment'}>
                    <EnrollmentForm
                        onSubmit={handleEnrollmentSubmit}
                    />
                </TabPanel>

                <TabPanel shown={activeTab === 'request'}>
                    <RequestForm
                        request={request}
                        onSubmit={handleRequestSubmit}
                    />
                </TabPanel>
            </SideSheet.Content>
        </SideSheet>
    );
}

function TabPanel({ shown, children }) {
    return shown && (
        <div className="tab-panel">{children}</div>
    );
}