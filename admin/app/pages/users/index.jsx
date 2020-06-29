import React, { useState, useEffect, useCallback } from 'react';

import { useStore } from 'app/store';
import Page from 'app/components/shared/page';
import PageHeader from 'app/components/shared/page-header';
import PageContent from 'app/components/shared/page-content';
import FormDialog from 'app/components/shared/form-dialog';
import UserList from 'app/components/users/user-list';
import UserForm from 'app/components/users/user-form';

export default function Users() {
    const [isUserFormOpen, setUserFormOpen] = useState(false);
    const [{ list: users }, actions] = useStore('users');

    useEffect(() => {
        actions.getUsers();
    }, []);

    const handleSubmit = useCallback(data => {
        actions.createUser(data)
            .then(() => setUserFormOpen(false));
    }, []);

    return (
        <Page id="users">
            <PageHeader
                title="Пользователи"
                controls={[
                    {
                        key: 'add',
                        text: 'Создать',
                        iconProps: { iconName: 'Add' },
                        onClick: () => setUserFormOpen(true)
                    }
                ]}
            />

            <PageContent loading={!users}>
                <UserList
                    users={users}
                />
            </PageContent>

            <FormDialog
                title="Создание пользователя"
                open={isUserFormOpen}
                form="user-form"
                onClose={() => setUserFormOpen(!isUserFormOpen)}
            >
                <UserForm
                    onSubmit={handleSubmit}
                />
            </FormDialog>
        </Page>
    );
}