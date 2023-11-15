import { IconButton, List, MenuButton, Text } from 'shared/ui-components';

export default function ContactsList({ contacts, onEdit, onDelete }) {
    return (
        <List className="ContactList">
            {contacts?.map(contact =>
                <List.Item
                    content={<>
                        <Text type="body2">{contact.fullname}</Text>
                        <Text type="body3">{contact.relation}</Text>
                        <Text type="body3">{contact.phone}</Text>
                        <Text type="body3">{contact.email}</Text>
                    </>}
                    endAction={
                        <MenuButton
                            trigger={
                                <IconButton
                                    icon="more_vert"
                                    color="neutral"
                                    size="sm"
                                    variant="plain"
                                />
                            }
                            items={[
                                {
                                    key: 'edit',
                                    content: 'Редактировать',
                                    onClick: () => onEdit(contact)
                                },
                                {
                                    key: 'delete',
                                    content: 'Удалить',
                                    onClick: () => onDelete(contact)
                                }
                            ]}
                        />
                    }
                />
            )}
        </List>
    );
}