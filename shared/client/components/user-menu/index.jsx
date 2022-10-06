import Avatar from 'shared/ui-components/avatar';
import MenuButton from 'shared/ui-components/menu-button';

import './index.scss';

export default function UserMenu({
    user,
    items,
    ...props
}) {
    return (
        <MenuButton
            className="user-menu"
            trigger={
                <Avatar
                    className="user-avatar"
                    image={user.imageUrl}
                    name={user.fullname}
                />
            }
            menu={items}
            on="click"
            {...props}
        />
    );
}