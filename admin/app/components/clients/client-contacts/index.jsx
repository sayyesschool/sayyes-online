import { useState, useCallback } from 'react';
import { Button } from '@fluentui/react-northstar';

import { useBoolean } from 'shared/hooks/state';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import FormDialog from 'shared/components/form-dialog';
import Icon from 'shared/components/material-icon';
import PageSection from 'shared/components/page-section';

import ContactForm from 'app/components/clients/contact-form';
import ContactsList from 'app/components/clients/contacts-list';

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
        <PageSection
            className="client-contacts"
            title="Контакты"
            actions={
                <Button
                    icon={<Icon icon="add" />}
                    title="Добавить контакт"
                    text
                    iconOnly
                    onClick={toggleCreateForm}
                />
            }
        >
            <ContactsList
                contacts={client.contacts}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

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
        </PageSection>
    );
}