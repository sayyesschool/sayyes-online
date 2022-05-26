import {
    Avatar,
    MenuButton,
    List
} from '@fluentui/react-northstar';

import Icon from 'shared/components/material-icon';

export default function ContactsList({ contacts, onEdit, onDelete }) {
    return (
        <List>
            {contacts?.map(contact =>
                <List.Item
                    media={
                        <Avatar name={contact.fullname} />
                    }
                    header={contact.fullname}
                    headerMedia={contact.phone}
                    content={contact.relation}
                    contentMedia={contact.email}
                // endMedia={
                //     <MenuButton
                //         trigger={<Icon>more_vert</Icon>}
                //         menu={[
                //             {
                //                 key: 'edit',
                //                 content: 'Редактировать',
                //                 onClick: () => onEdit(contact)
                //             },
                //             {
                //                 key: 'delete',
                //                 content: 'Удалить',
                //                 onClick: () => onDelete(contact)
                //             },
                //         ]}
                //     />
                // }
                />
            )}
        </List>
    );
}