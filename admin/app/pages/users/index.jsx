import React, { useState, useEffect, useCallback } from 'react';
import {
    Button,
    Icon,
    Layout,
    Spinner,
    Typography
} from 'mdc-react';

import { useStore } from 'shared/hooks/store';
import { actions as userActions } from 'app/store/modules/users';
import FormDialog from 'app/components/shared/form-dialog';
import UserList from 'app/components/users/user-list';
import UserForm from 'app/components/users/user-form';

export default function Users() {
    const [users, actions] = useStore(
        state => state.users.list,
        userActions
    );
    const [isUserFormOpen, setUserFormOpen] = useState(false);

    useEffect(() => {
        actions.getUsers();
    }, []);

    const handleSubmit = useCallback(data => {
        actions.createUser(data)
            .then(() => setUserFormOpen(false));
    }, []);

    return (
        <main id="users-page" className="page">
            <Layout element="header" row justifyContent="between">
                <Typography element="h1" variant="headline4">Пользователи</Typography>

                <Layout>
                    <Button
                        leadingIcon={<Icon>add</Icon>}
                        outlined
                        onClick={() => setUserFormOpen(true)}
                    >
                        Создать
                    </Button>
                </Layout>
            </Layout>

            {users ?
                <UserList
                    users={users}
                />
                :
                <Spinner />
            }

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
        </main>
    );
}