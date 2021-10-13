import React, { useState, useCallback } from 'react';
import {
    Card,
    Icon,
    IconButton,
    List
} from 'mdc-react';

import { useBoolean } from 'shared/hooks/state';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import FormDialog from 'shared/components/form-dialog';
import MenuButton from 'shared/components/menu-button';

import ContactForm from 'app/components/shared/contact-form';

import './index.scss';

export default function ClientContacts({ client, onUpdate }) {
    const [contact, setContact] = useState();

    const [isCreateFormOpen, toggleCreateForm] = useBoolean(false);
    const [isEditFormOpen, toggleEditForm] = useBoolean(false);
    const [isDeleteDialogOpen, toggleDeleteDialog] = useBoolean(false);

    const createContact = useCallback(data => {
        onUpdate({
            contacts: client.contacts.concat(data)
        }).then(() => toggleCreateForm(false));
    }, [client]);

    const updateContact = useCallback(data => {
        onUpdate({
            contacts: client.contacts.map(contact => contact.id !== data.id ? contact : {
                ...client,
                ...data
            })
        }).then(() => toggleEditForm(false));
    }, [client]);

    const deleteContact = useCallback(() => {
        onUpdate({
            contacts: client.contacts.filter(c => c.id !== contact.id)
        }).then(() => toggleDeleteDialog(false));
    }, [client, contact]);

    const handleEdit = useCallback(contact => {
        setContact(contact);
        toggleEditForm(true);
    }, []);

    const handleDelete = useCallback(contact => {
        setContact(contact);
        toggleDeleteDialog(true);
    }, []);

    return (
        <section className="client-contacts">
            <Card>
                <Card.Header
                    graphic={<Icon>contacts</Icon>}
                    title="Контакты"
                    actions={[
                        <IconButton
                            icon="add"
                            title="Добавить контакт"
                            onClick={toggleCreateForm}
                        />
                    ]}
                />

                {client.contacts?.map(contact =>
                    <List>
                        <List.Item
                            overline={contact.relation}
                            primaryText={contact.fullname}
                            secondaryText={`${contact.phone} ${contact.email}`}
                            meta={
                                <MenuButton
                                    icon="more_vert"
                                    items={[
                                        {
                                            key: 'edit',
                                            text: 'Редактировать',
                                            onClick: () => handleEdit(contact)
                                        },
                                        {
                                            key: 'delete',
                                            text: 'Удалить',
                                            onClick: () => handleDelete(contact)
                                        },
                                    ]}
                                    menuProps={{ top: true, right: true }}
                                />
                            }
                        />
                    </List>
                )}
            </Card>

            <FormDialog
                form="contact-form"
                title="Новый контакт"
                open={isCreateFormOpen}
                onClose={toggleCreateForm}
            >
                <ContactForm
                    id="contact-form"
                    onSubmit={createContact}
                />
            </FormDialog>

            <FormDialog
                form="edit-contact-form"
                title="Редактирование контакта"
                open={isEditFormOpen}
                onClose={toggleEditForm}
            >
                <ContactForm
                    id="edit-contact-form"
                    contact={contact}
                    onSubmit={updateContact}
                />
            </FormDialog>

            <ConfirmationDialog
                title="Подтвердите действие"
                message="Вы действительно хотите удалить контакт?"
                open={isDeleteDialogOpen}
                onConfirm={deleteContact}
                onClose={toggleDeleteDialog}
            />
        </section>
    );
}