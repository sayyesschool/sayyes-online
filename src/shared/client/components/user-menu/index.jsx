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
            className="sy-UserMenu"
            trigger={
                <Avatar
                    className="sy-UserAvatar"
                    image={user.imageUrl}
                    text={user.initials}
                />
            }
            items={items}
            {...props}
        />
    );
}