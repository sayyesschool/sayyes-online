import { useState, useCallback } from 'react';

import { useBoolean } from 'shared/hooks/state';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import FormDialog from 'shared/components/form-dialog';
import PageSection from 'shared/components/page-section';

import ContactForm from 'app/components/shared/contact-form';
import ContactsList from 'app/components/shared/contacts-list';

export default function LearnerContacts({ learner, onUpdate }) {
    const [contact, setContact] = useState();

    const [isCreateFormOpen, toggleCreateForm] = useBoolean(false);
    const [isEditFormOpen, toggleEditForm] = useBoolean(false);
    const [isDeleteDialogOpen, toggleDeleteDialog] = useBoolean(false);

    const createContact = useCallback(data => {
        onUpdate({
            contacts: learner.contacts.concat(data)
        }).then(() => toggleCreateForm(false));
    }, [learner]);

    const updateContact = useCallback(data => {
        onUpdate({
            contacts: learner.contacts.map(contact => contact.id !== data.id ? contact : {
                ...learner,
                ...data
            })
        }).then(() => toggleEditForm(false));
    }, [learner]);

    const deleteContact = useCallback(() => {
        onUpdate({
            contacts: learner.contacts.filter(c => c.id !== contact.id)
        }).then(() => toggleDeleteDialog(false));
    }, [learner, contact]);

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
            className="LearnerContacts"
            title="Контакты"
            actions={[
                {
                    key: 'add',
                    icon: 'add',
                    onClick: toggleCreateForm
                }
            ]}
            compact
        >
            {learner.contacts?.length > 0 &&
                <ContactsList
                    contacts={learner.contacts}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            }

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