import React, { useState, useEffect, useCallback } from 'react';
import {
    Button,
    Icon,
    TabBar, Tab
} from 'mdc-react';

import SidePanel from 'app/components/shared/side-panel';
import ClientForm from 'app/components/clients/client-form';
import EnrollmentForm from 'app/components/enrollments/enrollment-form';
import RequestForm from 'app/components/requests/request-form';

import './index.scss';

export default function RequestProcessFormPanel({ request, open, onSubmit, onClose }) {
    const [activeTab, setActiveTab] = useState('client');
    const [client, setClient] = useState();
    const [enrollment, setEnrollment] = useState();

    useEffect(() => {
        if (request && !client) {
            setClient({
                firstname: request?.contact.name,
                phone: request?.contact.phone
            });
        }
    }, [request]);

    const handleClientSubmit = useCallback(data => {
        setClient(data);
        setActiveTab('enrollment');
    }, []);

    const handleEnrollmentSubmit = useCallback(data => {
        setEnrollment(data);
        setActiveTab('request');
    }, []);

    const handleSubmit = useCallback(request => {
        onSubmit({ client, enrollment, request });
    }, [client, enrollment]);

    return (
        <SidePanel
            className="request-process-panel"
            title="Обработка заявки"
            open={open}
            modal
            style={{ top: 0, width: '480px' }}
            onClose={onClose}
        >
            <SidePanel.Header>
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
            </SidePanel.Header>

            <SidePanel.Content>
                {activeTab === 'client' &&
                    <ClientForm
                        client={client}
                        onSubmit={handleClientSubmit}
                    />
                }

                {activeTab === 'enrollment' &&
                    <EnrollmentForm
                        enrollment={enrollment}
                        onSubmit={handleEnrollmentSubmit}
                    />
                }

                {activeTab === 'request' &&
                    <RequestForm
                        request={request}
                        onSubmit={handleSubmit}
                    />
                }
            </SidePanel.Content>

            <SidePanel.Footer>
                {activeTab === 'client' &&
                    <Button type="submit" form="client-form" unelevated>Далее</Button>
                }

                {activeTab === 'enrollment' &&
                    <Button type="submit" form="enrollment-form" unelevated>Далее</Button>
                }

                {activeTab === 'request' &&
                    <Button type="submit" form="request-form" unelevated>Сохранить</Button>
                }
            </SidePanel.Footer>
        </SidePanel>
    );
}