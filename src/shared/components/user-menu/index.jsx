import { Avatar, Menu } from 'shared/ui-components';

import './index.scss';

export default function UserMenu({
    user,
    items,
    ...props
}) {
    return (
        <Menu
            className="UserMenu"
            trigger={
                <Avatar
                    className="UserAvatar"
                    image={user.imageUrl}
                    text={user.initials}
                />
            }
            items={items}
            {...props}
        />
    );
}