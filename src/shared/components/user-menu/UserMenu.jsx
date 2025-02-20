import { Avatar, Menu } from 'shared/ui-components';
import cn from 'shared/utils/classnames';

import styles from './UserMenu.module.scss';

export default function UserMenu({
    user,
    items,
    className,
    ...props
}) {
    return (
        <div className={cn(className, 'UserMenu', styles.root)}>
            <Menu
                trigger={
                    <Avatar
                        className={styles.avatar}
                        image={user.imageUrl}
                        text={user.initials}
                    />
                }
                items={items}
                {...props}
            />
        </div>
    );
}