import { Avatar, MenuButton } from 'shared/ui-components';

import './index.scss';

export default function UserMenu({
    user,
    items,
    ...props
}) {
    return (
        <MenuButton
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