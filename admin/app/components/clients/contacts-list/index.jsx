import {
    MenuButton,
    List
} from '@fluentui/react-northstar';

import Icon from 'shared/components/material-icon';

export default function ContactsList({ contacts, onEdit, onDelete }) {
    return (
        <List>
            {contacts?.map(contact =>
                <List.Item
                    header={contact.fullname}
                    headerMedia={contact.relation}
                    content={`${contact.phone} ${contact.email}`}
                    endMedia={
                        <MenuButton
                            trigger={<Icon>more_vert</Icon>}
                            menu={[
                                {
                                    key: 'edit',
                                    content: 'Редактировать',
                                    onClick: () => onEdit(contact)
                                },
                                {
                                    key: 'delete',
                                    content: 'Удалить',
                                    onClick: () => onDelete(contact)
                                },
                            ]}
                        />
                    }
                />
            )}
        </List>
    );
}