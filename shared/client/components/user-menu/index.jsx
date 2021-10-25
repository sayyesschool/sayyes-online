import {
    Avatar
} from 'mdc-react';

import MenuButton from 'shared/components/menu-button';

export default function UserMenu({
    user,
    items,
    ...props
}) {
    return (
        <MenuButton
            className="user-menu"
            button={<Avatar className="user-avatar" text={user.initials} />}
            items={items}
            {...props}
        />
    );
}